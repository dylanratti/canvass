import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Passerby — Know Before You Post',
  description: 'Know if your billboard creative will land before you post it. Test against AI agents trained to respond like your real audience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
