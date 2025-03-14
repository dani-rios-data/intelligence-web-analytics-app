'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import Footer from '../../../components/Footer'
import { useRouter } from 'next/navigation'

interface FeatureData {
  id: string
  text: string
}

interface SubService {
  id: string
  name: string
  route: string
}

interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
  badge?: string
  status: 'Active' | 'Fixing' | 'Coming Soon'
  features: FeatureData[]
  subServices?: SubService[]
}

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'social':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      )
    case 'chart':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    case 'analytics':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 3v18h18"></path>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
        </svg>
      )
    case 'globe':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    default:
      return null
  }
}

const DataSourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const services: ServiceData[] = [
    {
      id: 'rivaliq',
      title: 'RivalIQ',
      description: 'Process and analyze social media data from RivalIQ platform to generate advanced competitive intelligence and benchmarking insights.',
      icon: 'chart',
      badge: 'Social Analytics',
      status: 'Active',
      features: [
        { id: 'ri1', text: 'RivalIQ Data Integration' },
        { id: 'ri2', text: 'Custom Analytics Reports' },
        { id: 'ri3', text: 'Automated Insights Generation' }
      ],
      subServices: [
        { id: 'social-media', name: 'Social Media Extractor', route: '/services/data-sources/rivaliq/social-media' },
        { id: 'content', name: 'Content Extractor', route: '/services/data-sources/rivaliq/content' },
        { id: 'categorization', name: 'Categorization', route: '/services/data-sources/rivaliq/categorization' },
        { id: 'benchmarking', name: 'Benchmarking', route: '/services/data-sources/rivaliq/benchmarking' }
      ]
    },
    {
      id: 'gwi',
      title: 'GWI',
      description: 'Transform GWI platform data into actionable consumer insights and detailed audience understanding through custom analytics.',
      icon: 'globe',
      badge: 'Market Research',
      status: 'Active',
      features: [
        { id: 'gwi1', text: 'GWI Data Integration' },
        { id: 'gwi2', text: 'Custom Audience Reports' },
        { id: 'gwi3', text: 'Trend Pattern Analysis' }
      ]
    },
    {
      id: 'sprinklr',
      title: 'Sprinklr',
      description: 'Process and analyze social listening data from Sprinklr to deliver comprehensive brand monitoring and engagement insights.',
      icon: 'social',
      badge: 'Social Listening',
      status: 'Active',
      features: [
        { id: 'sp1', text: 'Sprinklr Data Integration' },
        { id: 'sp2', text: 'Custom Monitoring Reports' },
        { id: 'sp3', text: 'Sentiment Analysis' }
      ]
    },
    {
      id: 'pathmatics',
      title: 'Pathmatics',
      description: 'Transform advertising data from Pathmatics into detailed competitive intelligence and market spending analysis.',
      icon: 'analytics',
      badge: 'Ad Intelligence',
      status: 'Active',
      features: [
        { id: 'pm1', text: 'Pathmatics Data Integration' },
        { id: 'pm2', text: 'Spend Analysis Reports' },
        { id: 'pm3', text: 'Creative Performance Insights' }
      ]
    },
    {
      id: 'nielsen',
      title: 'Nielsen Ad Intel',
      description: 'Process and analyze advertising data from Nielsen Ad Intel to deliver comprehensive media spend insights and competitive intelligence.',
      icon: 'analytics',
      badge: 'Ad Intelligence',
      status: 'Active',
      features: [
        { id: 'ni1', text: 'Nielsen Data Integration' },
        { id: 'ni2', text: 'Media Spend Analysis' },
        { id: 'ni3', text: 'Cross-Platform Intelligence' },
        { id: 'ni4', text: 'Market Trend Reports' }
      ]
    }
  ]

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.features.some(feature => 
      feature.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'rivaliq') {
      router.push('/services/data-sources/rivaliq');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => window.history.back()} className={styles.backButton}>
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
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          Back to Services
        </button>
        
        <div className={styles.logo}>
          TBWA<span>\</span>INTELLIGENCE
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Custom Platform Services</h1>
        <p className={styles.pageSubtitle}>
          Custom analytics services that process and transform data from RivalIQ, GWI, Sprinklr, Pathmatics, and Nielsen Ad Intel into actionable intelligence
        </p>

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
          {filteredServices.map(service => (
            <div 
              key={service.id} 
              className={styles.serviceCard}
              onClick={() => handleServiceClick(service.id)}
            >
              {service.badge && (
                <span className={styles.platformBadge}>{service.badge}</span>
              )}
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}>
                  {getServiceIcon(service.icon)}
                </div>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
              </div>
              <p className={styles.serviceDescription}>{service.description}</p>
              <div className={styles.serviceFeatures}>
                {service.features.map(feature => (
                  <div key={feature.id} className={styles.featureItem}>
                    <span className={styles.featureIcon}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              <span className={`${styles.featureBadge} ${styles[service.status.toLowerCase().replace(' ', '-')]}`}>
                {service.status}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.footerSpacing} />
        <Footer />
      </main>
    </div>
  );
};

export default DataSourcesPage;