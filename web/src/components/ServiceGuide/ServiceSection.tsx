import React from 'react';
import styles from '../../styles/ServiceGuide.module.sass';

interface ServiceFeature {
  id: string;
  text: string;
}

interface ServiceProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: ServiceFeature[];
  };
}

const ServiceSection: React.FC<ServiceProps> = ({ service }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'database':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M8 16h8"/>
            <path d="M8 12h8"/>
            <path d="M8 8h8"/>
          </svg>
        );
      case 'bar-chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20V10"/>
            <path d="M18 20V4"/>
            <path d="M6 20v-4"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className={styles.serviceSection}>
      <div className={styles.serviceHeader}>
        <div className={styles.serviceIcon}>
          {getIcon(service.icon)}
        </div>
        <h2 className={styles.serviceTitle}>{service.title}</h2>
      </div>
      <p className={styles.serviceDescription}>{service.description}</p>
      <ul className={styles.featureList}>
        {service.features.map((feature) => (
          <li key={feature.id} className={styles.featureItem}>
            {feature.text}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServiceSection; 