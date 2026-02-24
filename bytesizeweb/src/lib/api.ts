import { Post } from "@/interfaces/post";
import { App } from "@/interfaces/app";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
// directory for app markdown descriptions
const appsDirectory = join(process.cwd(), "_apps");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// apps helpers - similar to posts but read from _apps directory
export function getAppSlugs() {
  if (!fs.existsSync(appsDirectory)) return [];
  return fs.readdirSync(appsDirectory);
}

export function getAppBySlug(slug: string): App {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(appsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // split content at a privacy policy heading (case-insensitive)
  let mainContent = content;
  let privacyContent: string | undefined;

  const privacyRegex = /(#+)\s*Privacy\s+Policy[\r\n]+/i;
  const match = content.match(privacyRegex);
  if (match) {
    const index = match.index || 0;
    // everything before the heading is mainContent, everything after is privacy
    mainContent = content.slice(0, index);
    privacyContent = content.slice(index + match[0].length);
  }

  return {
    ...data,
    slug: realSlug,
    content: mainContent,
    privacyContent,
  } as unknown as App;
}

export function getAllApps(): App[] {
  const slugs = getAppSlugs();
  const apps = slugs
    .map((slug) => getAppBySlug(slug))
    // if releaseDate exists, sort by that; otherwise leave order
    .sort((app1: App, app2: App) => {
      const d1 = app1.releaseDate || "";
      const d2 = app2.releaseDate || "";
      return d1 > d2 ? -1 : 1;
    });
  return apps;
}
