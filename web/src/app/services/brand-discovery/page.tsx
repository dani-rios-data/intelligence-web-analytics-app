import type { Metadata } from 'next';
import BrandDiscoveryWrapper from '@/components/brand/BrandDiscoveryWrapper';

export const metadata: Metadata = {
  title: 'Brand Discovery - TBWA\\Intelligence',
  description: 'Brand Discovery Analysis Tool',
};

export default function BrandDiscoveryPage() {
  return <BrandDiscoveryWrapper />;
} 