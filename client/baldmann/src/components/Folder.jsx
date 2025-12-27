import React, { useState } from 'react';
import './Folder.css';

const Folder = ({ 
  name = "Folder", 
  isOpen = false, 
  onClick,
  className = "",
  color = "blue",
  size = "md"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: "w-16 h-12",
    md: "w-20 h-16",
    lg: "w-24 h-20"
  };

  const colorClasses = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500"
  };

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    if (onClick) onClick();
  };

  return (
    <div 
      className={`folder-container flex flex-col items-center cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Folder Icon */}
      <div className="relative folder-icon">
        {/* Folder Body */}
        <div 
          className={`
            ${sizeClasses[size]} 
            ${colorClasses[color]}
            rounded-t-lg 
            shadow-lg
            transition-all duration-300 ease-out
            ${isHovered ? 'scale-110 shadow-xl -translate-y-1' : ''}
            ${isAnimating ? 'scale-95' : ''}
            ${isOpen ? 'folder-open' : 'folder-close'}
          `}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 85%)',
          }}
        >
          {/* Folder Tab */}
          <div 
            className={`
              absolute top-0 left-0 
              w-8 h-6 
              ${colorClasses[color]}
              rounded-tl-lg
              transition-all duration-300
              ${isHovered ? 'bg-opacity-90' : ''}
            `}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)',
            }}
          />
          
          {/* Shine Effect */}
          <div 
            className={`
              absolute inset-0 
              bg-gradient-to-br 
              from-white/30 
              via-white/10
              to-transparent 
              rounded-t-lg
              transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-50'}
            `}
          />
        </div>

        {/* Folder Shadow */}
        <div 
          className={`
            absolute -bottom-1 left-1/2 transform -translate-x-1/2
            w-16 h-2
            bg-black/20
            blur-sm
            rounded-full
            transition-all duration-300
            ${isHovered ? 'w-20 opacity-40' : 'opacity-20'}
          `}
        />
      </div>

      {/* Folder Name */}
      {name && (
        <p 
          className={`
            mt-2 text-xs font-medium text-gray-700 dark:text-gray-300
            transition-all duration-300
            ${isHovered ? 'text-gray-900 dark:text-gray-100 font-semibold scale-105' : ''}
          `}
        >
          {name}
        </p>
      )}

      {/* Open Indicator */}
      {isOpen && (
        <div className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default Folder;

