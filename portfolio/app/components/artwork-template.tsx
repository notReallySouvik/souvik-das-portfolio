'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

type ArtworkTemplateProps = {
  title: string;
  image: string;
  category?: string;
  description?: string;
  toolsUsed?: string;
  creationDate?: string;
};

export default function ArtworkTemplate({
  title,
  image,
  category,
  description,
  toolsUsed,
  creationDate,
}: ArtworkTemplateProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <Link
          href="/art"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Gallery
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]">
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={title}
                    width={1400}
                    height={1800}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
                  {title}
                </h1>

                {category && (
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--soft-blue)]">
                    {category}
                  </p>
                )}
              </div>

              {description && (
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8">
                  <h3 className="mb-3 text-lg font-semibold text-[var(--accent)]">
                    About
                  </h3>
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-[var(--foreground)]/78">
                    {description}
                  </p>
                </div>
              )}

              {toolsUsed && (
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8">
                  <h3 className="mb-3 text-lg font-semibold text-[var(--accent)]">
                    Tools Used
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--foreground)]/78">
                    {toolsUsed}
                  </p>
                </div>
              )}

              {creationDate && (
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8">
                  <h3 className="mb-3 text-lg font-semibold text-[var(--accent)]">
                    Created
                  </h3>
                  <p className="text-base text-[var(--foreground)]/78">
                    {creationDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}