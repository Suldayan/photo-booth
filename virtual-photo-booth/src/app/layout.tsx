import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Virtual Together - Photobooth App',
  description: 'Create memories together or solo with our virtual photobooth',
  keywords: 'photobooth, virtual, memories, photos, friends',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-blue-50 to-teal-50`}>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}