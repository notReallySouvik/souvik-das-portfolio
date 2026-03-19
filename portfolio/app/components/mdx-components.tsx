import Link from 'next/link';
import type { ReactNode } from 'react';

type CalloutProps = {
  type?: 'note' | 'warning' | 'tip';
  children: ReactNode;
};

export function Callout({ type = 'note', children }: CalloutProps) {
  const styles = {
    note: 'border-blue-500/20 bg-blue-500/10 text-blue-200',
    warning: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-200',
    tip: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200',
  };

  return (
    <div className={`my-6 rounded-2xl border p-5 ${styles[type]}`}>
      {children}
    </div>
  );
}

export const mdxComponents = {
  Callout,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-[var(--accent)] underline underline-offset-4 hover:opacity-80"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="mt-12 mb-5 scroll-mt-24 text-2xl font-semibold tracking-tight"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="mt-10 mb-4 scroll-mt-24 text-xl font-semibold tracking-tight"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-5 leading-8 text-[var(--foreground)]/82" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-5 list-disc space-y-2 pl-6" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-5 list-decimal space-y-2 pl-6" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-[var(--accent)]/40 pl-5 italic text-[var(--foreground)]/70"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded bg-white/5 px-1.5 py-0.5 text-[0.95em]"
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-2xl border border-white/8 bg-[#0a0a0a] p-4"
    />
  ),
  Link,
};