/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['TBWAGrotesk-Regular', 'TBWAGrotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'grotesk': ['TBWAGrotesk-Regular', 'TBWAGrotesk'],
        'grotesk-bold': ['TBWAGrotesk-Bold'],
        'grotesk-medium': ['TBWAGrotesk-Medium'],
        'grotesk-light': ['TBWAGrotesk-Light'],
        'grotesk-black': ['TBWAGrotesk-Black'],
        'grotesk-backslash': ['TBWAGrotesk-BackslashRegular'],
      },
      colors: {
        // TBWA Official Colors
        'tbwa-yellow': '#FECC00',     // Yellow TBWA Official
        'tbwa-gray': '#53565A',       // Cool Gray Official  
        'tbwa-black': '#000000',      // Black Official
        'tbwa-white': '#FFFFFF',      // White Official
        
        // Aliases for convenience
        primary: '#FECC00',           // Use TBWA Yellow as primary
        yellow: '#FECC00',            // TBWA Official Yellow
        'accent-blue': '#3B82F6',     // Keep for compatibility
        'primary-color': '#FECC00',   // Updated to official yellow
        
        // Monocromáticos
        black: '#000000',
        white: '#FFFFFF',
        
        // Tema oscuro - Exact colors from example
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-border': '#2A2A2A',
        'dark-text-secondary': '#A0A0A0',
        'dark-medium': '#0C1220',
        'dark-light': '#0F1729',
        'card-bg': '#1e1e1e',
        
        // Light theme colors
        'light-bg': '#FFFFFF',
        'light-surface': '#FAFAFA',
        'light-text': '#1A1A1A',
        'light-text-secondary': '#6B7280',
        'light-border': '#E5E7EB',
        
        // Accent colors from example
        'accent-teal': '#00D4AA',
        'accent-blue': '#0084FF',
        'accent-aqua': '#00C9FF',
        'accent-green': '#00E676',
        'accent-purple': '#7C4DFF',
        
        // Textos
        'text-light': '#ffffff',
        'text-secondary': '#b0b0b0',
        
        // Estados
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        
        // Grises exactos
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        
        // Amarillos adicionales
        'yellow-300': '#fcd34d',
        'yellow-400': '#facc15',
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
        '7xl': '4.5rem',     // 72px
        '8xl': '6rem',       // 96px
        '9xl': '8rem',       // 128px
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'bold': '700',
        'black': '900',
      },
      spacing: {
        'xs': '0.25rem',     // 4px
        'sm': '0.5rem',      // 8px
        'md': '1rem',        // 16px
        'lg': '1.5rem',      // 24px
        'xl': '2rem',        // 32px
      },
      borderRadius: {
        'DEFAULT': '8px',
        'lg': '20px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'outline': '0 0 0 3px rgba(59, 130, 246, 0.5)',
      },
      transitionDuration: {
        'DEFAULT': '300ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'ease',
      }
    },
  },
  plugins: [],
} 