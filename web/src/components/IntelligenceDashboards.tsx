import React, { useState } from 'react';
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
  },
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
  }
];

export default function IntelligenceDashboards() {
  const [showCustomProjects, setShowCustomProjects] = useState(false);
  
  const breadcrumbs = [
    { label: 'Home', path: '/menu' },
    { label: 'Intelligence Dashboards', isActive: true }
  ];

  const handleProjectClick = (url: string) => {
    console.log('Opening URL:', url); // Para debug
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomDashboardClick = () => {
    setShowCustomProjects(!showCustomProjects);
  };

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

            {/* Dashboard Types Overview - Nuevo Diseño */}
            <div className="grid lg:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
              {/* Custom Dashboards - Rediseñado */}
              <div 
                onClick={handleCustomDashboardClick}
                className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 hover:border-teal-400/50 p-6 cursor-pointer transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 overflow-hidden"
              >
                {/* Fondo decorativo animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  {/* Header con icono destacado */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-teal-400/25">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                      </div>
                      <div>
                        <h2 className="text-xl font-grotesk-black text-white group-hover:text-teal-300 transition-colors duration-300">
                          Custom Dashboards
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
                          <span className="text-teal-400 font-medium text-xs tracking-wide">100% CUSTOM BUILT</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-teal-400 group-hover:scale-110 group-hover:rotate-180 transition-all duration-500">
                      {showCustomProjects ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Descripción mejorada */}
                  <p className="text-gray-300 leading-relaxed mb-5 text-sm group-hover:text-gray-200 transition-colors duration-300">
                    Fully customized dashboards designed specifically for unique projects. 
                    Each solution is tailored for specific client needs and business objectives.
                  </p>

                  {/* Footer con estado y acción */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-400/20">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                        <span className="text-teal-300 font-medium text-xs">Available Now</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-teal-400 transition-colors duration-300 font-medium">
                      Click to explore →
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Dashboards - Rediseñado */}
              <div className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 hover:border-purple-400/50 p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
                {/* Fondo decorativo animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  {/* Header con icono destacado */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-purple-400/25">
                          <Settings className="w-6 h-6 text-white" style={{ animation: 'spin 4s linear infinite' }} />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                      </div>
                      <div>
                        <h2 className="text-xl font-grotesk-black text-white group-hover:text-purple-300 transition-colors duration-300">
                          Platform Dashboards
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                          <span className="text-purple-400 font-medium text-xs tracking-wide">CSV DATA INTEGRATION</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Descripción mejorada */}
                  <p className="text-gray-300 leading-relaxed mb-5 text-sm group-hover:text-gray-200 transition-colors duration-300">
                    Automated dashboards that read CSV data from platforms TBWA pays for. 
                    These replace manual reports with automatically updated insights.
                  </p>

                  {/* Footer con estado de construcción mejorado */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-400/20">
                        <div className="relative">
                          <Clock className="w-3.5 h-3.5 text-orange-400" />
                          <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-30"></div>
                        </div>
                        <span className="text-orange-300 font-medium text-xs">Under Construction</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-purple-400 transition-colors duration-300 font-medium">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Custom Projects Section - Full Width */}
        {showCustomProjects && (
          <div className="w-full bg-white py-10 animate-fade-in-up">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-lg font-grotesk-bold text-gray-900 mb-2">Available Custom Projects</h2>
              <p className="text-gray-600 mb-5 text-sm">Explore our personalized dashboards in production</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {customProjects.map((project, index) => {
                  const IconComponent = project.icon;
                  return (
                    <div
                      key={project.id}
                      className={`project-card ${project.type} bg-white rounded-xl border border-gray-200 p-4 cursor-pointer shadow-lg min-h-[200px] flex flex-col relative transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]`}
                      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                    >
                      {/* Project Header with Icon and Title */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className={`project-icon w-8 h-8 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h3 className="project-title text-base font-grotesk-bold text-gray-900 leading-tight">
                          {project.name}
                        </h3>
                      </div>

                      {/* Project Description - Flexible height */}
                      <p className="project-description text-gray-600 text-xs leading-relaxed flex-grow mb-3">
                        {project.description}
                      </p>

                      {/* Action Button - Always at bottom */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleProjectClick(project.url);
                        }}
                        className="project-btn w-full text-white font-semibold px-3 py-2 rounded-lg text-xs mt-auto bg-gradient-to-r hover:shadow-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
                        style={{ background: `linear-gradient(135deg, ${project.color.split(' ')[1]}, ${project.color.split(' ')[3]})` }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Dashboard</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Contact Analytics Team Section */}
              <div className="mt-10 bg-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="text-center mb-4">
                  <h3 className="text-base font-grotesk-bold text-gray-900 mb-1">Need a Special Project Dashboard?</h3>
                  <p className="text-gray-600 text-xs max-w-2xl mx-auto">
                    Working on a unique client account? Our Data Strategy team can help create tailored insights.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-2.5 max-w-4xl mx-auto">
                  {/* Mehdi Mollahasani */}
                  <div className="bg-white rounded-lg p-2.5 border border-gray-100 hover:shadow-md transition-all duration-300 min-h-[75px] flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                        <img 
                          src="/images/Microsoft_Office_Outlook_(2018–present).svg" 
                          alt="Email" 
                          className="w-2.5 h-2.5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-grotesk-bold text-gray-900 text-xs">Mehdi Mollahasani</h4>
                        <p className="text-xs text-blue-600">Director, Data Strategy</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:mehdi.mollahasani@tbwachiat.com"
                      className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 transition-colors duration-300 mt-auto bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded-md"
                    >
                      <span>mehdi.mollahasani@tbwachiat.com</span>
                      <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>

                  {/* Oscar Perez */}
                  <div className="bg-white rounded-lg p-2.5 border border-gray-100 hover:shadow-md transition-all duration-300 min-h-[75px] flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center">
                        <img 
                          src="/images/Microsoft_Office_Outlook_(2018–present).svg" 
                          alt="Email" 
                          className="w-2.5 h-2.5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-grotesk-bold text-gray-900 text-xs">Oscar Perez</h4>
                        <p className="text-xs text-purple-600">Senior Data Strategist</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:oscar.perez@tbwachiat.com"
                      className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-purple-600 transition-colors duration-300 mt-auto bg-purple-50 hover:bg-purple-100 px-1.5 py-0.5 rounded-md"
                    >
                      <span>oscar.perez@tbwachiat.com</span>
                      <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>

                  {/* Daniela Rios */}
                  <div className="bg-white rounded-lg p-2.5 border border-gray-100 hover:shadow-md transition-all duration-300 min-h-[75px] flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-5 h-5 bg-teal-100 rounded-md flex items-center justify-center">
                        <img 
                          src="/images/Microsoft_Office_Outlook_(2018–present).svg" 
                          alt="Email" 
                          className="w-2.5 h-2.5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-grotesk-bold text-gray-900 text-xs">Daniela Rios</h4>
                        <p className="text-xs text-teal-600">Senior Data Analyst</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:daniela.rios@tbwachiat.com"
                      className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-teal-600 transition-colors duration-300 mt-auto bg-teal-50 hover:bg-teal-100 px-1.5 py-0.5 rounded-md"
                    >
                      <span>daniela.rios@tbwachiat.com</span>
                      <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>

                {/* Teams Alternative */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-xs text-gray-600">
                    <img 
                      src="/images/Microsoft_Office_Teams_(2018–present).svg" 
                      alt="Teams" 
                      className="w-4 h-4"
                    />
                    <span>Or reach us via <span className="font-medium text-purple-600">Microsoft Teams</span> - TBWA Analytics Team</span>
                  </div>
                </div>
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