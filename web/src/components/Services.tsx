import React from 'react';
import { 
  Users,
  ExternalLink,
  Bot,
  TrendingUp
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
    status: 'active',
    icon: Bot,
    color: 'from-purple-600 to-purple-800',
    bgColor: 'bg-purple-50 border-purple-200',
    tag: 'Chatbot & Virtual Assistant',
    url: 'https://gwi-core-chatbot.vercel.app/'
  },
  {
    id: 'gwi-travel',
    name: 'GWI Travel',
    description: 'Specialized travel and tourism intelligence virtual assistant',
    category: 'Travel Intelligence',
    status: 'active',
    icon: Bot,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    tag: 'Chatbot & Virtual Assistant',
    url: 'https://gwi-travel-chatbot.vercel.app/'
  },
  {
    id: 'gwi-usa',
    name: 'GWI USA',
    description: 'US-focused market intelligence and consumer behavior chatbot',
    category: 'US Market Intelligence',
    status: 'active',
    icon: Bot,
    color: 'from-pink-500 to-pink-700',
    bgColor: 'bg-pink-50 border-pink-200',
    tag: 'Chatbot & Virtual Assistant',
    url: 'https://gwi-usa-chatbot.vercel.app/'
  },
  {
    id: 'ad-investment',
    name: 'Ad Investment',
    description: 'Track and analyze advertising investment data across channels and campaigns',
    category: 'Investment Analytics',
    status: 'active',
    icon: TrendingUp,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50 border-green-200',
    tag: 'Analytics Platform',
    url: 'https://www.tbwaintelligence.com/apps/advertising-investment'
  },
  {
    id: 'audience-analyzer',
    name: 'Audience Analyzer',
    description: 'Deep dive into audience insights and demographic analysis',
    category: 'Audience Intelligence',
    status: 'active',
    icon: Users,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
    tag: 'Analytics Platform',
    url: 'https://www.tbwaintelligence.com/apps/audience-analyzer'
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
        <main className="px-6 py-8 pt-16">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
          <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-grotesk-black text-gray-900 mb-4">
                Intelligence{' '}
                <span className="text-yellow-400 mx-2 font-grotesk-black">\</span>
                Services
            </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Access our comprehensive suite of AI-powered chatbots and analytics platforms
            </p>
          </div>

            {/* Services Grid - 3 columnas más angostas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                    <div
                      key={service.id}
                    onClick={() => handleServiceClick(service.url)}
                    className={`${service.bgColor} rounded-xl border-2 p-4 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg group ${
                      service.url ? 'cursor-pointer' : 'cursor-default'
                    } min-h-[220px] flex flex-col`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Header con icono y título juntos */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-grotesk-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                          {service.name}
                        </h2>
                      </div>
                      </div>

                    {/* Descripción */}
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm group-hover:text-gray-800 transition-colors duration-300 flex-grow">
                        {service.description}
                      </p>

                    {/* Footer con tag de tipo de servicio */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                        service.tag === 'Chatbot & Virtual Assistant' 
                          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {service.tag}
                      </span>
                      {service.url && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceClick(service.url);
                          }}
                          className={`group px-4 py-2 bg-gradient-to-r ${service.color} text-white font-medium text-xs rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 relative overflow-hidden w-full`}
                        >
                          {/* Efecto shine */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          
                          <div className="relative flex items-center justify-center gap-1.5">
                            <ExternalLink className="w-3 h-3" />
                            Open App
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Analytics Team Section - Nuevo Diseño */}
            <div className="mt-12 bg-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-grotesk-bold text-gray-900 mb-2">Have an Idea for a Custom Service?</h3>
                <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                  Need a specialized intelligence service tailored to your unique requirements? Our Data Strategy team can help develop custom solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {/* Mehdi Mollahasani */}
                <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <img 
                        src="/images/Microsoft_Office_Outlook_(2018–present).svg" 
                        alt="Email" 
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-grotesk-bold text-gray-900 text-sm">Mehdi Mollahasani</h4>
                      <p className="text-xs text-blue-600">Director, Data Strategy</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:mehdi.mollahasani@tbwachiat.com"
                    className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 transition-colors duration-300 mt-3"
                  >
                    <span>mehdi.mollahasani@tbwachiat.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Oscar Perez */}
                <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <img 
                        src="/images/Microsoft_Office_Outlook_(2018–present).svg" 
                        alt="Email" 
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-grotesk-bold text-gray-900 text-sm">Oscar Perez</h4>
                      <p className="text-xs text-purple-600">Senior Data Strategist</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:oscar.perez@tbwachiat.com"
                    className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-purple-600 transition-colors duration-300 mt-3"
                  >
                    <span>oscar.perez@tbwachiat.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Daniela Rios */}
                <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <img 
                        src="/images/Microsoft_Office_Outlook_(2018–present).svg" 
                        alt="Email" 
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-grotesk-bold text-gray-900 text-sm">Daniela Rios</h4>
                      <p className="text-xs text-teal-600">Senior Data Analyst</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:daniela.rios@tbwachiat.com"
                    className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-teal-600 transition-colors duration-300 mt-3"
                  >
                    <span>daniela.rios@tbwachiat.com</span>
                    <ExternalLink className="w-3 h-3" />
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