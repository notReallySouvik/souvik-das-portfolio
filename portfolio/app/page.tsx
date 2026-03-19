'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Code2, Palette } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    icon: Code2,
    title: 'Software',
    description:
      'Building systems, exploring security, and experimenting with AI, machine learning, and data science. From tools to prototypes to things that begin as curiosity and turn into work.',
    link: '/projects',
    colorClass: 'text-[var(--accent)]',
    imageSrc: '/images/home/software.jpg',
  },
  {
    icon: BookOpen,
    title: 'Writing',
    description:
      'Stories, essays, and long-form worlds built with language. Published work, works in progress, and fragments from larger things still taking shape.',
    link: '/writing',
    colorClass: 'text-[var(--soft-blue)]',
    imageSrc: '/images/home/writing.jpg',
  },
  {
    icon: Palette,
    title: 'Art',
    description:
      'Digital paintings, character work, sketches, and visual experiments. A quieter archive of images, moods, and imagined places.',
    link: '/art',
    colorClass: 'text-[var(--accent)]',
    imageSrc: '/images/home/art.jpg',
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(heroScroll, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)]/30 selection:text-white">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden pt-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, black 40%, transparent 80%)',
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, marginTop: "-10%" }}
          className="relative z-10 mx-auto flex w-full max-w-[120rem] flex-col items-center px-6 text-center md:px-12 lg:px-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="inline-grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent)] md:text-sm">
              <span className="h-px w-8 justify-self-end bg-[var(--accent)]/50" />
              <span className="leading-none">Archive & Workspace</span>
              <span className="h-px w-8 justify-self-start bg-[var(--accent)]/50" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 text-6xl font-semibold tracking-tight text-[var(--foreground)] md:text-8xl lg:text-9xl"
          >
            Souvik Das
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl"
          >
            <div className="absolute -left-4 top-0 bottom-0 hidden w-4 border-l border-y border-white/10 opacity-50 md:-left-8 md:block" />
            <div className="absolute -right-4 top-0 bottom-0 hidden w-4 border-r border-y border-white/10 opacity-50 md:-right-8 md:block" />

            <p className="py-4 text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl lg:text-2xl">
              I build software, explore security systems, write stories, and
              occasionally paint worlds in pixels. Most of my work lives at the
              intersection of curiosity and craft.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/35 md:text-xs">
            Scroll
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      <section className="relative z-20 w-full bg-[var(--background)]">
        <div className="h-px w-full bg-white/10" />

        <div className="mx-auto max-w-[120rem]">
          {features.map((feature, index) => (
            <FeatureSection key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/breather.jpg"
            alt="Atmospheric workspace texture"
            fill
            className="object-cover opacity-10 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-[var(--background)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Code2 className="mx-auto mb-8 h-8 w-8 text-white/30" />
          <p className="text-2xl leading-relaxed text-[var(--foreground)]/60 italic md:text-4xl">
            “Rise above, Go Beyond!”
          </p>
        </div>
      </section>
    </main>
  );
}

type Feature = (typeof features)[number];

function FeatureSection({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const isEven = index % 2 === 0;
  const Icon = feature.icon;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col border-b border-white/10 lg:flex-row"
    >
      <div
        className={`flex w-full items-center p-8 md:p-16 lg:w-1/2 lg:p-24 ${isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
      >
        <div className="w-full max-w-xl lg:sticky lg:top-1/3">
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <div className="mb-8 flex items-center gap-4">
              <span className="text-sm uppercase tracking-[0.24em] text-[var(--foreground)]/35">
                0{index + 1}
              </span>
              <div className="h-px w-12 bg-white/10" />
              <Icon className={`h-6 w-6 ${feature.colorClass}`} />
            </div>

            <h2 className="mb-6 text-4xl font-semibold text-[var(--foreground)] md:text-5xl lg:text-6xl">
              {feature.title}
            </h2>

            <p className="mb-10 text-lg leading-relaxed text-[var(--foreground)]/70 md:text-xl">
              {feature.description}
            </p>

            <Link
              href={feature.link}
              className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="relative overflow-hidden pb-1">
                Explore Archive
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowRight className="relative -top-[1px] h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div
        className={`relative h-[60vh] w-full overflow-hidden border-white/10 bg-white/5 lg:h-auto lg:w-1/2 ${isEven ? 'lg:order-2 lg:border-l' : 'lg:order-1 lg:border-r'
          }`}
      >
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-[-20%] h-[140%] w-[140%]"
        >
          <Image
            src={feature.imageSrc}
            alt={`${feature.title} visualization`}
            fill
            className="object-cover opacity-60 mix-blend-luminosity transition-opacity duration-700 hover:opacity-100 hover:mix-blend-normal"
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)]" />
        </motion.div>
      </div>
    </section>
  );
}