'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Brain, TrendingUp, Zap, ArrowLeft, ChevronRight } from 'lucide-react';
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

// General services
const generalServices: ServiceItem[] = [
  {
    id: 'brand-discovery',
    title: 'Brand Discovery Analysis',
    description: 'Uncover deep insights about your brand perception and market position through advanced analytics.',
    features: [
      'AI-powered brand analysis',
      'Market trend identification',
      'Competitive positioning',
      'Consumer sentiment tracking',
    ],
    icon: <Search className="service-card-icon" />,
    route: '/services/brand-discovery',
    comingSoon: false
  },
  {
    id: 'sentiment-analysis',
    title: 'Social Media Sentiment Analysis',
    description: 'Harness the power of AI to understand audience sentiment and engagement across social platforms.',
    features: [
      'Real-time sentiment tracking',
      'Multi-platform analysis',
      'Trend visualization',
      'Actionable insights',
    ],
    icon: <Brain className="service-card-icon" />,
    route: '/services/sentiment-analysis',
    comingSoon: true
  },
  {
    id: 'engagement-metrics',
    title: 'Engagement Analytics',
    description: 'Comprehensive analysis of user engagement patterns across all your social media channels.',
    features: [
      'Cross-platform metrics',
      'Audience behavior analysis',
      'Performance tracking',
      'Custom dashboards',
    ],
    icon: <TrendingUp className="service-card-icon" />,
    route: '/services/engagement-metrics',
    comingSoon: true
  },
  {
    id: 'content-optimization',
    title: 'Content Optimization',
    description: 'AI-driven recommendations to maximize the impact of your social media content strategy.',
    features: [
      'Content performance analysis',
      'Optimal posting strategies',
      'Audience targeting',
      'A/B testing insights',
    ],
    icon: <Zap className="service-card-icon" />,
    route: '/services/content-optimization',
    comingSoon: true
  }
];

export default function GeneralServicesMenu() {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (service: ServiceItem) => {
    if (service.comingSoon) return;
    setSelectedService(service.id);
    router.push(service.route);
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
          <h1>Intelligence Services</h1>
          <p>Advanced analytics and AI-powered solutions for strategic insights</p>
        </div>
      </div>

      <div className="services-menu-content">
        <div className="services-menu-grid">
          {generalServices.map((service) => (
            <div
              key={service.id}
              className={`service-card ${hoveredService === service.id ? 'hovered' : ''} ${
                selectedService === service.id ? 'selected' : ''
              } ${service.comingSoon ? 'coming-soon' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => handleServiceClick(service)}
            >
              <div className="service-card-content">
                <div className="service-card-header">
                  {service.icon}
                  <h3>{service.title}</h3>
                  {service.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
                </div>
                <p className="service-card-description">{service.description}</p>
                <div className="service-card-features">
                  {service.features.map((feature, index) => (
                    <div key={index} className="service-feature">
                      <ChevronRight size={14} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="services-menu-footer">
        <div className="services-menu-brand">
          TBWA<span>\</span>INTELLIGENCE
        </div>
        <p>© {new Date().getFullYear()} TBWA Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
} 