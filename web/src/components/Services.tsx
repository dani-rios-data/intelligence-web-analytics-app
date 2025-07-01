import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target, 
  Zap,
  Users,
  Search,
  Database
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  category: 'analytics' | 'intelligence' | 'discovery';
}

const services: ServiceItem[] = [
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    description: 'Advanced sentiment analysis for brand monitoring and customer feedback insights.',
    icon: <Brain className="w-8 h-8" />,
    available: true,
    category: 'analytics'
  },
  {
    id: 'brand-discovery',
    title: 'Brand Discovery',
    description: 'Discover emerging brands and competitive insights across multiple channels.',
    icon: <Search className="w-8 h-8" />,
    available: true,
    category: 'discovery'
  },
  {
    id: 'audience-analytics',
    title: 'Audience Analytics',
    description: 'Deep audience insights and demographic analysis for targeted campaigns.',
    icon: <Users className="w-8 h-8" />,
    available: true,
    category: 'analytics'
  },
  {
    id: 'market-intelligence',
    title: 'Market Intelligence',
    description: 'Real-time market trends and competitive analysis with predictive insights.',
    icon: <TrendingUp className="w-8 h-8" />,
    available: true,
    category: 'intelligence'
  },
  {
    id: 'data-dashboards',
    title: 'Data Dashboards',
    description: 'Interactive dashboards for comprehensive data visualization and reporting.',
    icon: <BarChart3 className="w-8 h-8" />,
    available: true,
    category: 'analytics'
  },
  {
    id: 'ai-recommendations',
    title: 'AI Recommendations',
    description: 'AI-powered strategy recommendations based on data analysis and market trends.',
    icon: <Target className="w-8 h-8" />,
    available: false,
    category: 'intelligence'
  }
];

export default function Services() {
  const { isDarkMode } = useTheme();

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceItem[]>);

  const categoryTitles = {
    analytics: 'Analytics Services',
    intelligence: 'Intelligence Services',
    discovery: 'Discovery Services'
  };

  const categoryIcons = {
    analytics: <BarChart3 className="w-6 h-6" />,
    intelligence: <Brain className="w-6 h-6" />,
    discovery: <Search className="w-6 h-6" />
  };

  const breadcrumbs = [
    { label: 'Home', path: '/menu' },
    { label: 'Services', isActive: true }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Header */}
      <Header breadcrumbs={breadcrumbs} />

      {/* Main Content with top padding for fixed header */}
      <main className={`pt-16 transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome to Intelligence Services
            </h1>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Access our comprehensive suite of AI-powered analytics and intelligence tools
              designed to drive data-driven decision making.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-12">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <section key={category} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-400 bg-opacity-10 rounded-lg text-yellow-500">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </div>
                  <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {categoryTitles[category as keyof typeof categoryTitles]}
                  </h2>
                </div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        service.available
                          ? isDarkMode
                            ? 'bg-gray-800 border-gray-700 hover:border-yellow-400 hover:bg-gray-750 hover:-translate-y-1 cursor-pointer'
                            : 'bg-white border-gray-200 hover:border-yellow-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer shadow-sm'
                          : isDarkMode
                            ? 'bg-gray-800 bg-opacity-50 border-gray-600 border-opacity-50 cursor-not-allowed'
                            : 'bg-gray-50 border-gray-300 border-opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg ${
                            service.available
                              ? 'bg-yellow-400 bg-opacity-10 text-yellow-500'
                              : isDarkMode
                                ? 'bg-gray-600 bg-opacity-30 text-gray-500'
                                : 'bg-gray-300 bg-opacity-50 text-gray-400'
                          }`}
                        >
                          {service.icon}
                        </div>
                        {service.available ? (
                          <span className="flex items-center gap-1 text-green-500 text-sm font-medium">
                            <Zap className="w-4 h-4" />
                            Available
                          </span>
                        ) : (
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            Coming Soon
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                          service.available
                            ? isDarkMode ? 'text-white' : 'text-gray-900'
                            : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}
                      >
                        {service.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                          service.available
                            ? isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            : isDarkMode ? 'text-gray-600' : 'text-gray-500'
                        }`}
                      >
                        {service.description}
                      </p>

                      {service.available && (
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                          Access Service
                          <Database className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Help Section */}
          <div className={`mt-16 p-8 rounded-xl border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Need Help?
              </h3>
              <p className={`text-lg mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our support team is here to help you get the most out of our intelligence platform.
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 