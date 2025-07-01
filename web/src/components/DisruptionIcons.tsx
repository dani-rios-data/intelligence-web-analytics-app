import React from 'react';

interface DisruptionIconProps {
  type: 'convention' | 'disruption' | 'vision';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DisruptionIcon: React.FC<DisruptionIconProps> = ({ 
  type, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const baseClasses = `${sizeClasses[size]} ${className}`;

  switch (type) {
    case 'convention':
      return (
        <div className={`${baseClasses} border-2 border-tbwa-white bg-transparent`} 
             title="The Convention - Status quo of the category">
        </div>
      );

    case 'disruption':
      return (
        <div 
          className={`${baseClasses} relative`}
          title="The Disruption - An idea that gets you to the vision"
        >
          <div className="w-full h-full">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon 
                points="50,10 90,90 10,90" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="4"
                className="text-tbwa-white"
              />
              {/* Radiating lines for disruption energy */}
              <g className="text-tbwa-yellow" stroke="currentColor" strokeWidth="2">
                <line x1="50" y1="0" x2="50" y2="15" opacity="0.8" />
                <line x1="75" y1="15" x2="70" y2="25" opacity="0.6" />
                <line x1="90" y1="50" x2="75" y2="50" opacity="0.8" />
                <line x1="75" y1="85" x2="70" y2="75" opacity="0.6" />
                <line x1="25" y1="85" x2="30" y2="75" opacity="0.6" />
                <line x1="10" y1="50" x2="25" y2="50" opacity="0.8" />
                <line x1="25" y1="15" x2="30" y2="25" opacity="0.6" />
              </g>
            </svg>
          </div>
        </div>
      );

    case 'vision':
      return (
        <div 
          className={`${baseClasses} rounded-full border-2 border-tbwa-white bg-transparent`}
          title="The Vision - Where you want to go"
        >
        </div>
      );

    default:
      return null;
  }
};

interface DisruptionRoadmapProps {
  className?: string;
  showLabels?: boolean;
}

export const DisruptionRoadmap: React.FC<DisruptionRoadmapProps> = ({ 
  className = '', 
  showLabels = true 
}) => {
  return (
    <div className={`flex items-center justify-center gap-8 ${className}`}>
      {/* Convention */}
      <div className="flex flex-col items-center gap-2">
        <DisruptionIcon type="convention" size="lg" />
        {showLabels && (
          <div className="text-center">
            <div className="text-tbwa-white font-grotesk-bold text-sm">CONVENTION</div>
            <div className="text-tbwa-gray font-grotesk text-xs mt-1">Status Quo</div>
          </div>
        )}
      </div>

      {/* Arrow */}
      <div className="text-tbwa-yellow">
        <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor">
          <path d="M18 6L6 6M18 6L13 1M18 6L13 11" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {/* Disruption */}
      <div className="flex flex-col items-center gap-2">
        <DisruptionIcon type="disruption" size="lg" />
        {showLabels && (
          <div className="text-center">
            <div className="text-tbwa-white font-grotesk-bold text-sm">DISRUPTION</div>
            <div className="text-tbwa-gray font-grotesk text-xs mt-1">Break Convention</div>
          </div>
        )}
      </div>

      {/* Arrow */}
      <div className="text-tbwa-yellow">
        <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor">
          <path d="M18 6L6 6M18 6L13 1M18 6L13 11" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {/* Vision */}
      <div className="flex flex-col items-center gap-2">
        <DisruptionIcon type="vision" size="lg" />
        {showLabels && (
          <div className="text-center">
            <div className="text-tbwa-white font-grotesk-bold text-sm">VISION</div>
            <div className="text-tbwa-gray font-grotesk text-xs mt-1">Future State</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisruptionIcon; 