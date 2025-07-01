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
  bgColor: string;
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
    color: 'from-purple-600 to-purple-800',
    bgColor: 'bg-purple-50 border-purple-200',
    tag: 'Chatbot & Virtual Assistant'
  },
  {
    id: 'gwi-travel',
    name: 'GWI Travel',
    description: 'Specialized travel and tourism intelligence virtual assistant',
    category: 'Travel Intelligence',
    status: 'coming-soon',
    icon: Bot,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    tag: 'Chatbot & Virtual Assistant'
  },
  {
    id: 'gwi-usa',
    name: 'GWI USA',
    description: 'US-focused market intelligence and consumer behavior chatbot',
    category: 'US Market Intelligence',
    status: 'coming-soon',
    icon: Bot,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
    tag: 'Chatbot & Virtual Assistant'
  },
  {
    id: 'ad-investment',
    name: 'Ad Investment',
    description: 'Track and analyze advertising investment data across channels and campaigns',
    category: 'Investment Analytics',
    status: 'coming-soon',
    icon: TrendingUp,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50 border-green-200',
    tag: 'Analytics Platform'
  },
  {
    id: 'audience-analyzer',
    name: 'Audience Analyzer',
    description: 'Deep dive into audience insights and demographic analysis',
    category: 'Audience Intelligence',
    status: 'coming-soon',
    icon: Users,
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50 border-orange-200',
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
    <div className="min-h-screen flex flex-col">
      {/* Header Negro */}
      <div style={{ backgroundColor: '#121212' }}>
        <Header breadcrumbs={breadcrumbs} />
      </div>
      
      {/* Main Content Blanco */}
      <div className="flex-grow bg-white">
        <main className="px-8 py-12 pt-20">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-grotesk-black text-gray-900 mb-6">
                Intelligence{' '}
                <span className="text-yellow-400 mx-2 font-grotesk-black">\</span>
                Services
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                    className={`${service.bgColor} rounded-2xl border-2 p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group ${
                      service.url ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-grotesk-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                            {service.name}
                          </h2>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              service.tag === 'Chatbot & Virtual Assistant' 
                                ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                                : 'bg-blue-100 text-blue-700 border border-blue-200'
                            }`}>
                              {service.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {service.status === 'active' ? (
                          <span className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Active
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                            Coming Soon
                          </span>
                        )}
                        {service.url && (
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6 text-base group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-gray-500 text-sm font-medium">
                        {service.category}
                      </div>
                      {service.url && (
                        <button className="px-6 py-3 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                          Open Application
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info Section */}
            <div className="mt-16 text-center">
              <div className="bg-gray-50 rounded-2xl border-2 border-gray-100 p-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-grotesk-bold text-gray-900 mb-4">
                  More Services Coming Soon
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  We're continuously expanding our intelligence services portfolio. 
                  Stay tuned for more AI-powered solutions and analytics platforms.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Negro */}
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