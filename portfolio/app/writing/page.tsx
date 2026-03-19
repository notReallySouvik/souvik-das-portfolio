'use client';

import { useMemo, useState } from 'react';
import { writings } from '@/app/data/writings';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type PublicationStatus =
  | 'In Works'
  | 'In Hiatus'
  | 'Unreleased'
  | 'Publishing'
  | 'Published'
  | 'Published for Purchase'
  | 'Coming Soon';

const statusStyles: Record<PublicationStatus, string> = {
  'In Works': 'bg-blue-500/10 text-blue-400',
  'In Hiatus': 'bg-yellow-500/10 text-yellow-400',
  'Unreleased': 'bg-zinc-500/10 text-zinc-400',
  'Publishing': 'bg-purple-500/10 text-purple-400',
  'Published': 'bg-green-500/10 text-green-400',
  'Published for Purchase': 'bg-amber-500/10 text-amber-400',
  'Coming Soon': 'bg-cyan-500/10 text-cyan-400',
};

const allStatusOptions = ['All', ...new Set(writings.map((w) => w.publicationStatus))];
const allTagOptions = ['All', ...new Set(writings.flatMap((w) => w.tags))];

export default function WritingPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredWritings = useMemo(() => {
    return writings.filter((writing) => {
      const statusMatch =
        selectedStatus === 'All' || writing.publicationStatus === selectedStatus;

      const tagMatch =
        selectedTag === 'All' || writing.tags.includes(selectedTag);

      return statusMatch && tagMatch;
    });
  }, [selectedStatus, selectedTag]);

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
            Writing
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
            Stories, essays, and worlds built with words. A collection of published works and upcoming books exploring human experiences.
          </p>
        </motion.div>

        <div className="mb-8 space-y-5">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/45">
              Status
            </p>
            <div className="flex flex-wrap gap-3">
              {allStatusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedStatus === status
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                      : 'border-white/10 bg-white/[0.03] text-[var(--foreground)]/70 hover:border-[var(--accent)]/20 hover:text-[var(--foreground)]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/45">
              Tags
            </p>
            <div className="flex flex-wrap gap-3">
              {allTagOptions.map((tag) => (
                <button
                  key={tag}
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
        </div>

        {filteredWritings.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredWritings.map((writing) => (
                <motion.article
                  key={writing.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.25 }}
                  className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.01)] transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-white/[0.045]"
                >
                  <Link href={`/writing/${writing.slug}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={writing.coverImage}
                        alt={writing.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>

                    <div className="p-8">
                      <h2 className="mb-3 text-2xl font-semibold transition-colors duration-300 group-hover:text-[var(--accent)]">
                        {writing.title}
                      </h2>

                      {writing.category && (
                        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--soft-blue)]">
                          {writing.category}
                        </p>
                      )}

                      <p className="mb-4 text-base leading-relaxed text-[var(--foreground)]/72">
                        {writing.shortDescription}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {writing.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--foreground)]/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div
                          className={`inline-flex rounded-lg px-3 py-1 ${statusStyles[
                            writing.publicationStatus as PublicationStatus
                          ]}`}
                        >
                          <span className="text-xs font-medium">
                            {writing.publicationStatus}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]/55 transition-colors duration-300 group-hover:text-[var(--foreground)]/80">
                          <ArrowUpRight size={16} />
                          <span>Learn more</span>
                        </span>
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
              No writing matches the selected filters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}