import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['latin'],
});
import './globals.css';
import { Toaster } from 'react-hot-toast';
import ReduxWrapper from '@/components/ReduxWrapper';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReduxWrapper>
        <body className={roboto.className}>
          {children}
          <Toaster />
        </body>
      </ReduxWrapper>
    </html>
  );
}
