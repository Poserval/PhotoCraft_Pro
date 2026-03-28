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
      
      {/* Когда нет активного меню - обычный режим */}
      {!activeMenu ? (
        <main className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center mb-6">
            typescript
<h1 className="font-black ...">
  ТЕСТ: Умное редактирование фото с AI
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
        // Когда активное меню - фиксированная верхняя часть и прокручиваемые подменю
        <div className="h-screen flex flex-col">
          {/* Фиксированная верхняя часть */}
          <div className="flex-shrink-0 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                {/* ОПП */}
                <div onClick={handlePreviewClick} className="cursor-pointer">
                  <PreviewWindow imageState={imageState} compact={true} />
                </div>
                
                {/* Информация о файле */}
                {imageState && (
                  <div className="mt-2 text-center text-xs text-gray-400">
                    <p>{imageState.name} • {(imageState.size / 1024 / 1024).toFixed(2)} MB • {imageState.format}</p>
                  </div>
                )}
                
                {/* Название меню и кнопка назад */}
                <div className="flex items-center justify-between mt-4">
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
              </div>
            </div>
          </div>
          
          {/* Прокручиваемая область с подменю */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 pb-4">
              <div className="bg-white rounded-2xl shadow-lg p-4">
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
          </div>
        </div>
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
