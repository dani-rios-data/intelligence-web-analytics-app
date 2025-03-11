import type { Metadata } from 'next';
import GeneralServicesMenu from '@/components/menu/GeneralServicesMenu';

export const metadata: Metadata = {
  title: 'General Services - TBWA\\Intelligence',
  description: 'Access TBWA Intelligence general services',
};

export default function GeneralServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <GeneralServicesMenu />
    </main>
  );
} 