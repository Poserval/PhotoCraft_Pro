import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Место для твоего логотипа */}
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PhotoCraft Pro</h1>
              <p className="text-xs text-gray-500 -mt-1">AI Photo Studio</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Главная
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Функции
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              О проекте
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
