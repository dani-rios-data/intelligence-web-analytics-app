import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut,
  Menu as MenuIcon,
  X,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { logout } from '../utils/auth';

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export default function Header({ breadcrumbs = [] }: HeaderProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 hover:bg-gray-600/20 rounded-lg transition-all duration-300 group"
              title="Volver"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </button>
            
            {/* Home Icon */}
            <button
              onClick={() => navigate('/menu')}
              className="p-1.5 hover:bg-yellow-400/20 rounded-lg transition-all duration-300 group"
              title="Ir a Home"
            >
              <svg 
                className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors duration-300" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </button>
            
            <div className="flex items-center gap-4 ml-2">
            
            <img 
              src="/images/logo_tbwa_white.svg" 
              alt="TBWA Intelligence"
              className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Intelligence Platform Text */}
            <span className="text-gray-400 text-sm font-medium ml-2">
              Intelligence Platform
            </span>
            
            {/* Breadcrumb */}
            {breadcrumbs.length > 0 && (
              <div className="hidden md:flex items-center gap-1.5 text-xs ml-4">
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <ChevronRight className="w-3 h-3 text-gray-500" />}
                    {item.path ? (
                      <button
                        onClick={() => navigate(item.path!)}
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium px-2 py-1 rounded hover:bg-yellow-400/10"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <span className={`font-medium px-2 py-1 rounded ${item.isActive ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-400'}`}>
                        {item.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 text-white text-xs font-medium shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 py-3 backdrop-blur-sm">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600/10 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
              
              <button
                onClick={() => navigate('/menu')}
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                Home
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-300 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 