import type { Metadata } from 'next';
import { Globe, Brain } from 'lucide-react';
import ServiceLayout from '@/components/services/ServiceLayout';
import ServiceCard from '@/components/services/ServiceCard';

export const metadata: Metadata = {
  title: 'GWI Services - TBWA\\Intelligence',
  description: 'Access TBWA Intelligence GWI data services',
};

export default function GWIPage() {
  return (
    <ServiceLayout
      title="GWI Services"
      icon={<Globe size={32} />}
      description="Services based on Global Web Index for global audience insights. Understand behaviors, attitudes, and preferences of your target audience."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          id="gwi-audience-insights"
          title="Audience Insights"
          description="Understand behaviors, attitudes, and preferences of your target audience."
          icon={<Brain />}
          route="/services/data-sources/gwi/audience-insights"
          comingSoon={true}
          features={[
            'Audience profiles',
            'Demographic analysis',
            'Online behavior',
            'Consumer trends',
          ]}
        />
      </div>
    </ServiceLayout>
  );
} 