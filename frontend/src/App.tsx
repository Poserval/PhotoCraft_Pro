import React, { useState, useRef } from 'react';
import Header from './components/Header';
import PreviewWindow from './components/PreviewWindow';
import ImageUploader from './components/ImageUploader';
import EditMenu from './components/editMenu';

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

  const handleBackToMenu = () => {
    setActiveMenu(null);
  };

  // Получаем название активного меню
  const getMenuTitle = () => {
    switch (activeMenu) {
      case 'edit': return 'Редактирование фото';
      case 'remove-bg': return 'Удаление фона';
      case 'inpaint': return 'Дорисовка фото';
      case 'replace-bg': return 'Замена фона';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Контент меняется в зависимости от активного меню */}
      {!activeMenu ? (
        // Режим: кнопки выбора (всё видно)
        <main className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center mb-6">
            <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg text-[clamp(1rem,5vw,1.5rem)] whitespace-nowrap">
              Умное редактирование фото с AI
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              JPG • JPEG • PNG • WEBP • GIF • BMP • TIFF • SVG
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div onClick={handlePreviewClick} className="cursor-pointer">
              <PreviewWindow imageState={imageState} />
            </div>
            
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
      ) : (
        // Режим: меню редактирования (ОПП поднят наверх, заголовок скрыт)
        <main className="max-w-7xl mx-auto px-4 py-2">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            {/* ОПП - компактный режим */}
            <div onClick={handlePreviewClick} className="cursor-pointer">
              <PreviewWindow imageState={imageState} compact={true} />
            </div>
            
            {/* Информация о файле - компактная */}
            {imageState && (
              <div className="mt-2 text-center text-xs text-gray-400">
                <p>{imageState.name} • {(imageState.size / 1024 / 1024).toFixed(2)} MB • {imageState.format}</p>
              </div>
            )}
            
            {/* Панель управления меню */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBackToMenu}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  title="Назад"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <h2 className="text-md font-semibold text-gray-800">{getMenuTitle()}</h2>
                
                <div className="w-10"></div>
              </div>
              
              <EditMenu 
                isActive={activeMenu === 'edit'}
                onToolSelect={() => {}}
                onAdjustmentChange={() => {}}
                onColorAdjustment={() => {}}
                onEffectApply={() => {}}
                onTextAdd={() => {}}
              />
            </div>
          </div>
        </main>
      )}

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
