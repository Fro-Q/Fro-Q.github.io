import { createContentLoader } from "vitepress";

export interface Data {
  url: string;
  frontmatter: Record<string, any>;
}

declare const data: Data[];
export { data };

export default createContentLoader("posts/*.md", {
  transform(raw) {
    return raw.map(({ url, frontmatter }) => ({
      url,
      frontmatter,
    }));
  },
});
