import React from 'react';
import { ExternalLink, BarChart3, Settings, Clock, CheckCircle } from 'lucide-react';
import Header from './Header';

interface CustomProject {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  status: 'active' | 'demo';
}

const customProjects: CustomProject[] = [
  {
    id: 'audience',
    name: 'Audience Analytics',
    description: 'Advanced audience segmentation and behavioral analysis dashboard',
    url: 'https://dani-rios-data.github.io/audience/',
    category: 'Marketing Analytics',
    status: 'active'
  },
  {
    id: 'qatar-tourism',
    name: 'Qatar Tourism Dashboard',
    description: 'Tourism performance metrics and visitor insights for Qatar',
    url: 'https://qatar-tourism.vercel.app/',
    category: 'Tourism & Hospitality',
    status: 'active'
  },
  {
    id: 'hilton',
    name: 'Hilton Analytics Suite',
    description: 'Comprehensive hospitality performance and guest experience analytics',
    url: 'https://hilton-all.vercel.app/',
    category: 'Hospitality',
    status: 'active'
  },
  {
    id: 'banks',
    name: 'Banking Intelligence',
    description: 'Financial services performance tracking and customer insights',
    url: 'https://banks-two.vercel.app/',
    category: 'Financial Services',
    status: 'active'
  },
  {
    id: 'capital-one',
    name: 'Capital One Analytics',
    description: 'Credit card and financial product performance dashboard',
    url: 'https://capital-one-nine.vercel.app/',
    category: 'Fintech',
    status: 'demo'
  }
];

const csvPlatforms = [
  { name: 'Google Analytics 4', status: 'under_construction' },
  { name: 'Facebook Ads Manager', status: 'under_construction' },
  { name: 'Google Ads', status: 'under_construction' },
  { name: 'LinkedIn Campaign Manager', status: 'under_construction' },
  { name: 'Twitter Ads', status: 'under_construction' },
  { name: 'TikTok Ads Manager', status: 'under_construction' }
];

export default function IntelligenceDashboards() {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Intelligence Dashboards', isActive: true }
  ];

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: '#121212' }}>
      <Header breadcrumbs={breadcrumbs} />
      
      {/* Main Content */}
      <main className="px-8 py-12 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-grotesk-black text-white mb-6">
              Intelligence{' '}
              <span className="text-yellow-400 mx-2 font-grotesk-black">\</span>
              Dashboards
            </h1>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Potencia tu toma de decisiones con nuestras soluciones de analytics personalizadas
            </p>
          </div>

          {/* Dashboard Types Overview */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Custom Dashboards */}
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-400/5 rounded-xl border border-gray-700 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-grotesk-bold text-white">Dashboards Personalizados</h2>
                  <p className="text-teal-400 font-medium">100% Custom Built</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Dashboards completamente personalizados y diseñados específicamente para proyectos únicos. 
                Cada solución está tailored para las necesidades específicas del cliente y sus objetivos de negocio.
              </p>
              <div className="flex items-center gap-2 text-teal-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Disponibles Ahora</span>
              </div>
            </div>

            {/* CSV Platform Dashboards */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-xl border border-gray-700 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-grotesk-bold text-white">Platform Dashboards</h2>
                  <p className="text-blue-400 font-medium">CSV Data Integration</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Dashboards automatizados que leen datos CSV de plataformas que TBWA utiliza. 
                Estos reemplazan reportes manuales con insights actualizados automáticamente.
              </p>
              <div className="flex items-center gap-2 text-orange-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Under Construction</span>
              </div>
            </div>
          </div>

          {/* Custom Projects Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-grotesk-bold text-white mb-2">Proyectos Custom Disponibles</h2>
            <p className="text-gray-400 mb-8">Explora nuestros dashboards personalizados en producción</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.url)}
                  className="group bg-gray-800/50 hover:bg-gray-800/80 rounded-xl border border-gray-700 hover:border-gray-600 p-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-1"
                  style={{
                    backgroundColor: '#1E1E1E',
                    borderColor: '#3A3A3A'
                  }}
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-grotesk-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-1">
                        {project.name}
                      </h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.status === 'active' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 group-hover:rotate-12" />
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Project Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {project.status === 'active' ? 'Producción' : 'Demo'}
                    </span>
                    <div className="text-gray-500 group-hover:text-yellow-400 transition-colors duration-300">
                      <span className="text-xs">Ver Dashboard</span>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>

          {/* CSV Platforms Section */}
          <div>
            <h2 className="text-3xl font-grotesk-bold text-white mb-2">Platform Integrations</h2>
            <p className="text-gray-400 mb-8">Próximas integraciones automáticas con plataformas pagadas</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {csvPlatforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-4 flex items-center justify-between"
                  style={{
                    backgroundColor: '#1A1A1A',
                    borderColor: '#2A2A2A'
                  }}
                >
                  <span className="text-gray-300 font-medium">{platform.name}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-orange-400 font-medium">Próximamente</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 