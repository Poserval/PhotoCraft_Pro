import React, { useState } from 'react';
import Header from './components/Header';
import PreviewWindow from './components/PreviewWindow';
import ImageUploader from './components/ImageUploader';

export interface ImageState {
  original: string;
  current: string;
  name: string;
  size: number;
  edits: any;
}

function App() {
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageState({
        original: dataUrl,
        current: dataUrl,
        name: file.name,
        size: file.size,
        edits: {}
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Красивый объемный заголовок в одну строку */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg whitespace-nowrap">
            Умное редактирование фото с AI
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <PreviewWindow imageState={imageState} />
          
          <div className="mt-8">
            <ImageUploader 
              onImageUpload={handleImageUpload}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
