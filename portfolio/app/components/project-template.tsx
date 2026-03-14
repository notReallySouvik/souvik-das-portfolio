'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type ProjectTemplateProps = {
  title: string;
  description: string;
  techStack: string;
  image: string;
  github?: string;
  live?: string;
};

export default function ProjectTemplate({
  title,
  description,
  techStack,
  image,
  github,
  live
}: ProjectTemplateProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20">

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent)] mb-12 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-8">
            {title}
          </h1>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-6">
                  About This Project
                </h2>

                <p className="text-lg leading-relaxed text-[var(--foreground)]/75 whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            </div>

            <div className="space-y-6">

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8">
                <h3 className="text-xl font-semibold text-[var(--accent)] mb-4">
                  Tech Stack
                </h3>

                <p className="text-[var(--foreground)]/70">
                  {techStack}
                </p>
              </div>

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:border-[var(--accent)]/30 transition"
                >
                  <div className="flex items-center gap-3 text-[var(--accent)]">
                    <Github size={22} />
                    <span>View on GitHub</span>
                  </div>
                </a>
              )}

              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:border-[var(--accent)]/30 transition"
                >
                  <div className="flex items-center gap-3 text-[var(--accent)]">
                    <ArrowUpRight size={22} />
                    <span>Open Live Project</span>
                  </div>
                </a>
              )}

            </div>

          </div>

        </motion.div>
      </section>
    </main>
  );
}