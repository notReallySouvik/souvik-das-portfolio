'use client';
import { projects } from '@/app/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
            Projects
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
            Software experiments, security tools, and explorations in code. Each
            project begins as a curiosity and becomes a record of how I think,
            build, and solve.
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.01)] transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-white/[0.045]"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>

                  <div className="p-8 md:p-9">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)] md:text-3xl">
                      {project.title}
                    </h2>

                    <p className="mb-6 text-base leading-relaxed text-[var(--foreground)]/72">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <p className="mb-2 text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                        Tech Stack
                      </p>
                      <p className="text-sm leading-relaxed text-[var(--foreground)]/65">
                        {project.techStack}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-5">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 text-sm text-[var(--accent)] transition-opacity duration-300 hover:opacity-80"
                        >
                          <Github size={16} />
                          <span>View on GitHub</span>
                        </a>
                      )}

                      <span className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]/55 transition-colors duration-300 group-hover:text-[var(--foreground)]/75">
                        <ArrowUpRight size={16} />
                        <span>Open project</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-lg text-[var(--foreground)]/60">
              No projects available at the moment.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}