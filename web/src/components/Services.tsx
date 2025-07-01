import React from 'react';
import { 
  MessageSquare, 
  BarChart3, 
  Users, 
  ExternalLink,
  Bot,
  TrendingUp,
  Globe,
  MapPin
} from 'lucide-react';
import Header from './Header';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  url?: string;
  category: string;
  status: 'active' | 'coming-soon';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  tag: 'AI Assistant' | 'Analytics';
}

const services: ServiceItem[] = [
  {
    id: 'gwi-core',
    name: 'GWI Core',
    description: 'Advanced AI chatbot for global market intelligence and consumer insights',
    category: 'Global Intelligence',
    status: 'coming-soon',
    icon: Bot,
    color: 'from-purple-400/20 to-indigo-400/10',
    tag: 'AI Assistant'
  },
  {
    id: 'gwi-travel',
    name: 'GWI Travel',
    description: 'Specialized travel and tourism intelligence virtual assistant',
    category: 'Travel Intelligence',
    status: 'coming-soon',
    icon: MapPin,
    color: 'from-emerald-400/20 to-teal-400/10',
    tag: 'AI Assistant'
  },
  {
    id: 'gwi-usa',
    name: 'GWI USA',
    description: 'US-focused market intelligence and consumer behavior chatbot',
    category: 'US Market Intelligence',
    status: 'coming-soon',
    icon: Globe,
    color: 'from-blue-400/20 to-cyan-400/10',
    tag: 'AI Assistant'
  },
  {
    id: 'ad-investment',
    name: 'Ad Investment',
    description: 'Track and analyze advertising investment data across channels and campaigns',
    category: 'Investment Analytics',
    status: 'coming-soon',
    icon: TrendingUp,
    color: 'from-green-400/20 to-emerald-400/10',
    tag: 'Analytics'
  },
  {
    id: 'audience-analyzer',
    name: 'Audience Analyzer',
    description: 'Deep dive into audience insights and demographic analysis',
    category: 'Audience Intelligence',
    status: 'coming-soon',
    icon: Users,
    color: 'from-orange-400/20 to-red-400/10',
    tag: 'Analytics'
  }
];

export default function Services() {
  const breadcrumbs = [
    { label: 'Home', path: '/menu' },
    { label: 'Services', isActive: true }
  ];

  const handleServiceClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: '#0a0a0a' }}>
      <Header breadcrumbs={breadcrumbs} />
      
      {/* Main Content Container */}
      <div className="flex-grow">
        {/* Main Content */}
        <main className="px-6 py-16 pt-24">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section - More minimal */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/50 mb-6">
                <span className="text-gray-400 text-sm font-medium">Intelligence Services</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-grotesk-black text-white mb-6 tracking-tight">
                AI-Powered{' '}
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  Solutions
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                Comprehensive suite of intelligent tools for data-driven insights
              </p>
            </div>

            {/* Services Grid - More spacing and minimal design */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service.url)}
                    className={`group relative bg-gradient-to-br ${service.color} backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-gray-700/70 p-8 transition-all duration-500 hover:transform hover:scale-105 ${
                      service.url ? 'cursor-pointer' : 'cursor-default'
                    } hover:shadow-2xl hover:shadow-purple-500/5`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Background subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-800/40 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-700/30">
                            <IconComponent className="w-6 h-6 text-gray-300" />
                          </div>
                          <div>
                            <h3 className="text-xl font-grotesk-bold text-white group-hover:text-gray-100 transition-colors duration-300 mb-1">
                              {service.name}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              service.tag === 'AI Assistant' 
                                ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                                : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                            }`}>
                              {service.tag}
                            </span>
                          </div>
                        </div>
                        
                        {/* Status */}
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-medium text-amber-400/80 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">
                            Coming Soon
                          </span>
                          {service.url && (
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" />
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed mb-6 text-sm font-light group-hover:text-gray-300 transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs font-medium">
                          {service.category}
                        </span>
                        {service.url && (
                          <button className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-medium text-sm rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20">
                            Launch
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA - Minimal */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 max-w-md mx-auto">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <p className="text-gray-400 text-sm font-light">
                  More intelligent solutions in development
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer - Simplified */}
      <footer className="border-t border-gray-800/50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm">
          <span className="text-gray-500 font-light">© 2025 TBWA Intelligence</span>
          <span className="text-gray-400 font-grotesk-bold tracking-wider">DISRUPTION</span>
        </div>
      </footer>
    </div>
  );
} 