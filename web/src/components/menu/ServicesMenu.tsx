'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, ArrowRight, MessageSquare, TrendingUp, Zap, LogOut, Search, Database, ChevronRight, ChevronDown, Globe, BarChart } from 'lucide-react';
import { supabase } from '@/utils/supabaseClient';
import { AUTH_CONFIG } from '@/utils/auth/config';
import '@/sass/components/menu/_services.sass';

// Interface for individual services
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  route: string;
  comingSoon?: boolean;
}

// Interface for data sources that contain services
interface DataSourceService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  services: ServiceItem[];
}

// Interface for service categories
interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
}

// General services
const generalServices: ServiceItem[] = [
  {
    id: 'brand-discovery',
    title: 'Brand Discovery Analysis',
    description: 'Advanced brand perception analysis and market positioning insights.',
    features: [
      'Brand perception tracking',
      'Competitor analysis',
      'Market positioning',
      'Consumer insights',
    ],
    icon: <Search className="service-card-icon" />,
    route: '/services/brand-discovery',
    comingSoon: false
  },
  {
    id: 'sentiment-analysis',
    title: 'Social Media Sentiment Analysis',
    description: 'Coming soon: Analyze social media comments and posts to understand audience sentiment and engagement patterns.',
    features: [
      'Real-time sentiment tracking',
      'Multi-platform support',
      'Trend analysis and reporting',
      'Engagement metrics',
    ],
    icon: <Brain className="service-card-icon" />,
    route: '/services/sentiment-analysis',
    comingSoon: true
  },
  {
    id: 'engagement-metrics',
    title: 'Engagement Analytics',
    description: 'Coming soon: Track and analyze user engagement across multiple social media platforms.',
    features: [
      'Cross-platform analytics',
      'Audience insights',
      'Performance metrics',
      'Custom reporting',
    ],
    icon: <TrendingUp className="service-card-icon" />,
    route: '/services/engagement-metrics',
    comingSoon: true
  },
  {
    id: 'content-optimization',
    title: 'Content Optimization',
    description: 'Coming soon: AI-powered recommendations for optimizing your social media content.',
    features: [
      'Content performance analysis',
      'Posting time optimization',
      'Audience targeting',
      'A/B testing',
    ],
    icon: <Zap className="service-card-icon" />,
    route: '/services/content-optimization',
    comingSoon: true
  }
];

// Data source services
const dataSourceServices: DataSourceService[] = [
  {
    id: 'rivaliq',
    name: 'RivalIQ',
    description: 'Services based on RivalIQ data for competitive analysis.',
    icon: <Database className="service-card-icon" />,
    route: '/services/data-sources/rivaliq',
    services: [
      {
        id: 'rivaliq-competitive-analysis',
        title: 'Competitive Analysis',
        description: 'Analyze and compare your social media performance with your competitors.',
        features: [
          'Social media benchmarking',
          'Competitor analysis',
          'Performance metrics',
          'Custom reports',
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

// Main categories
const serviceCategories: ServiceCategory[] = [
  {
    id: 'data-sources',
    title: 'Data Source Services',
    description: 'Specialized analytics based on specific marketing platforms and data sources.',
    icon: <Database className="category-icon" />,
    route: '/services/data-sources'
  },
  {
    id: 'general',
    title: 'General Services',
    description: 'Tools and analytics for general marketing and business intelligence needs.',
    icon: <Zap className="category-icon" />,
    route: '/services/general'
  }
];

export default function ServicesMenu() {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    
    try {
      setIsSigningOut(true);
      
      // Limpiar la cookie y el sessionStorage
      document.cookie = "code_verified=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";
      sessionStorage.removeItem('code_verified');
      
      await supabase.auth.signOut();
      router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleCategoryClick = (category: ServiceCategory) => {
    router.push(category.route);
  };

  return (
    <div className="services-menu">
      <div className="services-menu-header">
        <div className="services-menu-brand">
          TBWA<span>\</span>INTELLIGENCE
        </div>
        <button 
          onClick={handleSignOut}
          className="services-menu-signout"
          disabled={isSigningOut}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="services-menu-content">
        <h1>Welcome to Intelligence Platform</h1>
        <p>Select a service category to begin</p>

        <div className="services-menu-grid">
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              className={`service-card ${hoveredCategory === category.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="service-card-content">
                <div className="service-card-header">
                  {category.icon}
                  <h3>{category.title}</h3>
                </div>
                <p>{category.description}</p>
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