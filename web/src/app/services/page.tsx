'use client';

import React, { useState, useEffect } from 'react';
import { Database, BarChart2, ArrowRight, LogOut, Home, Settings, HelpCircle, Users, Bell } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.scss';
import Footer from '@/components/Footer';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  searchQuery: string;
  subServices?: {
    id: string;
    title: string;
    description: string;
    features?: string[];
  }[];
}

interface ServiceCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  route: string;
  subServices?: {
    id: string;
    title: string;
    description: string;
    features?: string[];
  }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  isHovered, 
  onClick, 
  onMouseEnter, 
  onMouseLeave,
  searchQuery,
  subServices
}) => {
  const matchingSubServices = searchQuery && subServices?.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.features?.some(feature =>
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div 
      className={styles.serviceCard}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            {icon}
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        
        <p className={styles.cardDescription}>{description}</p>

        {matchingSubServices && matchingSubServices.length > 0 && (
          <div className={styles.matchingServices}>
            <div className={styles.matchingServicesTitle}>
              Related services:
            </div>
            {matchingSubServices.map(service => (
              <div key={service.id} className={styles.matchingServiceItem}>
                <span className={styles.matchingServiceName}>{service.title}</span>
                <p className={styles.matchingServiceDesc}>{service.description}</p>
                {service.features && service.features.some(feature => 
                  feature.toLowerCase().includes(searchQuery.toLowerCase())
                ) && (
                  <div className={styles.matchingFeatures}>
                    {service.features
                      .filter(feature => 
                        feature.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((feature, index) => (
                        <span key={index} className={styles.matchingFeature}>
                          {feature}
                        </span>
                      ))
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className={styles.cardAction}>
          <span className={styles.actionText}>
            Explore services
          </span>
          <ArrowRight size={16} className={styles.actionIcon} />
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isHelpActive, setIsHelpActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('sideMenu');
      const menuButton = document.getElementById('menuButton');
      if (isMenuOpen && menu && !menu.contains(event.target as Node) && menuButton && !menuButton.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const serviceCategories: ServiceCategory[] = [
    {
      id: 'custom',
      icon: <Database size={22} />,
      title: 'Custom Platform Services',
      description: 'Specialized analytics and tools for specific marketing platforms requiring particular data formats and structures.',
      route: '/services/data-sources',
      subServices: [
        {
          id: 'rivaliq',
          title: 'RivalIQ',
          description: 'Process and analyze social media data for competitive intelligence and benchmarking insights.',
          features: ['Social Analytics', 'RivalIQ Data Integration', 'Custom Analytics Reports', 'Automated Insights Generation']
        },
        {
          id: 'gwi',
          title: 'GWI',
          description: 'Transform GWI platform data into actionable consumer insights and audience understanding.',
          features: ['Market Research', 'GWI Data Integration', 'Custom Audience Reports', 'Trend Pattern Analysis']
        },
        {
          id: 'sprinklr',
          title: 'Sprinklr',
          description: 'Process social listening data for comprehensive brand monitoring and engagement insights.',
          features: ['Social Listening', 'Sprinklr Data Integration', 'Custom Monitoring Reports', 'Sentiment Analysis']
        },
        {
          id: 'pathmatics',
          title: 'Pathmatics',
          description: 'Transform advertising data into detailed competitive intelligence and market spending analysis.',
          features: ['Ad Intelligence', 'Pathmatics Data Integration', 'Spend Analysis Reports', 'Creative Performance Insights']
        }
      ]
    },
    {
      id: 'intelligence',
      icon: <BarChart2 size={22} />,
      title: 'Intelligence Services',
      description: 'Versatile marketing intelligence tools for social media, content performance, and creative insights that work with standard data formats.',
      route: '/services/intelligence'
    }
  ];

  const filteredServices = serviceCategories.filter(category => {
    const matchInCategory = 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchInSubServices = category.subServices?.some(service =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features?.some(feature =>
        feature.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return matchInCategory || matchInSubServices;
  });

  const handleSignOut = () => {
    router.push('/auth/signin');
  };

  const handleHelpClick = () => {
    setIsHelpActive(true);
    window.open('/help', '_blank');
    setTimeout(() => setIsHelpActive(false), 1000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            id="menuButton"
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={styles.logo}>
            <span>TBWA</span>
            <span className={styles.accent}>\</span>
            <span>INTELLIGENCE</span>
          </div>
        </div>
        <button onClick={handleSignOut} className={`${styles.headerButton} ${styles.signOutButton}`}>
          <span>Sign Out</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </header>

      <div 
        className={`${styles.menuOverlay} ${isMenuOpen ? styles.open : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div 
        id="sideMenu"
        className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}
      >
        <div className={styles.menuContent}>
          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Navigation</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
                  <Home size={18} />
                  Dashboard
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/services" className={pathname === '/services' ? styles.active : ''}>
                  <Database size={18} />
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Notifications</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link href="/notifications" className={pathname === '/notifications' ? styles.active : ''}>
                  <Bell size={18} />
                  Notification Center
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Account</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link href="/profile" className={pathname === '/profile' ? styles.active : ''}>
                  <Users size={18} />
                  Profile
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/settings" className={pathname === '/settings' ? styles.active : ''}>
                  <Settings size={18} />
                  Settings
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/help" className={pathname === '/help' ? styles.active : ''}>
                  <HelpCircle size={18} />
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.titleSection}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                Welcome to Intelligence Platform
              </h1>
              <div className={styles.accent}></div>
              <p className={styles.subtitle}>Select a service category to begin</p>
            </div>
          </div>

          <div className={styles.searchContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.servicesGrid}>
            {filteredServices.map((category) => (
              <ServiceCard 
                key={category.id}
                icon={category.icon}
                title={category.title}
                description={category.description}
                isHovered={hoveredCard === category.id}
                onClick={() => router.push(category.route)}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                searchQuery={searchQuery}
                subServices={category.subServices}
              />
            ))}
          </div>
          
          <div className={styles.helpSection}>
            <button 
              className={`${styles.helpButton} ${isHelpActive ? styles.active : ''}`}
              onClick={handleHelpClick}
            >
              Need help choosing the right service?
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage; 