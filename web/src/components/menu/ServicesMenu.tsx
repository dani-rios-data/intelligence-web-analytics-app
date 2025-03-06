'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, ArrowRight, MessageSquare, TrendingUp, Zap, LogOut, Search } from 'lucide-react';
import { supabase } from '@/utils/supabaseClient';
import { AUTH_CONFIG } from '@/utils/auth/config';
import '@/sass/components/menu/_services.sass';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: JSX.Element;
  route: string;
  comingSoon?: boolean;
}

const services: ServiceCard[] = [
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

export default function ServicesMenu() {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    
    try {
      await supabase.auth.signOut();
      router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleServiceClick = (service: ServiceCard) => {
    if (service.comingSoon) {
      return;
    }
    setSelectedService(service.id);
    if (service.route.startsWith('http')) {
      window.location.href = service.route;
      return;
    }
    setTimeout(() => {
      router.push(service.route);
    }, 300);
  };

  return (
    <div className="services-container">
      <nav className="services-nav">
        <div className="services-nav-brand">
          TBWA<span>\</span>INTELLIGENCE
        </div>
        <button 
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="services-nav-signout"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </nav>

      <div className="services-content">
        <h1>Welcome to</h1>
        <h2>
          INTELLIGENCE<span>\</span><br />
          PLATFORM
        </h2>

        <p className="services-subtitle">Select a service to begin your analysis</p>

        <div className="services-grid">
          {services.map((service) => (
            <button
              key={service.id}
              className={`service-card ${hoveredService === service.id ? 'hovered' : ''} 
                        ${selectedService === service.id ? 'selected' : ''} 
                        ${service.comingSoon ? 'coming-soon' : ''}`}
              onClick={() => handleServiceClick(service)}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              disabled={service.comingSoon}
            >
              <div className="service-card-content">
                <div className="service-card-icon-wrapper">
                  {service.icon}
                  {service.comingSoon && (
                    <span className="service-card-badge">Coming Soon</span>
                  )}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
                <ul className="service-card-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <MessageSquare size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service-card-arrow">
                <ArrowRight size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <footer className="services-footer">
        <p>TBWA Intelligence Analytics Platform</p>
        <p>© {new Date().getFullYear()} TBWA Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
} 