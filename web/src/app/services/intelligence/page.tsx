'use client'

import React from 'react'
import styles from './styles.module.scss'
import Footer from '../../../components/Footer'

interface FeatureData {
  id: string
  text: string
}

interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
  badge?: string
  status: 'Active' | 'Fixing' | 'Coming Soon'
  features: FeatureData[]
}

const IntelligenceServicesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const services: ServiceData[] = [
    {
      id: 'insightforge',
      title: 'InsightForge',
      description: 'Advanced report generator that transforms complex data into visually compelling and actionable insights for clients.',
      icon: 'report',
      badge: 'Report Generation',
      status: 'Active',
      features: [
        { id: 'if1', text: 'Custom Report Templates' },
        { id: 'if2', text: 'Interactive Visualizations' },
        { id: 'if3', text: 'Automated Data Processing' },
        { id: 'if4', text: 'Client-Ready Exports' }
      ]
    },
    {
      id: 'mediaharvest',
      title: 'MediaHarvest',
      description: 'Efficient media retrieval service that extracts and organizes images and videos from social media posts using provided links.',
      icon: 'media',
      badge: 'Media Collection',
      status: 'Active',
      features: [
        { id: 'mh1', text: 'Bulk Media Download' },
        { id: 'mh2', text: 'Automatic Organization' },
        { id: 'mh3', text: 'Format Conversion' },
        { id: 'mh4', text: 'Metadata Extraction' }
      ]
    },
    {
      id: 'sentimentscope',
      title: 'SentimentScope',
      description: 'Advanced analytics tool that collects and analyzes social media comments to provide deep insights into sentiment and performance metrics.',
      icon: 'sentiment',
      badge: 'Sentiment Analysis',
      status: 'Active',
      features: [
        { id: 'ss1', text: 'Comment Extraction' },
        { id: 'ss2', text: 'Sentiment Analysis' },
        { id: 'ss3', text: 'Performance Metrics' },
        { id: 'ss4', text: 'Trend Detection' }
      ]
    },
    {
      id: 'contentevolver',
      title: 'ContentEvolver',
      description: 'AI-powered content generation system that learns from historical performance data to create optimized content recommendations.',
      icon: 'ai',
      badge: 'AI Generation',
      status: 'Active',
      features: [
        { id: 'ce1', text: 'Performance Analysis' },
        { id: 'ce2', text: 'AI Content Generation' },
        { id: 'ce3', text: 'Optimization Suggestions' },
        { id: 'ce4', text: 'Content Strategy Insights' }
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
        <h1 className={styles.pageTitle}>Intelligence Services</h1>
        <p className={styles.pageSubtitle}>
          Advanced intelligence tools for report generation, media collection, sentiment analysis, and AI-powered content optimization
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
            <div key={service.id} className={styles.serviceCard}>
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
  )
}

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'report':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    case 'media':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      )
    case 'sentiment':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      )
    case 'ai':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
          <path d="M12 12 2 12a10 10 0 0 0 17.07 7.07L12 12z"></path>
          <path d="M12 12V2a10 10 0 0 0-7.07 17.07L12 12z"></path>
        </svg>
      )
    default:
      return null
  }
}

export default IntelligenceServicesPage 