import React, { useState, useRef } from 'react';
import Header from './components/Header';
import PreviewWindow from './components/PreviewWindow';
import ImageUploader from './components/ImageUploader';

export interface ImageState {
  original: string;
  current: string;
  name: string;
  size: number;
  format: string;
  edits: any;
}

function App() {
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const format = file.type.split('/')[1].toUpperCase();
      setImageState({
        original: dataUrl,
        current: dataUrl,
        name: file.name,
        size: file.size,
        format: format,
        edits: {}
      });
    };
    reader.readAsDataURL(file);
  };

  const handlePreviewClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
      e.target.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-center mb-6 overflow-x-auto">
          <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg text-[clamp(1rem,5vw,1.5rem)] whitespace-nowrap">
            Умное редактирование фото с AI
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Окно предпросмотра с кликом для загрузки */}
          <div onClick={handlePreviewClick} className="cursor-pointer">
            <PreviewWindow imageState={imageState} />
          </div>
          
          {/* Информация о файле под окном */}
          {imageState && (
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>{imageState.name}</p>
              <p>{(imageState.size / 1024 / 1024).toFixed(2)} MB • {imageState.format}</p>
            </div>
          )}
          
          <div className="mt-8">
            <ImageUploader 
              onImageUpload={handleImageUpload}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              hideButton={true}
            />
          </div>
        </div>
      </main>

      {/* Скрытый input для выбора файла */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.webp,.gif,.bmp,.tiff,.tif,.svg"
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default App;
