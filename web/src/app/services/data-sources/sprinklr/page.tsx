import type { Metadata } from 'next';
import { Database, MessageSquare } from 'lucide-react';
import ServiceLayout from '@/components/services/ServiceLayout';
import ServiceCard from '@/components/services/ServiceCard';

export const metadata: Metadata = {
  title: 'Sprinklr Services - TBWA\\Intelligence',
  description: 'Access TBWA Intelligence Sprinklr data services',
};

export default function SprinklrPage() {
  return (
    <ServiceLayout
      title="Sprinklr Services"
      icon={<Database size={32} />}
      description="Services based on the Sprinklr platform for customer experience management. Monitor social media conversations to understand brand perception."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          id="sprinklr-social-listening"
          title="Social Listening"
          description="Monitor social media conversations to understand brand perception."
          icon={<MessageSquare />}
          route="/services/data-sources/sprinklr/social-listening"
          comingSoon={true}
          features={[
            'Mention monitoring',
            'Sentiment analysis',
            'Trend identification',
            'Real-time alerts',
          ]}
        />
      </div>
    </ServiceLayout>
  );
} 