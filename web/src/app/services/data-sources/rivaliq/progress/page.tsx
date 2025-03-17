'use client'

import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'

interface SubService {
  id: string
  name: string
  route: string
  description: string
  status: 'Active' | 'Fixing' | 'Coming Soon'
}

const RivalIQProgress = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [activeDescription, setActiveDescription] = useState<string | null>(null);
  
  const selectedServiceIds = params?.get('services')?.split(',') ?? [];
  
  const allServices: SubService[] = [
    {
      id: 'data-visualization',
      name: 'Data Visualization',
      route: '/services/data-sources/rivaliq/data-visualization',
      description: 'Raw data dashboards and metrics visualization from CSV sources, providing immediate insights into performance and trends.',
      status: 'Active'
    },
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
    },
    {
      id: 'sentiment-analysis',
      name: 'Sentiment Analysis',
      route: '/services/data-sources/rivaliq/sentiment-analysis',
      description: 'Advanced AI-powered analysis of content sentiment, audience reactions, and emotional response patterns.',
      status: 'Active'
    },
    {
      id: 'report-insight',
      name: 'Report Insight',
      route: '/services/data-sources/rivaliq/report-insight',
      description: 'Comprehensive reports enhanced with images, videos, AI-powered insights, and strategic recommendations for business growth.',
      status: 'Active'
    }
  ];

  const subServices = allServices.filter(service => 
    selectedServiceIds.includes(service.id)
  );

  const handleStepClick = (serviceId: string) => {
    if (activeDescription === serviceId) {
      setActiveDescription(null);
    } else {
      setActiveDescription(serviceId);
    }
  };

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
          Back to Configuration
        </button>
        
        <div className={styles.logo}>
          TBWA<span>\</span>INTELLIGENCE
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.serviceHeader}>
            <h1 className={styles.pageTitle}>
              <span className={styles.backslash}>\</span>RivalIQ Progress
            </h1>
          </div>
          
          <p className={styles.pageSubtitle}>
            Track the progress of your selected RivalIQ data processing pipeline steps.
          </p>

          <div className={styles.pipelineContainer}>
            {subServices.map((service, index) => (
              <div 
                key={service.id} 
                className={styles.pipelineStep}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div 
                  className={`${styles.stepNumber} ${activeDescription === service.id ? styles.active : ''}`}
                  onClick={() => handleStepClick(service.id)}
                >
                  {index + 1}
                </div>
                <div className={styles.stepContent}>
                  <h2 className={styles.serviceTitle}>{service.name}</h2>
                  <div className={`${styles.descriptionContainer} ${activeDescription === service.id ? styles.visible : ''}`}>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                    <div className={styles.statusBadge}>
                      <span className={`${styles.featureBadge} ${styles[service.status.toLowerCase().replace(' ', '-')]}`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.footerMessage}>
            TRANSFORM YOUR SOCIAL MEDIA DATA INTO<br />
            ACTIONABLE COMPETITIVE INTELLIGENCE
          </div>
        </div>
      </main>
      
      <div className={styles.footerWrapper}>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              TBWA Intelligence Analytics Platform
            </div>
            <div className={styles.footerCopyright}>
              © 2025 TBWA Intelligence. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RivalIQProgress; 