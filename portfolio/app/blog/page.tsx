import { getAllPosts } from '@/app/lib/blog';
import BlogIndexClient from '@/app/components/blog-index-client';

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogIndexClient posts={posts} />;
}