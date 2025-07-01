import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut,
  Moon,
  Sun,
  Menu as MenuIcon,
  X,
  ChevronRight
} from 'lucide-react';
import { logout } from '../utils/auth';
import { useTheme } from '../contexts/ThemeContext';

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
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-6">
            {/* Home Icon */}
            <button
              onClick={() => navigate('/menu')}
              className="ml-4 p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300"
              title="Ir a Home"
            >
              <svg 
                className="w-7 h-7 text-white hover:text-yellow-400 transition-colors duration-300" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </button>
            
            <img 
              src="/images/logo_tbwa_white.svg" 
              alt="TBWA Intelligence"
              className="h-8 w-auto"
            />
            
            {/* Breadcrumb */}
            {breadcrumbs.length > 0 && (
              <div className="hidden md:flex items-center gap-2 text-sm ml-4">
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                    {item.path ? (
                      <button
                        onClick={() => navigate(item.path!)}
                        className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <span className={`font-medium ${item.isActive ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {item.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white hover:text-yellow-400 transition-colors duration-300"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 text-white text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-yellow-400 transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/menu')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition-colors duration-300 text-sm font-medium"
              >
                <svg 
                  className="w-5 h-5 text-white" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                Home
              </button>
              
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
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