import type { Metadata } from 'next';
import { Database, TrendingUp } from 'lucide-react';
import ServiceLayout from '@/components/services/ServiceLayout';
import ServiceCard from '@/components/services/ServiceCard';

export const metadata: Metadata = {
  title: 'Pathmatics Services - TBWA\\Intelligence',
  description: 'Access TBWA Intelligence Pathmatics data services',
};

export default function PathmaticsPage() {
  return (
    <ServiceLayout
      title="Pathmatics Services"
      icon={<Database size={32} />}
      description="Services based on Pathmatics for digital advertising intelligence. Analyze digital advertising strategies of your brand and competitors."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          id="pathmatics-ad-intelligence"
          title="Ad Intelligence"
          description="Analyze digital advertising strategies of your brand and competitors."
          icon={<TrendingUp />}
          route="/services/data-sources/pathmatics/ad-intelligence"
          comingSoon={true}
          features={[
            'Ad spend tracking',
            'Creative analysis',
            'Competitor strategies',
            'Market trends',
          ]}
        />
      </div>
    </ServiceLayout>
  );
} 