import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

  console.log('🌈 [ThemeProvider] Rendering...', {
    isDarkMode,
    timestamp: Date.now()
  });

  // Load theme from localStorage on component mount
  useEffect(() => {
    console.log('🌈 [ThemeProvider] Loading theme from localStorage...');
    
    const savedTheme = localStorage.getItem('tbwa-theme');
    console.log('🌈 [ThemeProvider] Saved theme:', savedTheme);
    
    if (savedTheme === 'dark') {
      console.log('🌈 [ThemeProvider] Setting dark mode to true');
      setIsDarkMode(true);
    } else {
      console.log('🌈 [ThemeProvider] Keeping light mode (default)');
    }
  }, []);

  // Memoize toggleTheme to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    console.log('🌈 [ThemeProvider] Toggle theme called, current mode:', isDarkMode);
    
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('tbwa-theme', newTheme ? 'dark' : 'light');
    
    console.log('🌈 [ThemeProvider] Theme toggled to:', newTheme ? 'dark' : 'light');
  }, [isDarkMode]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    isDarkMode,
    toggleTheme
  }), [isDarkMode, toggleTheme]);

  console.log('🌈 [ThemeProvider] Context value created:', contextValue);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 