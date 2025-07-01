import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Brain,
  ArrowUpRight
} from 'lucide-react';
import Header from './Header';
import '../styles/menu-animations.css';

interface MenuOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
  iconColor: string;
}

const menuOptions: MenuOption[] = [
  {
    id: 'dashboard',
    title: 'Intelligence Dashboards',
    description: 'Custom-built dashboards for specific projects and automated insights from platform data',
    icon: <BarChart3 className="w-6 h-6" strokeWidth={2} />,
    route: '/dashboard',
    color: 'from-teal-500 to-cyan-400',
    iconColor: 'text-teal-500'
  },
  {
    id: 'services',
    title: 'Intelligence Services',
    description: 'Access our comprehensive suite of AI-powered analytics and intelligence tools',
    icon: <Brain className="w-6 h-6" strokeWidth={2} />,
    route: '/services',
    color: 'from-blue-500 to-purple-500',
    iconColor: 'text-blue-500'
  }
];

// Decorative SVG Components based on Disruption icons
const DisruptionTriangle = ({ className = "", style = {} }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none">
    <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
  </svg>
);

const DisruptionLines = ({ className = "", style = {} }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none">
    <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    <line x1="40" y1="30" x2="40" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <line x1="60" y1="15" x2="60" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    <line x1="80" y1="25" x2="80" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </svg>
);

const DisruptionSquare = ({ className = "", style = {} }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none">
    <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25"/>
    <rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15"/>
  </svg>
);

export default function Menu() {
  const navigate = useNavigate();

  const handleMenuClick = (route: string) => {
    navigate(route);
  };

  const breadcrumbs = [
    { label: 'Home', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-900 transition-colors duration-300" 
    style={{ backgroundColor: '#121212' }}>
      {/* Header */}
      <Header breadcrumbs={breadcrumbs} />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Abstract background pattern */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/5"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-400/5"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-teal-500/3"></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-blue-500/3"></div>
        </div>
        
        {/* Disruption Elements Decoration */}
        <DisruptionTriangle 
          className="absolute top-20 right-20 w-12 h-12 text-yellow-400 animate-pulse-slow" 
          style={{ animationDelay: '2s' }}
        />
        <DisruptionLines 
          className="absolute bottom-32 left-16 w-16 h-16 text-teal-400 animate-float-slow" 
        />
        <DisruptionSquare 
          className="absolute top-1/3 left-20 w-10 h-10 text-blue-400 animate-pulse-slow" 
          style={{ animationDelay: '4s' }}
        />
        <DisruptionTriangle 
          className="absolute bottom-20 right-32 w-8 h-8 text-purple-400 animate-float-slow" 
          style={{ animationDelay: '1s' }}
        />
        
        {/* Gradient overlay for smooth blending */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(90deg, #121212 0%, #121212 30%, transparent 50%, transparent 70%, #121212 100%)'
          }}
        ></div>
      </div>

      {/* Main Content - Hero Section */}
      <main className="min-h-screen flex flex-col justify-center items-center px-8 pt-16 pb-8 relative z-20">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          {/* Hero Title */}
          <h1 className="text-3xl md:text-5xl font-grotesk-black leading-tight mb-4 tracking-tight animate-fade-in-up text-white">
            Welcome to{' '}
            <span className="text-yellow-400 mx-3 font-grotesk-black text-4xl md:text-6xl">\</span>
            TBWA Intelligence
          </h1>
          
          <p className="text-base md:text-lg max-w-3xl mx-auto mb-3 font-light animate-fade-in-up-delay-200 text-gray-400" 
             style={{ color: '#A0A0A0' }}>
            Your gateway to data-driven insights and intelligent decision making.
          </p>
          
          <p className="text-lg md:text-xl text-yellow-400 font-grotesk-bold mb-8 uppercase tracking-wide animate-fade-in-up-delay-400 animate-float">
            Are you ready to disrupt?
          </p>

          {/* Cards Container */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
            {menuOptions.map((option, index) => (
              <div
                key={option.id}
                onClick={() => handleMenuClick(option.route)}
                className="group relative overflow-hidden rounded-xl border border-gray-600 hover:border-transparent cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-card card-hover-effects min-h-[200px]"
                style={{
                  backgroundColor: '#1E1E1E',
                  borderColor: '#3A3A3A',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
                  animationDelay: `${0.6 + index * 0.2}s`
                }}
              >
                {/* Animated top gradient bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${option.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 shimmer-effect`}></div>
                
                {/* Decorative Elements - Replace particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {/* Subtle geometric decorations */}
                  <DisruptionLines 
                    className="absolute top-4 right-4 w-8 h-8 text-yellow-400" 
                    style={{ opacity: 0.3 }}
                  />
                  <DisruptionSquare 
                    className="absolute bottom-4 left-4 w-6 h-6 text-teal-400" 
                    style={{ opacity: 0.2 }}
                  />
                </div>

                {/* Enhanced glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(252, 204, 0, 0.1) 0%, transparent 70%)'
                  }}
                ></div>

                {/* Subtle pattern overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <DisruptionTriangle className="w-full h-full text-yellow-400" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-8">
                  {/* Icon and Title Section - Side by side */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} opacity-10 absolute inset-0 group-hover:opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}></div>
                        <div className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-xl ${option.iconColor} group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 icon-glow`}>
                          {option.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold transition-colors duration-500 group-hover:text-yellow-400 text-white" 
                          style={{ letterSpacing: '-0.5px' }}>
                        {option.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:text-yellow-400 opacity-50 group-hover:opacity-100 text-gray-400" 
                                  style={{ color: '#A0A0A0' }} />
                  </div>

                  <p className="text-sm leading-relaxed transition-colors duration-500 text-gray-400" 
                     style={{ 
                       color: '#A0A0A0',
                       lineHeight: '1.6'
                     }}>
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