import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const display = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Child Genius Academy Vijaypur | Abacus | Art | Skill Development',
  description:
    'Best child development academy providing abacus, handwriting, art, music, yoga and creativity programs. VidhiDiya\'s Child Genius Academy Vijaypur — unlock the genius inside every child.',
  keywords: [
    'child genius academy',
    'abacus vijaypur',
    'mental arithmetic',
    'handwriting improvement',
    'art classes children',
    'yoga kids',
    'skill development vijaypur',
    'VidhiDiya',
  ],
  openGraph: {
    title: "VidhiDiya's Child Genius Academy Vijaypur",
    description:
      'Premium child development academy — abacus, art, music, yoga & more. Unlock the genius inside every child.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FFD54F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
