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
  title: 'AI Powered Invoice Management System',
  description:
    'AI Powered Invoice Management System is a web application that helps you to manage your invoices. It uses AI to extract data from invoices and store them in a database. It also provides a dashboard to view and manage your invoices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReduxWrapper>
        <body className={roboto.className} suppressHydrationWarning>
          {children}
          <Toaster />
        </body>
      </ReduxWrapper>
    </html>
  );
}
