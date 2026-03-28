import React from 'react';
import { ImageState } from '../App';
import { Image, Upload } from 'lucide-react';

interface PreviewWindowProps {
  imageState: ImageState | null;
  compact?: boolean;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ imageState, compact = false }) => {
  if (!imageState) {
    return (
      <div className={`border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors ${
        compact ? 'py-8 min-h-[200px]' : 'p-12 min-h-[400px]'
      }`}>
        <Upload className={`mx-auto text-gray-400 ${compact ? 'h-10 w-10' : 'h-16 w-16'} mb-2`} />
        <p className={`font-medium text-gray-600 ${compact ? 'text-sm' : 'text-lg'}`}>
          Нажмите для загрузки
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-gray-100 ${compact ? 'p-2' : 'p-4'}`}>
      <div className="flex flex-col items-center">
        <img 
          src={imageState.current} 
          alt="Preview" 
          className={`max-w-full object-contain rounded-lg shadow-sm ${compact ? 'max-h-[250px]' : 'max-h-[500px]'}`}
        />
      </div>
    </div>
  );
};

export default PreviewWindow;
