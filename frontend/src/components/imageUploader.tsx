import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  }, [handleFileUpload]);

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
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50"
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div>
          <p className="text-lg font-medium text-gray-700">
            Нажмите или перетащите для загрузки фото
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Поддерживаются JPG, PNG, WebP
          </p>
        </div>
      </div>

      <input
        id="file-input"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onFileInputChange}
      />

      <button
        onClick={() => document.getElementById('file-input')?.click()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center space-x-2"
      >
        <Upload className="h-5 w-5" />
        <span>Выбрать изображение</span>
      </button>
    </div>
  );
};

export default ImageUploader;
