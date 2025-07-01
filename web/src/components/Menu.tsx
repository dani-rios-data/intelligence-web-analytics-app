import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Brain,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';

interface MenuOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
}

const menuOptions: MenuOption[] = [
  {
    id: 'dashboard',
    title: 'Intelligence Dashboard',
    description: 'View real-time analytics, performance metrics and comprehensive data insights',
    icon: <BarChart3 className="w-12 h-12" />,
    route: '/dashboard',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'services',
    title: 'Intelligence Services',
    description: 'Access our comprehensive suite of AI-powered analytics and intelligence tools',
    icon: <Brain className="w-12 h-12" />,
    route: '/services',
    color: 'from-green-500 to-green-600'
  }
];

export default function Menu() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleMenuClick = (route: string) => {
    navigate(route);
  };

  const breadcrumbs = [
    { label: 'Home', isActive: true }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Header */}
      <Header breadcrumbs={breadcrumbs} />

      {/* Main Content */}
      <main className={`pt-16 transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome to <span className="text-yellow-400">TBWA</span> Intelligence
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your gateway to data-driven insights and intelligent decision making.
              <br />
              <span className="text-yellow-400 font-semibold">Are you ready to disrupt?</span>
            </p>
          </div>

          {/* Menu Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {menuOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleMenuClick(option.route)}
                className={`group relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-yellow-400 hover:bg-gray-750'
                    : 'bg-white border-gray-200 hover:border-yellow-400 hover:shadow-xl shadow-lg'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-yellow-400 bg-opacity-10 rounded-xl text-yellow-500 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                      {option.icon}
                    </div>
                    <ArrowRight className={`w-6 h-6 transition-all duration-300 transform group-hover:translate-x-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    } group-hover:text-yellow-400`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  } group-hover:text-yellow-400`}>
                    {option.title}
                  </h3>

                  <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </main>
    </div>
  );
} 