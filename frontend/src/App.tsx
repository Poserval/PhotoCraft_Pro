import React, { useState } from 'react';
import Header from './components/Header';
import PreviewWindow from './components/PreviewWindow';
import ImageUploader from './components/ImageUploader';

export interface ImageState {
  original: string; // Data URL
  name: string; // Имя файла
  size: number; // Размер файла
}

function App() {
  const [imageState, setImageState] = useState<ImageState | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageState({
        original: dataUrl,
        name: file.name,
        size: file.size
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Умное редактирование фото с AI
          </h1>
          <p className="text-lg text-gray-600">
            Загрузите фотографию для удаления фона и других преобразований
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <PreviewWindow imageState={imageState} />
          <div className="mt-8">
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
