import React, { useCallback } from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ServiceSection from './ServiceSection';
import QuickGuide from './QuickGuide';
import Footer from '@/components/Footer';
import styles from '../../styles/ServiceGuide.module.sass';

// Definir tipos para los servicios
interface ServiceFeature {
  id: string;
  text: string;
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: ServiceFeature[];
}

// Definir tipos para los criterios de decisión
interface DecisionCriteria {
  id: string;
  text: string;
}

interface DecisionGuideItem {
  service: string;
  criteria: DecisionCriteria[];
}

const ServiceGuide: React.FC = () => {
  const router = useRouter();
  
  // Datos de servicios
  const services: ServiceData[] = [
    {
      id: 'custom-platform',
      title: 'Custom Platform Services',
      description: 'Specialized solutions for organizations with unique data requirements and platform-specific needs.',
      icon: 'database',
      features: [
        { id: 'cp1', text: 'Platform-specific data processing and analytics' },
        { id: 'cp2', text: 'Custom data format handling and transformation' },
        { id: 'cp3', text: 'Specialized metrics and KPI tracking' },
        { id: 'cp4', text: 'Multi-platform data integration capabilities' }
      ]
    },
    {
      id: 'intelligence',
      title: 'Intelligence Services',
      description: 'Standardized analytics solutions for common marketing platforms and general performance tracking.',
      icon: 'bar-chart',
      features: [
        { id: 'is1', text: 'Social media analytics and insights' },
        { id: 'is2', text: 'Content performance tracking' },
        { id: 'is3', text: 'Creative effectiveness analysis' },
        { id: 'is4', text: 'Standard marketing data processing' }
      ]
    }
  ];

  // Datos de guía de decisión
  const decisionGuide: DecisionGuideItem[] = [
    {
      service: 'Custom Platform Services',
      criteria: [
        { id: 'dc1', text: 'Specific platform integration' },
        { id: 'dc2', text: 'Custom data formats' },
        { id: 'dc3', text: 'Specialized metrics' },
        { id: 'dc4', text: 'Unique processing requirements' }
      ]
    },
    {
      service: 'Intelligence Services',
      criteria: [
        { id: 'dc5', text: 'Standard platform analytics' },
        { id: 'dc6', text: 'Common format processing' },
        { id: 'dc7', text: 'General marketing insights' },
        { id: 'dc8', text: 'Quick implementation' }
      ]
    }
  ];

  // Método para manejar el cierre o sign out
  const handleSignOut = useCallback(() => {
    // Primero intentar usar history para ir hacia atrás
    if (window.history && window.history.length > 1) {
      router.back();
      return;
    }
    
    // Si no hay historial, redirigimos a la página principal
    router.push('/');
  }, [router]);

  return (
    <div className={styles.guideContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span>TBWA</span>
            <span className={styles.accent}>\</span>
            <span>INTELLIGENCE</span>
          </div>
        </div>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          <span>Sign Out</span>
          <LogOut size={16} />
        </button>
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>Service Selection Guide</h1>

        {services.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}

        <QuickGuide decisionGuide={decisionGuide} />
      </div>

      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};

export default ServiceGuide; 