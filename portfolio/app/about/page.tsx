'use client';

import { motion } from 'framer-motion';

const interests = [
    {
        title: 'Software Development',
        description:
            'Building systems and tools with a focus on clarity, structure, security, and user experience. From web applications to command-line tools, I enjoy turning ideas into working software.',
    },
    {
        title: 'Cybersecurity & Systems',
        description:
            'Exploring security systems, OSINT techniques, network defense, and the logic behind how systems break or hold. Understanding systems deeply is part of the work.',
    },
    {
        title: 'AI & Data Science',
        description:
            'Experimenting with machine learning, pattern recognition, generative systems, and analytical workflows. I’m interested in how intelligence, data, and design intersect.',
    },
    {
        title: 'Writing & Storytelling',
        description:
            'Writing stories, reflections, and larger narrative works. This is where technical precision meets atmosphere, emotion, and the slower craft of building meaning through language.',
    },
    {
        title: 'Digital Art',
        description:
            'Creating character art, concept pieces, and visual explorations. Art gives shape to moods, ideas, and imagined spaces that do not always begin in words.',
    },
];

const education = [
    {
        period: '2022 — 2026',
        title: 'Bachelor of Technology in Computer Science',
        institution: 'Your University Name',
        description:
            'Focused on software systems, problem solving, and the technical foundations that support my broader work across development, security, and AI.',
    },
    {
        period: '2019 — 2021',
        title: 'Higher Secondary Education',
        institution: 'Your School Name',
        description:
            'Built the academic base that later expanded into programming, systems thinking, and independent technical exploration.',
    },
];

const certifications = [
    {
        title: 'Google Cybersecurity Professional Certificate',
        issuer: 'Google',
        status: 'Completed',
    },
    {
        title: 'Google Data Analytics Professional Certificate',
        issuer: 'Google',
        status: 'In Progress',
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                >
                    <h1 className="mb-8 text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
                        About
                    </h1>

                    <div className="mb-20 max-w-4xl space-y-6">
                        <p className="text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
                            I&apos;m Souvik Das, also known as Anno among friends. I&apos;m a
                            multidisciplinary creator working across software development,
                            cybersecurity, AI/ML, data science, writing, and digital art.
                        </p>

                        <p className="text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
                            Most of my work lives at the intersection of curiosity and craft.
                            I build things not only to solve problems, but to understand
                            systems, explore ideas, and make work that feels deliberate.
                        </p>

                        <p className="text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
                            This space is a quiet archive of that work — a collection of
                            projects, stories, and visual explorations that hold different
                            parts of what I do.
                        </p>
                    </div>

                    <h2 className="mb-12 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
                        What I Do
                    </h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
                        {interests.map((interest, index) => (
                            <motion.article
                                key={interest.title}
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.01)] backdrop-blur-sm md:p-10"
                            >
                                <h3 className="mb-4 text-xl font-semibold text-[var(--accent)] md:text-2xl">
                                    {interest.title}
                                </h3>
                                <p className="text-base leading-relaxed text-[var(--foreground)]/72">
                                    {interest.description}
                                </p>
                            </motion.article>
                        ))}
                    </div>

                    <section className="mt-20">
                        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Education
                        </h2>

                        <div className="space-y-6">
                            {education.map((item, index) => (
                                <motion.article
                                    key={`${item.title}-${item.period}`}
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: index * 0.08 }}
                                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.01)] backdrop-blur-sm md:p-10"
                                >
                                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-xl font-semibold text-[var(--foreground)] md:text-2xl">
                                            {item.title}
                                        </h3>
                                        <span className="text-sm uppercase tracking-[0.14em] text-[var(--accent)]">
                                            {item.period}
                                        </span>
                                    </div>

                                    <p className="mb-4 text-sm uppercase tracking-[0.16em] text-[var(--soft-blue)]">
                                        {item.institution}
                                    </p>

                                    <p className="text-base leading-relaxed text-[var(--foreground)]/72">
                                        {item.description}
                                    </p>
                                </motion.article>
                            ))}
                        </div>
                    </section>
                    <section className="mt-20">
                        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
                            Certifications
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {certifications.map((cert, index) => (
                                <motion.article
                                    key={cert.title}
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: index * 0.08 }}
                                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm"
                                >
                                    <h3 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
                                        {cert.title}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm uppercase tracking-[0.14em] text-[var(--accent)]">
                                            {cert.issuer}
                                        </p>

                                        <span
                                            className={`rounded-lg px-3 py-1 text-xs font-medium ${cert.status === 'Completed'
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-yellow-500/10 text-yellow-400'
                                                }`}
                                        >
                                            {cert.status}
                                        </span>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </section>
                    <motion.section
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.3 }}
                        className="mt-20 max-w-full rounded-2xl border border-white/8 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.01)] backdrop-blur-sm md:p-12"
                    >
                        <h2 className="mb-6 text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
                            Philosophy
                        </h2>

                        <p className="mb-4 text-lg leading-relaxed text-[var(--foreground)]/78">
                            I believe in building things carefully and thoughtfully. Whether it is code,
                            stories, or art, the process matters almost as much as the result. The act of
                            making something—of understanding how it works, refining it, and shaping it
                            over time—is where most of the meaning lives.
                        </p>
                        <p className="mb-4 text-lg leading-relaxed text-[var(--foreground)]/78">
                            Much of my work begins with curiosity. Sometimes it starts with a technical
                            problem, sometimes with an idea that refuses to leave, and sometimes simply
                            with the desire to explore how a system behaves. I enjoy tracing those paths,
                            even when they lead somewhere unexpected.
                        </p>

                        <p className="mb-4 text-lg leading-relaxed text-[var(--foreground)]/78">
                            Working across different disciplines—software, security, writing, and
                            visual art—helps keep that curiosity alive. Each field approaches problems
                            differently, and the overlap between them often reveals ideas that would
                            otherwise stay hidden.
                        </p>

                        <p className="text-lg leading-relaxed text-[var(--foreground)]/78">
                            This portfolio is not only a showcase. It is a workspace, an archive, and a
                            record of ongoing exploration. It holds finished work, experiments,
                            unfinished thoughts, and the occasional strange idea that seemed worth
                            building. It is meant to feel personal rather than corporate—human rather
                            than polished into something sterile.
                        </p>
                    </motion.section>
                </motion.div>
            </section>
        </main>
    );
}