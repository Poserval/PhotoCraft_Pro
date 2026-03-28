import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <img 
            src="/PhotoCraft_Pro/assets/icon-header.png" 
            alt="PhotoCraft Pro Logo" 
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
