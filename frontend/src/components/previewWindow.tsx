import React from 'react';
import { ImageState } from '../App';
import { Image } from 'lucide-react';

interface PreviewWindowProps {
  imageState: ImageState | null;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ imageState }) => {
  if (!imageState) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 min-h-[400px] flex items-center justify-center">
        <div className="text-gray-400">
          <Image className="mx-auto h-16 w-16 mb-4" />
          <p className="text-lg font-medium text-gray-600">
            Загрузите изображение для редактирования
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <img 
          src={imageState.original} 
          alt="Preview" 
          className="max-w-full max-h-[600px] object-contain rounded-lg shadow-sm"
        />
        <div className="mt-4 text-sm text-gray-600">
          <p>Файл: {imageState.name}</p>
          <p>Размер: {(imageState.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewWindow;
