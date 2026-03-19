'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { BlogPost } from '@/app/lib/blog';

type Props = {
  posts: BlogPost[];
};

export default function BlogIndexClient({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = useMemo(
    () => ['All', ...new Set(posts.flatMap((post) => post.tags ?? []))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (selectedTag === 'All') return posts;
    return posts.filter((post) => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <h1 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Blog
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
            Essays, technical notes, development logs, and passing thoughts. A
            personal archive of ideas, experiments, and things worth keeping.
          </p>
        </motion.div>

        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/45">
            Tags
          </p>

          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedTag === tag
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'border-white/10 bg-white/[0.03] text-[var(--foreground)]/70 hover:border-[var(--accent)]/20 hover:text-[var(--foreground)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <motion.div layout className="space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.25 }}
                  className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-white/[0.045]"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {post.coverImage && (
                        <div className="relative aspect-video overflow-hidden md:aspect-auto md:h-full">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}

                      <div
                        className={`p-8 md:p-10 ${
                          post.coverImage ? 'md:col-span-2' : 'md:col-span-3'
                        }`}
                      >
                        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
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

                        <h2 className="mb-4 text-2xl font-semibold transition-colors duration-300 group-hover:text-[var(--accent)] md:text-3xl">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="mb-4 line-clamp-3 text-base leading-relaxed text-[var(--foreground)]/78">
                            {post.excerpt}
                          </p>
                        )}

                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
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
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-lg text-[var(--foreground)]/60">
              No blog posts match the selected tag.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}