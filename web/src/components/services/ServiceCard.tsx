'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import '@/sass/components/services/_service-card.sass';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  comingSoon?: boolean;
  features?: string[];
}

export default function ServiceCard({ 
  id, 
  title, 
  description, 
  icon, 
  route, 
  comingSoon = false,
  features = []
}: ServiceCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (comingSoon) return;
    router.push(route);
  };

  return (
    <button
      className={`service-card ${comingSoon ? 'coming-soon' : ''}`}
      onClick={handleClick}
      disabled={comingSoon}
    >
      <div className="service-card-content">
        <div className="service-card-icon-wrapper">
          {icon}
          {comingSoon && (
            <span className="service-card-badge">Coming Soon</span>
          )}
        </div>
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>
        
        {features.length > 0 && (
          <ul className="service-card-features">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="service-card-arrow">
        <ArrowRight size={20} />
      </div>
    </button>
  );
} 