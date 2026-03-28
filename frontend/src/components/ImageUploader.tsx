import React from 'react';
import { Edit, Scissors, Paintbrush, Image } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  hideButton?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  activeMenu, 
  setActiveMenu,
  hideButton = false
}) => {
  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Ряд с кнопками меню */}
      <div className="flex items-center justify-center space-x-2 md:space-x-4 w-full flex-wrap gap-2">
        {/* Левые кнопки */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleMenuClick('edit')}
            className={`border font-medium py-2 px-3 md:py-3 md:px-6 rounded-lg transition-colors flex items-center space-x-1 md:space-x-2 text-sm md:text-base ${
              activeMenu === 'edit' 
                ? 'bg-blue-100 border-blue-300 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Редактирование фото</span>
            <span className="sm:hidden">Редакт</span>
          </button>
          <button
            onClick={() => handleMenuClick('remove-bg')}
            className="bg-white border border-gray-300 text-gray-600 font-medium py-2 px-3 md:py-3 md:px-6 rounded-lg transition-colors flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
          >
            <Scissors className="h-4 w-4" />
            <span className="hidden sm:inline">Удаление фона</span>
            <span className="sm:hidden">Удалить фон</span>
          </button>
        </div>

        {/* Правые кнопки */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleMenuClick('inpaint')}
            className="bg-white border border-gray-300 text-gray-600 font-medium py-2 px-3 md:py-3 md:px-6 rounded-lg transition-colors flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
          >
            <Paintbrush className="h-4 w-4" />
            <span className="hidden sm:inline">Дорисовка фото</span>
            <span className="sm:hidden">Дорисовка</span>
          </button>
          <button
            onClick={() => handleMenuClick('replace-bg')}
            className="bg-white border border-gray-300 text-gray-600 font-medium py-2 px-3 md:py-3 md:px-6 rounded-lg transition-colors flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
          >
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Замена фона</span>
            <span className="sm:hidden">Замена фона</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
