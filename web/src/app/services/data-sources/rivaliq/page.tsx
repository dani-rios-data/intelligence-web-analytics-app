'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import Footer from '../../../../components/Footer'

interface SubService {
  id: string
  name: string
  route: string
  description: string
  status: 'Active' | 'Fixing' | 'Coming Soon'
}

const RivalIQPage = () => {
  const router = useRouter();
  
  const subServices: SubService[] = [
    {
      id: 'social-media',
      name: 'Social Media Extractor',
      route: '/services/data-sources/rivaliq/social-media',
      description: 'Extract and analyze social media data from multiple platforms to generate comprehensive performance insights.',
      status: 'Active'
    },
    {
      id: 'content',
      name: 'Content Extractor',
      route: '/services/data-sources/rivaliq/content',
      description: 'Process and analyze content performance data to identify trends and optimization opportunities.',
      status: 'Active'
    },
    {
      id: 'categorization',
      name: 'Categorization',
      route: '/services/data-sources/rivaliq/categorization',
      description: 'Automatically categorize and classify content using advanced AI algorithms.',
      status: 'Active'
    },
    {
      id: 'benchmarking',
      name: 'Benchmarking',
      route: '/services/data-sources/rivaliq/benchmarking',
      description: 'Compare performance metrics against competitors and industry standards.',
      status: 'Active'
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
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
          Back to Data Sources
        </button>
        
        <div className={styles.logo}>
          TBWA<span>\</span>INTELLIGENCE
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.serviceHeader}>
          <h1 className={styles.pageTitle}>RivalIQ Services</h1>
        </div>
        
        <p className={styles.pageSubtitle}>
          Process and analyze social media data from RivalIQ platform to generate advanced competitive intelligence and benchmarking insights.
        </p>

        <div className={styles.servicesGrid}>
          {subServices.map(service => (
            <div 
              key={service.id} 
              className={styles.serviceCard}
              onClick={() => router.push(service.route)}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.serviceTitle}>{service.name}</h2>
                <div className={styles.badges}>
                  <span className={styles.platformBadge}>RivalIQ</span>
                  <span className={styles.categoryBadge}>Social Analytics</span>
                </div>
              </div>
              <p className={styles.serviceDescription}>{service.description}</p>
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

export default RivalIQPage; 