const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-multiline-arrays",
  ],

  multilineArraysWrapThreshold: 1,

  experimentalTernaries: true,
  // boolean
  // default: false

  printWidth: 200,
  // int
  // default: 80
  tabWidth: 2,
  // int
  // default: 2
  tabs: false,
  // boolean
  // default: false
  semi: true,
  // boolean
  // default: true
  singleQuote: false,
  // boolean
  // default: false
  quoteProps: "consistent",
  // "as-needed" | "consistent" | "preserve"
  // default: 'as-needed'
  jsxSingleQuote: false,
  // boolean
  // default: false
  trailingComma: "all",
  // "es5" | "none" | "all"
  // default: 'all'
  bracketSpacing: true,
  // boolean
  // default: true
  bracketSameLine: false,
  // boolean
  // default: false
  arrowParens: "always",
  // "always" | "avoid"
  // default: 'always'
  rangeStart: 0,
  // int
  // default: 0
  rangeEnd: Infinity,
  // int
  // default: Infinity
  requirePragma: false,
  // boolean
  // default: false
  insertPragma: false,
  // boolean
  // default: false
  proseWrap: "never",
  // "always" | "never" | "preserve"
  // default: 'preserve'
  htmlWhitespaceSensitivity: "css",
  // "css" | "strict" | "ignore"
  // default: 'css'
  vueIndentScriptAndStyle: false,
  // boolean
  // default: false
  endOfLine: "lf",
  // "lf" | "crlf" | "cr"
  // default: 'lf'
  embeddedLanguageFormatting: "auto",
  // "auto" | "off"
  // default: 'auto'
  singleAttributePerLine: true,
  // boolean
  // default: false
};

export default config;
