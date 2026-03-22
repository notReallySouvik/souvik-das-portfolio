'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Download,
  Send,
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'temporary@example.com',
    href: 'mailto:temporary@example.com',
    description: 'For project inquiries and collaborations',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/yourusername',
    href: 'https://github.com/yourusername',
    description: 'View my code and open source contributions',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourusername',
    href: 'https://linkedin.com/in/yourusername',
    description: 'Connect professionally',
  },
  {
    icon: Twitter,
    label: 'X / Twitter',
    value: '@yourhandle',
    href: 'https://twitter.com/yourhandle',
    description: 'Follow for updates and thoughts',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus({
        type: 'success',
        message: 'Your message has been sent successfully.',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[120rem] px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <h1 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Contact
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-[var(--foreground)]/78 md:text-xl">
            Reach out for collaborations, project inquiries, or conversation. If
            something you saw here connects with your work, I’d be glad to hear
            from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-10"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold md:text-3xl">
                  Send a message
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/62">
                  Use the form below and it will be routed to my inbox.
                </p>
              </div>

              <a
                href="/cv/souvik-das-cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[var(--foreground)]/84 transition hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm text-[var(--foreground)]/72"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/35 focus:border-[var(--accent)]/35"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-[var(--foreground)]/72"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/35 focus:border-[var(--accent)]/35"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm text-[var(--foreground)]/72"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/35 focus:border-[var(--accent)]/35"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm text-[var(--foreground)]/72"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/35 focus:border-[var(--accent)]/35"
                  placeholder="Tell me a little about your query."
                />
              </div>

              {status.type !== 'idle' && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-green-500/20 bg-green-500/10 text-green-300'
                      : 'border-red-500/20 bg-red-500/10 text-red-300'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
              </button>
            </form>
          </motion.div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
                  className="group block rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-[var(--accent)]/20 hover:bg-white/[0.045]"
                >
                  <div className="flex items-start gap-4">
                    <method.icon className="mt-1 h-7 w-7 flex-shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
                    <div className="min-w-0 flex-1">
                      <h2 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-[var(--accent)]">
                        {method.label}
                      </h2>
                      <p className="mb-3 break-all text-base text-[var(--foreground)]/70">
                        {method.value}
                      </p>
                      <p className="text-sm text-[var(--foreground)]/58">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-10"
            >
              <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
                Let’s build something
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-[var(--foreground)]/78">
                I’m open to interesting projects, collaborations, and
                conversations across software, writing, and creative work.
              </p>
              <p className="text-lg leading-relaxed text-[var(--foreground)]/78">
                The contact form is the easiest way to reach me. You can also
                use the links above.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}