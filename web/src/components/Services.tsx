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
  tag: 'Chatbot & Virtual Assistant' | 'Analytics Platform';
}

const services: ServiceItem[] = [
  {
    id: 'gwi-core',
    name: 'GWI Core',
    description: 'Advanced AI chatbot for global market intelligence and consumer insights',
    category: 'Global Intelligence',
    status: 'coming-soon',
    icon: Bot,
    color: 'from-purple-500 to-indigo-600',
    tag: 'Chatbot & Virtual Assistant'
  },
  {
    id: 'gwi-travel',
    name: 'GWI Travel',
    description: 'Specialized travel and tourism intelligence virtual assistant',
    category: 'Travel Intelligence',
    status: 'coming-soon',
    icon: MapPin,
    color: 'from-emerald-500 to-teal-600',
    tag: 'Chatbot & Virtual Assistant'
  },
  {
    id: 'gwi-usa',
    name: 'GWI USA',
    description: 'US-focused market intelligence and consumer behavior chatbot',
    category: 'US Market Intelligence',
    status: 'coming-soon',
    icon: Globe,
    color: 'from-blue-500 to-cyan-600',
    tag: 'Chatbot & Virtual Assistant'
  },
  {
    id: 'ad-investment',
    name: 'Ad Investment',
    description: 'Track and analyze advertising investment data across channels and campaigns',
    category: 'Investment Analytics',
    status: 'coming-soon',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    tag: 'Analytics Platform'
  },
  {
    id: 'audience-analyzer',
    name: 'Audience Analyzer',
    description: 'Deep dive into audience insights and demographic analysis',
    category: 'Audience Intelligence',
    status: 'coming-soon',
    icon: Users,
    color: 'from-orange-500 to-red-600',
    tag: 'Analytics Platform'
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
                Services
              </h1>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Access our comprehensive suite of AI-powered chatbots and analytics platforms
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service.url)}
                    className={`bg-gradient-to-br ${service.color}/10 to-gray-900/5 rounded-xl border border-gray-700 hover:border-gray-500 p-6 transition-all duration-300 hover:transform hover:scale-105 group ${
                      service.url ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-grotesk-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                            {service.name}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              service.tag === 'Chatbot & Virtual Assistant' 
                                ? 'bg-purple-500/20 text-purple-300' 
                                : 'bg-blue-500/20 text-blue-300'
                            }`}>
                              {service.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {service.status === 'active' ? (
                          <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Active
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-amber-400">
                            Coming Soon
                          </span>
                        )}
                        {service.url && (
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        )}
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4 text-sm group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-gray-500 text-xs">
                        {service.category}
                      </div>
                      {service.url && (
                        <button className="px-4 py-2 bg-yellow-400 text-black font-medium text-sm rounded-lg hover:bg-yellow-300 transition-all duration-200 hover:scale-105">
                          Open Application
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-6 max-w-3xl mx-auto">
                <h3 className="text-xl font-grotesk-bold text-white mb-3">
                  More Services Coming Soon
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We're continuously expanding our intelligence services portfolio. 
                  Stay tuned for more AI-powered solutions and analytics platforms.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="h-12 bg-black/90 backdrop-blur-md border-t border-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>
        <div className="relative h-full flex items-center justify-between px-8 text-white">
          <span className="text-sm font-medium">© 2025 TBWA Intelligence</span>
          <span className="text-sm font-grotesk-bold tracking-wider">DISRUPTION</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </footer>
    </div>
  );
} 