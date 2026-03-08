import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Canvass — Know Before You Post',
  description: 'Test your out-of-home advertising creative against AI demographic agents before signing a single contract.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
