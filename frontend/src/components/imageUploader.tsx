import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
      // Сбрасываем значение input, чтобы можно было загрузить тот же файл снова
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={() => document.getElementById('file-input')?.click()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-colors flex items-center space-x-3 text-lg"
      >
        <Upload className="h-6 w-6" />
        <span>Выбрать изображение</span>
      </button>

      <p className="text-sm text-gray-500 text-center">
        Поддерживаются JPG, PNG, WebP форматы
      </p>

      <input
        id="file-input"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onFileInputChange}
      />
    </div>
  );
};

export default ImageUploader;
