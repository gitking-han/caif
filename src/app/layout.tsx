import type { Metadata } from 'next';
import '@/styles/globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CAIF - Creative Agency',
  description: 'Professional creative services and portfolio showcase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950" suppressHydrationWarning>
        {children}
        {/* Global footer included so it appears on every page */}
        {/* Footer is a client component kept simple to avoid layout mismatches */}
        <Footer />
      </body>
    </html>
  );
}
