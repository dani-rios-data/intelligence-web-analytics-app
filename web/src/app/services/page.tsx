import type { Metadata } from 'next';
import ServicesMenu from '@/components/menu/ServicesMenu';

export const metadata: Metadata = {
  title: 'Services - TBWA\\Intelligence',
  description: 'Access TBWA Intelligence services',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <ServicesMenu />
    </main>
  );
} 