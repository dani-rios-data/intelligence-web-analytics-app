import React, { useState, useEffect } from 'react';
import { ExternalLink, BarChart3, Settings, Clock, CheckCircle, ChevronDown, ChevronUp, TrendingUp, MapPin, Building, CreditCard, Banknote } from 'lucide-react';
import Header from './Header';
import '../styles/project-animations.css';

interface CustomProject {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  status: 'active' | 'demo';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  type: 'analytics' | 'tourism' | 'hospitality' | 'banking' | 'finance';
}

const customProjects: CustomProject[] = [
  {
    id: 'audience',
    name: 'Audience Analytics',
    description: 'Advanced audience segmentation and behavioral analysis dashboard',
    url: 'https://dani-rios-data.github.io/audience/',
    category: 'Marketing Analytics',
    status: 'active',
    icon: TrendingUp,
    color: 'from-purple-500 to-indigo-600',
    type: 'analytics'
  },
  {
    id: 'qatar-tourism',
    name: 'Qatar Tourism Dashboard',
    description: 'Tourism performance metrics and visitor insights for Qatar',
    url: 'https://qatar-tourism.vercel.app/',
    category: 'Tourism & Hospitality',
    status: 'active',
    icon: MapPin,
    color: 'from-emerald-500 to-teal-600',
    type: 'tourism'
  },
  {
    id: 'hilton',
    name: 'Hilton Analytics Suite',
    description: 'Comprehensive hospitality performance and guest experience analytics',
    url: 'https://hilton-all.vercel.app/',
    category: 'Hospitality',
    status: 'active',
    icon: Building,
    color: 'from-blue-500 to-cyan-600',
    type: 'hospitality'
  },
  {
    id: 'banks',
    name: 'Banking Intelligence',
    description: 'Financial services performance tracking and customer insights',
    url: 'https://banks-two.vercel.app/',
    category: 'Financial Services',
    status: 'active',
    icon: Banknote,
    color: 'from-green-500 to-emerald-600',
    type: 'banking'
  },
  {
    id: 'capital-one',
    name: 'Capital One Analytics',
    description: 'Credit card and financial product performance dashboard',
    url: 'https://capital-one-nine.vercel.app/',
    category: 'Fintech',
    status: 'demo',
    icon: CreditCard,
    color: 'from-orange-500 to-red-600',
    type: 'finance'
  }
];

export default function IntelligenceDashboards() {
  const [showCustomProjects, setShowCustomProjects] = useState(false);
  
  const breadcrumbs = [
    { label: 'Home', path: '/menu' },
    { label: 'Intelligence Dashboards', isActive: true }
  ];

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomDashboardClick = () => {
    setShowCustomProjects(!showCustomProjects);
  };

  // Add micro-interactions for enhanced animations
  useEffect(() => {
    if (showCustomProjects) {
      const cards = document.querySelectorAll('.project-card') as NodeListOf<HTMLElement>;
      const buttons = document.querySelectorAll('.project-btn') as NodeListOf<HTMLElement>;
      
      // Enhanced hover effects for cards
      cards.forEach(card => {
        const handleMouseEnter = () => {
          card.style.transform = 'translateY(-12px) scale(1.02)';
        };
        
        const handleMouseLeave = () => {
          card.style.transform = 'translateY(0) scale(1)';
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

      // Click animation for buttons
      buttons.forEach(btn => {
        const handleClick = (e: Event) => {
          e.stopPropagation();
          btn.style.transform = 'scale(0.95)';
          setTimeout(() => {
            btn.style.transform = 'scale(1)';
          }, 150);
        };

        btn.addEventListener('click', handleClick);

        return () => {
          btn.removeEventListener('click', handleClick);
        };
      });
    }
  }, [showCustomProjects]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: '#121212' }}>
      <Header breadcrumbs={breadcrumbs} />
      
      {/* Main Content Container */}
      <div className="flex-grow">
        {/* Main Content */}
        <main className="px-8 py-12 pt-20">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-grotesk-black text-white mb-4">
                Intelligence{' '}
                <span className="text-yellow-400 mx-2 font-grotesk-black">\</span>
                Dashboards
              </h1>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Empower your decision-making with our personalized analytics solutions
              </p>
            </div>

            {/* Dashboard Types Overview */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
              {/* Custom Dashboards */}
              <div 
                onClick={handleCustomDashboardClick}
                className="bg-gradient-to-br from-teal-500/10 to-cyan-400/5 rounded-xl border border-gray-700 hover:border-teal-500/50 p-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-grotesk-bold text-white group-hover:text-teal-400 transition-colors duration-300">Custom Dashboards</h2>
                      <p className="text-teal-400 font-medium text-sm">100% Custom Built</p>
                    </div>
                  </div>
                  <div className="text-teal-400 group-hover:scale-110 transition-transform duration-300">
                    {showCustomProjects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-3 text-sm group-hover:text-gray-200 transition-colors duration-300">
                  Fully customized dashboards designed specifically for unique projects. 
                  Each solution is tailored for specific client needs and business objectives.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-400">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs font-medium">Available Now</span>
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-teal-400 transition-colors duration-300">
                    Click to view library
                  </span>
                </div>
              </div>

              {/* CSV Platform Dashboards */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-grotesk-bold text-white">Platform Dashboards</h2>
                    <p className="text-blue-400 font-medium text-sm">CSV Data Integration</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-3 text-sm">
                  Automated dashboards that read CSV data from platforms TBWA pays for. 
                  These replace manual reports with automatically updated insights.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Clock className="w-3 h-3 text-orange-400 animate-pulse" />
                      <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <span className="text-xs font-bold text-orange-400 animate-pulse">Under Construction</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Custom Projects Section - Full Width */}
        {showCustomProjects && (
          <div className="w-full bg-white py-12 animate-fade-in-up">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-2xl font-grotesk-bold text-gray-900 mb-2">Available Custom Projects</h2>
              <p className="text-gray-600 mb-6">Explore our personalized dashboards in production</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {customProjects.map((project, index) => {
                  const IconComponent = project.icon;
                  return (
                    <div
                      key={project.id}
                      onClick={() => handleProjectClick(project.url)}
                      className={`project-card ${project.type} bg-white rounded-2xl border border-gray-200 p-8 cursor-pointer shadow-lg`}
                      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                    >
                      {/* External Link Icon */}
                      <ExternalLink className="external-link absolute top-6 right-6 w-5 h-5 text-gray-400" />

                      {/* Project Header with Icon and Title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`project-icon w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="project-title text-xl font-grotesk-bold text-gray-900 leading-tight">
                          {project.name}
                        </h3>
                      </div>

                      {/* Project Description */}
                      <p className="project-description text-gray-600 text-sm leading-relaxed mb-8">
                        {project.description}
                      </p>

                      {/* Action Button */}
                      <button className="project-btn w-full text-white font-semibold px-6 py-3 rounded-xl text-sm">
                        View Dashboard
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-black/90 backdrop-blur-md border-t border-gray-800/50 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>© 2025 TBWA Intelligence</span>
            </div>
            <div className="text-yellow-400 text-sm font-medium">
              Disruption
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 