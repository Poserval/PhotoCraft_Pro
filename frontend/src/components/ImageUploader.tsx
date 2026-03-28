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
      {/* Ряд с кнопками меню - только иконки */}
      <div className="flex items-center justify-center space-x-4 w-full">
        <button
          onClick={() => handleMenuClick('edit')}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-200 flex items-center justify-center ${
            activeMenu === 'edit' 
              ? 'bg-blue-500 text-white shadow-lg scale-105' 
              : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:shadow-md'
          }`}
          title="Редактирование фото"
        >
          <Edit className="h-6 w-6 md:h-7 md:w-7" />
        </button>
        
        <button
          onClick={() => handleMenuClick('remove-bg')}
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-200 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:shadow-md"
          title="Удаление фона"
        >
          <Scissors className="h-6 w-6 md:h-7 md:w-7" />
        </button>
        
        <button
          onClick={() => handleMenuClick('inpaint')}
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-200 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:shadow-md"
          title="Дорисовка фото"
        >
          <Paintbrush className="h-6 w-6 md:h-7 md:w-7" />
        </button>
        
        <button
          onClick={() => handleMenuClick('replace-bg')}
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-200 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:shadow-md"
          title="Замена фона"
        >
          <Image className="h-6 w-6 md:h-7 md:w-7" />
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
