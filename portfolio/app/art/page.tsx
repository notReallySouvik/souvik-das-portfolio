'use client';

import { artworks } from '@/app/data/artworks';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ArtPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <h1 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Art
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
            Digital paintings, character designs, and concept art. Visual
            explorations of imagination and craft.
          </p>
        </motion.div>

        {artworks.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">

            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <Link href={`/art/${artwork.slug}`} className="group block">

                  <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-white/[0.045]">

                    <div className="overflow-hidden">
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        width={800}
                        height={1000}
                        className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-6">

                      <h2 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-[var(--accent)]">
                        {artwork.title}
                      </h2>

                      {artwork.category && (
                        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[var(--soft-blue)]">
                          {artwork.category}
                        </p>
                      )}

                      {artwork.description && (
                        <p className="text-sm leading-relaxed text-[var(--foreground)]/70 line-clamp-2">
                          {artwork.description}
                        </p>
                      )}

                    </div>

                  </div>

                </Link>
              </motion.div>
            ))}

          </div>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-lg text-[var(--foreground)]/60">
              No artworks available at the moment.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}