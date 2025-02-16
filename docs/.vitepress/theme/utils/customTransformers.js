// copied from @shikijs/transformers
import { warnDeprecated } from "@shikijs/core";
const matchers = [
  [
    /^(<!--)(.+)(-->)$/,
    false,
  ],
  [
    /^(\/\*)(.+)(\*\/)$/,
    false,
  ],
  [
    /^(\/\/|["'#]|;{1,2}|%{1,2}|--)(.*)$/,
    true,
  ],
  /**
   * for multi-line comments like this
   */
  [
    /^(\*)(.+)$/,
    true,
  ],
];
function matchToken(text, isLast) {
  let trimmed = text.trimStart();
  const spaceFront = text.length - trimmed.length;
  trimmed = trimmed.trimEnd();
  const spaceEnd = text.length - trimmed.length - spaceFront;
  for (const [
    matcher,
    endOfLine,
  ] of matchers) {
    if (endOfLine && !isLast) continue;
    const result = matcher.exec(trimmed);
    if (!result) continue;
    return [
      " ".repeat(spaceFront) + result[1],
      result[2],
      (
        result[3]
      ) ?
        result[3] + " ".repeat(spaceEnd)
      : undefined,
    ];
  }
}
function parseComments(lines, jsx, matchAlgorithm) {
  const out = [];
  for (const line of lines) {
    const elements = line.children;
    let start = elements.length - 1;
    if (matchAlgorithm === "v1") start = 0;
    else if (jsx) start = elements.length - 2;
    for (let i = Math.max(start, 0); i < elements.length; i++) {
      const token = elements[i];
      if (token.type !== "element") continue;
      const head = token.children.at(0);
      if (head?.type !== "text") continue;
      const isLast = i === elements.length - 1;
      const match = matchToken(head.value, isLast);
      if (!match) continue;
      if (jsx && !isLast && i !== 0) {
        out.push({
          info: match,
          line,
          token,
          isJsxStyle: isValue(elements[i - 1], "{") && isValue(elements[i + 1], "}"),
        });
      } else {
        out.push({
          info: match,
          line,
          token,
          isJsxStyle: false,
        });
      }
    }
  }
  return out;
}
function v1ClearEndCommentPrefix(text) {
  const regex = /(?:\/\/|["'#]|;{1,2}|%{1,2}|--)(.*)$/;
  const result = regex.exec(text);
  if (result && result[1].trim().length === 0) {
    return text.slice(0, result.index);
  }
  return text;
}
function createCommentNotationTransformer(name, regex, onMatch, matchAlgorithm = "v1") {
  if (matchAlgorithm === "v1") {
    warnDeprecated('`matchAlgorithm: "v1"` is deprecated and will be removed in the future. Please explicitly set `matchAlgorithm: "v3"` in the transformer options.', 3);
  }
  return {
    name,
    code(code) {
      const lines = code.children.filter((i) => i.type === "element");
      const linesToRemove = [];
      code.data ??= {};
      const data = code.data;
      data._shiki_notation ??= parseComments(
        lines,
        [
          "jsx",
          "tsx",
        ].includes(this.options.lang),
        matchAlgorithm,
      );
      const parsed = data._shiki_notation;
      for (const comment of parsed) {
        if (comment.info[1].length === 0) continue;
        const isLineCommentOnly = comment.line.children.length === (comment.isJsxStyle ? 3 : 1);
        let lineIdx = lines.indexOf(comment.line);
        if (isLineCommentOnly && matchAlgorithm !== "v1") lineIdx++;
        let replaced = false;
        comment.info[1] = comment.info[1].replace(regex, (...match) => {
          if (onMatch.call(this, match, comment.line, comment.token, lines, lineIdx)) {
            replaced = true;
            return "";
          }
          return match[0];
        });
        if (!replaced) continue;
        if (matchAlgorithm === "v1") {
          comment.info[1] = v1ClearEndCommentPrefix(comment.info[1]);
        }
        const isEmpty = comment.info[1].trim().length === 0;
        if (isEmpty) comment.info[1] = "";
        if (isEmpty && isLineCommentOnly) {
          linesToRemove.push(comment.line);
        } else if (isEmpty && comment.isJsxStyle) {
          comment.line.children.splice(comment.line.children.indexOf(comment.token) - 1, 3);
        } else if (isEmpty) {
          comment.line.children.splice(comment.line.children.indexOf(comment.token), 1);
        } else {
          const head = comment.token.children[0];
          if (head.type === "text") {
            head.value = comment.info.join("");
          }
        }
      }
      for (const line of linesToRemove) code.children.splice(code.children.indexOf(line), 1);
    },
  };
}
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// custom notation map
function transformerNotationMap(options = {}, name = "@shikijs/transformers:notation-map") {
  const { classMap = {}, classActivePre = undefined } = options;

  return createCommentNotationTransformer(
    name,
    // the notation should be something like this: [!code fold:fold-id:start-end], for instance, [!code fold:funtions:3-11]
    new RegExp(`\\s*\\[!code (${Object.keys(classMap).map(escapeRegExp).join("|")}):([a-zA-Z-][a-zA-Z0-9-]*):(\\d+)-(\\d+)\\]`),
    function (
      [
        _,
        match,
        id, // `id` must be explicitly defined, and should be composed of letters, numbers, and underscores, where the first character must not be a number
        start,
        end, // both `start` and `end` must be explicitly defined
      ],
      _line,
      _comment,
      lines,
      index,
    ) {
      const [
        startOffset,
        endOffset,
      ] = [
        start,
        end,
      ].map((x) => parseInt(x, 10));
      const [
        startLine,
        endLine,
      ] = [
        startOffset,
        endOffset,
      ].map((x) => x + index);

      if (startOffset === 0) return false;
      if (startLine > endLine) return false;

      const btn = {
        type: "element",
        tagName: "span",
        properties: {
          class: [
            "fold-button",
          ],
        },
      };
      lines[startLine - 1].children.unshift(btn);

      btn.properties.onclick = `const codeEl = this.parentElement.parentElement;const lineRoot = codeEl.querySelectorAll("span.fold-node-${id}")[0];const linesToFold = Array.from(codeEl.querySelectorAll("span.foldable-${id}"));const state = linesToFold[0].classList.contains("fold");linesToFold.forEach((line) => {  line.classList.toggle("fold");  line.style.display = state ? "" : "none";});lineRoot.classList.toggle("fold");if (state == false) {  const foldedLine = document.createElement("span");  foldedLine.classList.add("folded-content");  foldedLine.textContent = "...";  lineRoot.append(foldedLine);  } else {    lineRoot.querySelectorAll("span.folded-content")[0].remove();};const newNodes = [];Array.from(codeEl.childNodes).filter(child => child.nodeType != 3).forEach((child, index) => {  newNodes.push(child);  if (index < codeEl.childNodes.length - 1 && child.style.display != "none") {    newNodes.push(document.createTextNode("\\n"));  };});codeEl.replaceChildren(...newNodes);const lineNumbersWrapper = codeEl.parentElement.parentElement.querySelectorAll(".line-numbers-wrapper")[0];if (lineNumbersWrapper == undefined) return;const lineNumbersFoldable = Array.from(lineNumbersWrapper.children).slice(${startLine * 2}, ${endLine * 2});lineNumbersFoldable.forEach((line, index) => {  line.style.display = state ? "" : "none";});lineNumbersFoldNode = lineNumbersWrapper.children[${(startLine - 1) * 2}];lineNumbersFoldNode.classList.toggle("fold");`;

      for (let i = startLine; i < Math.min(endLine, lines.length); i++) {
        this.addClassToHast(lines[i], classMap[match] + "-" + id);
      }

      this.addClassToHast(lines[startLine - 1], "fold-node-" + id);

      if (classActivePre) {
        this.addClassToHast(this.pre, classActivePre);
      }

      return true;
    },
    options.matchAlgorithm,
  );
}

function transformerNotationFold(options = {}) {
  const { classLineFold = "foldable", classActivePre = "has-foldable" } = options;
  return transformerNotationMap(
    {
      classMap: {
        fold: classLineFold,
      },
      classActivePre,
    },
    "transformers:custom-notation-fold",
  );
}

export { transformerNotationFold };
