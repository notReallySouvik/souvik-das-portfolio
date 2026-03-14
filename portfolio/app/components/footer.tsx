import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/yourusername",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      icon: Linkedin,
    },
    {
      name: "X",
      href: "https://x.com/yourusername",
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/yourusername",
      icon: Instagram,
    },
    {
      name: "Email",
      href: "mailto:you@email.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-[var(--background)]">
      <div className="mx-auto w-full max-w-[120rem] px-6 py-8 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Copyright */}
          <div className="text-sm text-[var(--foreground)]/50">
            © {currentYear} Souvik Das. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-[var(--foreground)]/70 transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}