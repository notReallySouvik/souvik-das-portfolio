'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

type PublicationStatus =
  | 'In Works'
  | 'In Hiatus'
  | 'Unreleased'
  | 'Publishing'
  | 'Published'
  | 'Published for Purchase'
  | 'Coming Soon';

type WritingTemplateProps = {
  title: string;
  category?: string;
  publicationStatus: PublicationStatus;
  coverImage: string;
  description: string;
  readLink?: string;
  buyLink?: string;
};

const statusStyles: Record<PublicationStatus, string> = {
  'In Works': 'bg-blue-500/10 text-blue-400',
  'In Hiatus': 'bg-yellow-500/10 text-yellow-400',
  'Unreleased': 'bg-zinc-500/10 text-zinc-400',
  'Publishing': 'bg-purple-500/10 text-purple-400',
  'Published': 'bg-green-500/10 text-green-400',
  'Published for Purchase': 'bg-amber-500/10 text-amber-400',
  'Coming Soon': 'bg-cyan-500/10 text-cyan-400',
};

function getReadButtonLabel(status: PublicationStatus) {
  switch (status) {
    case 'Publishing':
      return 'Read Latest Chapters';
    case 'In Hiatus':
      return 'Read Existing Chapters';
    case 'Published':
      return 'Read Work';
    default:
      return 'Read';
  }
}

function normalizeExternalUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

export default function WritingTemplate({
  title,
  category,
  publicationStatus,
  coverImage,
  description,
  readLink,
  buyLink,
}: WritingTemplateProps) {
  const normalizedReadLink = normalizeExternalUrl(readLink);
  const normalizedBuyLink = normalizeExternalUrl(buyLink);

  const showReadButton =
    (publicationStatus === 'Published' ||
      publicationStatus === 'Publishing' ||
      publicationStatus === 'In Hiatus') &&
    !!normalizedReadLink;

  const showBuyButton =
    publicationStatus === 'Published for Purchase' && !!normalizedBuyLink;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <Link
          href="/writing"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Writing
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex flex-wrap items-center gap-4">
            {category && (
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--soft-blue)]">
                {category}
              </span>
            )}

            <span
              className={`inline-flex rounded-lg px-3 py-1 text-xs font-medium ${statusStyles[publicationStatus]}`}
            >
              {publicationStatus}
            </span>
          </div>

          <h1 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-10">
                <h2 className="mb-6 text-2xl font-semibold">About This Work</h2>
                <p className="whitespace-pre-wrap text-lg leading-relaxed text-[var(--foreground)]/75">
                  {description}
                </p>
              </div>

              {(showReadButton || showBuyButton) && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {showReadButton && (
                    <a
                      href={normalizedReadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 text-sm text-[var(--accent)] transition hover:border-[var(--accent)]/30"
                    >
                      <ArrowUpRight size={16} />
                      <span>{getReadButtonLabel(publicationStatus)}</span>
                    </a>
                  )}

                  {showBuyButton && (
                    <a
                      href={normalizedBuyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 text-sm text-[var(--accent)] transition hover:border-[var(--accent)]/30"
                    >
                      <ArrowUpRight size={16} />
                      <span>Buy Book</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}