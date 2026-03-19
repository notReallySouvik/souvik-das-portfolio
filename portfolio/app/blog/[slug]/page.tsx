import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug } from '@/app/lib/blog';
import { renderMDX } from '@/app/lib/mdx';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const content = await renderMDX(post.content);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <Link
          href="/blog"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            <header className="mx-auto mb-12 max-w-4xl">
              <h1 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
                <span className="text-[var(--accent)]">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>

                <span className="flex items-center gap-1 text-[var(--foreground)]/60">
                  <Clock size={14} />
                  {post.readingTime} min read
                </span>
              </div>

              {post.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-[var(--accent)]/10 px-3 py-1 text-xs text-[var(--accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.coverImage && (
                <div className="relative mb-8 aspect-[16/8] overflow-hidden rounded-2xl border border-white/8">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {post.excerpt && (
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 md:p-8">
                  <p className="text-xl leading-relaxed text-[var(--foreground)]/88 italic">
                    {post.excerpt}
                  </p>
                </div>
              )}
            </header>

            <div className="mx-auto max-w-4xl rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-12">
              <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-[var(--accent)]">
                {content}
              </div>
            </div>
          </article>

          {post.toc.length > 0 && (
            <aside className="hidden xl:block">
              <div className="sticky top-24 rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/45">
                  On this page
                </p>

                <nav className="space-y-3">
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm text-[var(--foreground)]/65 hover:text-[var(--foreground)] ${
                        item.level === 3 ? 'pl-4' : ''
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}