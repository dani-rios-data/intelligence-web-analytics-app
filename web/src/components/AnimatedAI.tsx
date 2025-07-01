import React, { useState, useEffect } from 'react';

interface AnimatedAIProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  onClick?: () => void;
}

export const AnimatedAI: React.FC<AnimatedAIProps> = ({ 
  size = 'md', 
  speed = 'normal',
  className = '',
  onClick 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const animationSpeeds = {
    slow: 2000,
    normal: 1500,
    fast: 1000
  };

  // Alternating animation between the two AI views
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => prev === 0 ? 1 : 0);
    }, animationSpeeds[speed]);

    return () => clearInterval(interval);
  }, [speed]);

  const images = [
    '/brand-assets/animaciones/3D_AI_STILL/3D_AI_STILL/PNG/3D_AI_front_view.png',
    '/brand-assets/animaciones/3D_AI_STILL/3D_AI_STILL/PNG/3D_AI_Half_view.png'
  ];

  return (
    <div 
      className={`${sizeClasses[size]} ${className} relative cursor-pointer transition-transform duration-300 hover:scale-105`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* AI Animation Container */}
      <div className="relative w-full h-full overflow-hidden rounded-full bg-gradient-to-br from-tbwa-yellow/20 to-tbwa-yellow/5 border border-tbwa-yellow/30">
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-2 w-1 h-1 bg-tbwa-yellow rounded-full animate-ping opacity-75" style={{ animationDelay: '0s' }} />
          <div className="absolute top-4 right-3 w-1 h-1 bg-tbwa-yellow rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-tbwa-yellow rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }} />
        </div>

        {/* Main AI Images */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`AI Assistant View ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                currentFrame === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(254, 204, 0, 0.3))',
              }}
            />
          ))}
        </div>

        {/* Pulse ring effect */}
        <div className="absolute inset-0 rounded-full border-2 border-tbwa-yellow/30 animate-pulse" />
        <div 
          className="absolute inset-0 rounded-full border border-tbwa-yellow/20" 
          style={{
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            animationDelay: '0.5s'
          }}
        />
      </div>

      {/* Status indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg">
        <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

interface AIAssistantProps {
  isActive?: boolean;
  message?: string;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  isActive = false, 
  message,
  className = '',
  onClick,
  size = 'lg',
  speed = 'normal'
}) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message && isActive) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, isActive]);

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {/* AI Avatar */}
      <AnimatedAI 
        size={size}
        speed={isActive ? "fast" : speed}
        className={`transition-all duration-300 ${
          isActive ? 'scale-110' : 'scale-100'
        }`}
        onClick={onClick}
      />
      
      {/* Speech bubble */}
      {showMessage && message && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-48">
          <div className="bg-tbwa-black border border-tbwa-yellow/30 rounded-lg p-3 shadow-lg">
            <p className="text-tbwa-white text-sm font-grotesk">
              {message}
            </p>
            {/* Bubble tail */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-8 border-transparent border-t-tbwa-black" />
            </div>
          </div>
        </div>
      )}
      
      {/* Thinking indicator */}
      {isActive && (
        <div className="absolute top-0 right-0 flex space-x-1">
          <div className="w-2 h-2 bg-tbwa-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-tbwa-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-tbwa-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  );
};

export default AnimatedAI; 