import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import GithubSlugger from 'github-slugger';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  coverImage: string | null;
  excerpt: string;
  content: string;
  readingTime: number;
  toc: TocItem[];
};

function extractToc(content: string): TocItem[] {
  const lines = content.split('\n');
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1] === '##' ? 2 : 3;
    const text = match[2].trim();
    const id = slugger.slug(text);

    toc.push({ id, text, level });
  }

  return toc;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_PATH)) return [];

  const files = fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  return files
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(POSTS_PATH, file);
      const source = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(source);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage ?? null,
        excerpt: data.excerpt ?? '',
        content,
        readingTime: Math.max(1, Math.ceil(readingTime(content).minutes)),
        toc: extractToc(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const mdPath = path.join(POSTS_PATH, `${slug}.md`);

  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage ?? null,
    excerpt: data.excerpt ?? '',
    content,
    readingTime: Math.max(1, Math.ceil(readingTime(content).minutes)),
    toc: extractToc(content),
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) return [];

  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.(md|mdx)$/, ''));
}