import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Categories | TBWA Intelligence',
  description: 'Choose from our range of data analytics and intelligence services.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 