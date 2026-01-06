import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/app/provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '@/shared/ui/header';
import { Toaster } from '@/shared/ui/toaster';
import { ModeSync } from '@/app/modeSync';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Babamte',
  description: 'Connect with Bab',
  keywords: ['Babamate', 'Bab', '커뮤니티', '소셜 플랫폼', '연결'],
  applicationName: 'Babamate',
  authors: [{ name: 'Babamte Team' }],
  creator: 'Babamte',
  publisher: 'Babamte',
  icons: {
    icon: [{ url: '/logos/babmate-favicon.svg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-subtle text-gray-900`}
      >
        <ReactQueryProvider>
          <main className="min-h-screen w-full">
            <Toaster />
            <ModeSync />
            <div className="w-full">{children}</div>
          </main>
          <Analytics />
          <SpeedInsights />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
