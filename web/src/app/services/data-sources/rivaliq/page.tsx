import type { Metadata } from 'next';
import { Database, BarChart } from 'lucide-react';
import ServiceLayout from '@/components/services/ServiceLayout';
import ServiceCard from '@/components/services/ServiceCard';

export const metadata: Metadata = {
  title: 'RivalIQ Services - TBWA\\Intelligence',
  description: 'Access TBWA Intelligence RivalIQ data services',
};

export default function RivalIQPage() {
  return (
    <ServiceLayout
      title="RivalIQ Services"
      icon={<Database size={32} />}
      description="Services based on RivalIQ data for competitive analysis. Analyze and compare your social media performance with your competitors."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          id="rivaliq-competitive-analysis"
          title="Competitive Analysis"
          description="Analyze and compare your social media performance with your competitors."
          icon={<BarChart />}
          route="/services/data-sources/rivaliq/competitive-analysis"
          comingSoon={true}
          features={[
            'Social media benchmarking',
            'Competitor analysis',
            'Performance metrics',
            'Custom reports',
          ]}
        />
      </div>
    </ServiceLayout>
  );
} 