import type { Metadata } from 'next';
import { Database, BarChart } from 'lucide-react';
import ServiceLayout from '@/components/services/ServiceLayout';
import ServiceCard from '@/components/services/ServiceCard';

export const metadata: Metadata = {
  title: 'Nielsen Ad Intel Services - TBWA\\Intelligence',
  description: 'Access TBWA Intelligence Nielsen Ad Intel data services',
};

export default function NielsenPage() {
  return (
    <ServiceLayout
      title="Nielsen Ad Intel Services"
      icon={<Database size={32} />}
      description="Services based on Nielsen Ad Intelligence for advertising analysis. Analyze advertising spending patterns across different media and platforms."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          id="nielsen-ad-spend"
          title="Ad Spend Analysis"
          description="Analyze advertising spending patterns across different media and platforms."
          icon={<BarChart />}
          route="/services/data-sources/nielsen/ad-spend"
          comingSoon={true}
          features={[
            'Investment tracking',
            'Industry analysis',
            'Competitive comparison',
            'Market trends',
          ]}
        />
      </div>
    </ServiceLayout>
  );
} 