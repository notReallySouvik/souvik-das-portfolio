import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/app/components/theme-provider';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export const metadata: Metadata = {
  title: 'Souvik Das',
  description: 'Portfolio of Souvik Das',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}