'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'

interface ServiceOption {
  id: string
  name: string
  description: string
  isIndependent: boolean
  dependsOn: string[]
  recommendedDependencies?: string[]
}

const RivalIQConfig = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'independent' | 'pipeline'>('pipeline');

  const services: ServiceOption[] = [
    {
      id: 'sentiment-analysis',
      name: 'Sentiment Analysis',
      description: 'AI-powered analysis of content sentiment and audience reactions, providing deep insights into emotional responses and engagement patterns.',
      isIndependent: true,
      dependsOn: []
    },
    {
      id: 'social-media',
      name: 'Social Media Extractor',
      description: 'Extract and analyze social media data from multiple platforms, forming the foundation for comprehensive social analytics.',
      isIndependent: false,
      dependsOn: []
    },
    {
      id: 'content',
      name: 'Content Extractor',
      description: 'Process and analyze content performance data, identifying trends and optimization opportunities across your social media presence.',
      isIndependent: false,
      dependsOn: ['social-media']
    },
    {
      id: 'categorization',
      name: 'Categorization',
      description: 'Automatically categorize and classify content using advanced AI algorithms, enabling deeper insights into content performance by category.',
      isIndependent: false,
      dependsOn: ['content']
    },
    {
      id: 'benchmarking',
      name: 'Benchmarking',
      description: 'Compare performance metrics against competitors and industry standards, providing actionable insights for strategic improvements.',
      isIndependent: false,
      dependsOn: ['social-media', 'content'],
      recommendedDependencies: ['categorization']
    },
    {
      id: 'report-insight',
      name: 'Report Insight',
      description: 'Generate comprehensive reports with AI-powered insights and strategic recommendations for business growth and optimization. Each selected service will have its own dedicated tab in the final report.',
      isIndependent: false,
      dependsOn: ['social-media', 'content', 'categorization'],
      recommendedDependencies: ['benchmarking']
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a CSV or Excel file (.xlsx, .xls)');
        setFile(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileType = droppedFile.name.split('.').pop()?.toLowerCase();
      if (fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls') {
        setFile(droppedFile);
        setError('');
      } else {
        setError('Please upload a CSV or Excel file (.xlsx, .xls)');
        setFile(null);
      }
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => {
      const service = services.find(s => s.id === serviceId);
      if (!service) return prev;

      if (prev.includes(serviceId)) {
        // If we're deselecting a service, also deselect its dependents
        const dependentServices = services.filter(s => s.dependsOn.includes(serviceId));
        return prev.filter(id => id !== serviceId && !dependentServices.map(s => s.id).includes(id));
      } else {
        // If we're selecting a service, also select its dependencies
        const dependencies = service.dependsOn;
        return [...new Set([...prev, serviceId, ...dependencies])];
      }
    });
  };

  const isServiceDisabled = (service: ServiceOption): boolean => {
    if (service.isIndependent) return false;
    return service.dependsOn.some(dep => !selectedServices.includes(dep));
  };

  const handleSubmit = () => {
    if (!file) {
      setError('Please upload a file before continuing');
      return;
    }
    if (selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }
    
    // Here we would handle file upload and validation
    // For now, we'll just redirect to the progress page
    router.push(`/services/data-sources/rivaliq/progress?services=${selectedServices.join(',')}`);
  };

  const renderDependencies = (service: ServiceOption) => {
    const requiredServices = service.dependsOn.map(dep => 
      services.find(s => s.id === dep)?.name
    ).filter(Boolean);

    const recommendedServices = service.recommendedDependencies?.map(dep =>
      services.find(s => s.id === dep)?.name
    ).filter(Boolean);

    if (!requiredServices.length && !recommendedServices?.length) return null;

    return (
      <div className={styles.dependencies}>
        {requiredServices.length > 0 && (
          <div>
            <span className={styles.required}>Required: </span>
            {requiredServices.join(', ')}
          </div>
        )}
        {recommendedServices?.length && (
          <div>
            <span className={styles.recommended}>Recommended: </span>
            {recommendedServices.join(', ')}
          </div>
        )}
      </div>
    );
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
          Back to Data Sources
        </button>
        
        <div className={styles.logo}>
          TBWA<span>\</span>INTELLIGENCE
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.configWrapper}>
          <div className={styles.serviceHeader}>
            <h1 className={styles.pageTitle}>
              <span className={styles.backslash}>\</span>RivalIQ Configuration
            </h1>
          </div>
          
          <p className={styles.pageSubtitle}>
            Configure your RivalIQ data processing pipeline by selecting the services you need and uploading your dataset.
          </p>

          <div className={styles.uploadSection}>
            <label 
              className={`${styles.fileInput} ${isDragging ? styles.dragging : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
              <div className={styles.uploadBox}>
                {file ? (
                  <>
                    <div className={styles.fileName}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                      <span>{file.name}</span>
                    </div>
                    <p className={styles.uploadSubtext}>Click or drag & drop to change file</p>
                  </>
                ) : (
                  <>
                    <svg
                      className={styles.uploadIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className={styles.uploadText}>
                      Drag & drop your file here or click to browse
                    </p>
                    <p className={styles.uploadSubtext}>
                      Supported formats: CSV, Excel (.xlsx, .xls)
                    </p>
                  </>
                )}
              </div>
            </label>
            {error && (
              <div className={styles.error}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}
          </div>

          <div className={styles.servicesContainer}>
            <div className={styles.tabsContainer}>
              <button 
                className={`${styles.tab} ${activeTab === 'pipeline' ? styles.active : ''}`}
                onClick={() => setActiveTab('pipeline')}
              >
                Pipeline Services
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'independent' ? styles.active : ''}`}
                onClick={() => setActiveTab('independent')}
              >
                Independent Services
              </button>
            </div>

            <div className={`${styles.tabContent} ${activeTab === 'pipeline' ? styles.active : ''}`}>
              <div className={styles.pipelineGrid}>
                {services
                  .filter(service => !service.isIndependent)
                  .map((service, index) => (
                    <div key={service.id} className={styles.pipelineStep}>
                      <div className={styles.stepIndicator} />
                      <div
                        className={`${styles.serviceCard} ${
                          selectedServices.includes(service.id) ? styles.selected : ''
                        } ${isServiceDisabled(service) ? styles.disabled : ''} ${
                          service.recommendedDependencies?.some(dep => !selectedServices.includes(dep))
                            ? styles.recommended
                            : ''
                        }`}
                        onClick={() => !isServiceDisabled(service) && handleServiceToggle(service.id)}
                      >
                        <div className={styles.serviceContent}>
                          <h3 className={styles.serviceName}>{service.name}</h3>
                          <p className={styles.serviceDescription}>{service.description}</p>
                          {renderDependencies(service)}
                        </div>
                        <div className={styles.checkbox}>
                          {selectedServices.includes(service.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className={`${styles.tabContent} ${activeTab === 'independent' ? styles.active : ''}`}>
              <div className={styles.servicesGrid}>
                {services
                  .filter(service => service.isIndependent)
                  .map((service) => (
                    <div
                      key={service.id}
                      className={`${styles.serviceCard} ${
                        selectedServices.includes(service.id) ? styles.selected : ''
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className={styles.serviceContent}>
                        <h3 className={styles.serviceName}>{service.name}</h3>
                        <p className={styles.serviceDescription}>{service.description}</p>
                      </div>
                      <div className={styles.checkbox}>
                        {selectedServices.includes(service.id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={!file || selectedServices.length === 0}
          >
            Start Processing
          </button>
        </div>
      </main>
    </div>
  );
};

export default RivalIQConfig; 