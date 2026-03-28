import React from 'react';
import { ImageState } from '../App';
import { Image, Upload } from 'lucide-react';

interface PreviewWindowProps {
  imageState: ImageState | null;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ imageState }) => {
  if (!imageState) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 min-h-[400px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
        <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-600">
          Нажмите для загрузки изображения
        </p>
        <p className="text-sm text-gray-400 mt-2">
          JPG, PNG, WEBP, GIF, BMP, TIFF, SVG
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <img 
          src={imageState.current} 
          alt="Preview" 
          className="max-w-full max-h-[500px] object-contain rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
};

export default PreviewWindow;
