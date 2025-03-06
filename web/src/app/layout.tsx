import { Metadata } from 'next';
import { headers } from 'next/headers';
import Providers from '@/components/common/Providers';
import '@/sass/main.sass';

export const metadata: Metadata = {
  title: 'TBWA File Processor',
  description: 'CSV and Excel file processing system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 