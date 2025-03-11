'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database, ChevronRight, Globe, BarChart, MessageSquare, TrendingUp, Brain, ArrowLeft } from 'lucide-react';
import '@/sass/components/menu/_services.sass';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  route: string;
  comingSoon?: boolean;
}

interface DataSourceService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  services: ServiceItem[];
}

// Data source services
const dataSourceServices: DataSourceService[] = [
  {
    id: 'rivaliq',
    name: 'RivalIQ Analytics',
    description: 'Comprehensive competitive analysis and social media benchmarking platform.',
    icon: <Database className="service-card-icon" />,
    route: '/services/data-sources/rivaliq',
    services: [
      {
        id: 'rivaliq-competitive-analysis',
        title: 'Competitive Analysis',
        description: 'Deep dive into your social media performance compared to competitors.',
        features: [
          'Cross-platform benchmarking',
          'Performance analytics',
          'Competitor tracking',
          'Custom reporting',
        ],
        icon: <BarChart className="service-card-icon" />,
        route: '/services/data-sources/rivaliq/competitive-analysis',
        comingSoon: true
      }
    ]
  },
  {
    id: 'sprinklr',
    name: 'Sprinklr',
    description: 'Services based on the Sprinklr platform for customer experience management.',
    icon: <Database className="service-card-icon" />,
    route: '/services/data-sources/sprinklr',
    services: [
      {
        id: 'sprinklr-social-listening',
        title: 'Social Listening',
        description: 'Monitor social media conversations to understand brand perception.',
        features: [
          'Mention monitoring',
          'Sentiment analysis',
          'Trend identification',
          'Real-time alerts',
        ],
        icon: <MessageSquare className="service-card-icon" />,
        route: '/services/data-sources/sprinklr/social-listening',
        comingSoon: true
      }
    ]
  },
  {
    id: 'pathmatics',
    name: 'Pathmatics',
    description: 'Services based on Pathmatics for digital advertising intelligence.',
    icon: <Database className="service-card-icon" />,
    route: '/services/data-sources/pathmatics',
    services: [
      {
        id: 'pathmatics-ad-intelligence',
        title: 'Ad Intelligence',
        description: 'Analyze digital advertising strategies of your brand and competitors.',
        features: [
          'Ad spend tracking',
          'Creative analysis',
          'Competitor strategies',
          'Market trends',
        ],
        icon: <TrendingUp className="service-card-icon" />,
        route: '/services/data-sources/pathmatics/ad-intelligence',
        comingSoon: true
      }
    ]
  },
  {
    id: 'gwi',
    name: 'GWI',
    description: 'Services based on Global Web Index for global audience insights.',
    icon: <Globe className="service-card-icon" />,
    route: '/services/data-sources/gwi',
    services: [
      {
        id: 'gwi-audience-insights',
        title: 'Audience Insights',
        description: 'Understand behaviors, attitudes, and preferences of your target audience.',
        features: [
          'Audience profiles',
          'Demographic analysis',
          'Online behavior',
          'Consumer trends',
        ],
        icon: <Brain className="service-card-icon" />,
        route: '/services/data-sources/gwi/audience-insights',
        comingSoon: true
      }
    ]
  },
  {
    id: 'nielsen',
    name: 'Nielsen Ad Intel',
    description: 'Services based on Nielsen Ad Intelligence for advertising analysis.',
    icon: <Database className="service-card-icon" />,
    route: '/services/data-sources/nielsen',
    services: [
      {
        id: 'nielsen-ad-spend',
        title: 'Ad Spend Analysis',
        description: 'Analyze advertising spending patterns across different media and platforms.',
        features: [
          'Investment tracking',
          'Industry analysis',
          'Competitive comparison',
          'Market trends',
        ],
        icon: <BarChart className="service-card-icon" />,
        route: '/services/data-sources/nielsen/ad-spend',
        comingSoon: true
      }
    ]
  }
];

export default function DataSourcesMenu() {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleDataSourceClick = (dataSource: DataSourceService) => {
    router.push(dataSource.route);
  };

  return (
    <div className="services-menu">
      <div className="services-menu-header">
        <div className="services-menu-nav">
          <button 
            onClick={() => router.push('/services')}
            className="services-menu-back"
          >
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </button>
          <div className="services-menu-brand">
            TBWA<span>\</span>INTELLIGENCE
          </div>
        </div>

        <div className="services-menu-title">
          <h1>Data & Analytics Services</h1>
          <p>Advanced analytics and insights powered by industry-leading platforms</p>
        </div>
      </div>

      <div className="services-menu-content">
        <div className="services-menu-grid">
          {dataSourceServices.map((dataSource) => (
            <div
              key={dataSource.id}
              className={`service-card ${hoveredService === dataSource.id ? 'hovered' : ''} ${
                selectedService === dataSource.id ? 'selected' : ''
              }`}
              onMouseEnter={() => setHoveredService(dataSource.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => handleDataSourceClick(dataSource)}
            >
              <div className="service-card-content">
                <div className="service-card-header">
                  {dataSource.icon}
                  <h3>{dataSource.name}</h3>
                </div>
                <p className="service-card-description">{dataSource.description}</p>
                <div className="service-card-features">
                  {dataSource.services.map((service) => (
                    <div key={service.id} className="service-feature">
                      <ChevronRight size={14} />
                      <span>{service.title}</span>
                      {service.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="common-footer">
        <div className="footer-brand">
          TBWA Intelligence Analytics Platform
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} TBWA Intelligence. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 