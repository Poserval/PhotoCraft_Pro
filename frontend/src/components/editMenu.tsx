import React, { useState } from 'react';
import { 
  Crop, 
  Settings, 
  Palette, 
  Filter, 
  Type, 
  Brush, 
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Move,
  RotateCw,
  FlipHorizontal,
  Ruler
} from 'lucide-react';

interface EditMenuProps {
  isActive: boolean;
  onToolSelect: (tool: string) => void;
  onAdjustmentChange: (adjustment: string, value: number) => void;
  onColorAdjustment: (adjustment: string, value: number) => void;
  onEffectApply: (effect: string, intensity?: number) => void;
  onTextAdd: (textConfig: any) => void;
}

interface MenuSection {
  id: string;
  title: string;
  icon: React.ElementType;
  isExpanded: boolean;
}

interface CropSubItem {
  id: string;
  title: string;
  icon: React.ElementType;
  isExpanded: boolean;
}

const EditMenu: React.FC<EditMenuProps> = ({ 
  isActive,
  onToolSelect,
  onAdjustmentChange,
  onColorAdjustment,
  onEffectApply,
  onTextAdd
}) => {
  const [sections, setSections] = useState<MenuSection[]>([
    { id: 'crop', title: 'Кадрирование', icon: Crop, isExpanded: false },
    { id: 'correction', title: 'Коррекция', icon: Settings, isExpanded: false },
    { id: 'color', title: 'Цвет', icon: Palette, isExpanded: false },
    { id: 'effects', title: 'Эффекты', icon: Filter, isExpanded: false },
    { id: 'text', title: 'Текст', icon: Type, isExpanded: false },
    { id: 'tools', title: 'Инструменты', icon: Brush, isExpanded: false },
    { id: 'more', title: 'Дополнительно', icon: MoreHorizontal, isExpanded: false }
  ]);

  // Состояние для подменю раздела "Кадрирование"
  const [cropSubItems, setCropSubItems] = useState<CropSubItem[]>([
    { id: 'crop-aspect', title: 'Обрезка', icon: Crop, isExpanded: false },
    { id: 'rotate', title: 'Поворот', icon: RotateCw, isExpanded: false },
    { id: 'flip', title: 'Отражение', icon: FlipHorizontal, isExpanded: false },
    { id: 'resize', title: 'Размер', icon: Ruler, isExpanded: false }
  ]);

  const [selectedAspect, setSelectedAspect] = useState<string>('free');

  const aspectRatios = [
    { id: 'free', label: 'Свободный', icon: '✂️' },
    { id: '1:1', label: '1:1', icon: '⬜' },
    { id: '2:3', label: '2:3', icon: '▯' },
    { id: '3:2', label: '3:2', icon: '▮' },
    { id: '3:4', label: '3:4', icon: '▯' },
    { id: '4:3', label: '4:3', icon: '▮' },
    { id: '9:16', label: '9:16', icon: '▯' },
    { id: '16:9', label: '16:9', icon: '▮' }
  ];

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const toggleCropSubItem = (id: string) => {
    setCropSubItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isExpanded: !item.isExpanded }
          : { ...item, isExpanded: false } // Закрываем другие
      )
    );
  };

  if (!isActive) return null;

  // Рендер содержимого раздела "Кадрирование"
  const renderCropContent = () => {
    return (
      <div className="space-y-2">
        {cropSubItems.map((item) => (
          <div key={item.id} className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => toggleCropSubItem(item.id)}
              className="w-full flex items-center justify-between py-2 px-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                <item.icon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{item.title}</span>
              </div>
              {item.isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            {/* Содержимое подменю "Обрезка" */}
            {item.id === 'crop-aspect' && item.isExpanded && (
              <div className="pl-7 pb-3 pr-1">
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setSelectedAspect(ratio.id)}
                      className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                        selectedAspect === ratio.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg mb-1">{ratio.icon}</span>
                      <span className="text-xs font-medium">{ratio.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Заглушки для других подменю */}
            {item.id !== 'crop-aspect' && item.isExpanded && (
              <div className="pl-7 pb-3">
                <p className="text-xs text-gray-400 py-2 text-center">
                  Инструмент "{item.title}" в разработке
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.id} className="rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <section.icon className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate">{section.title}</span>
            </div>
            <div className="flex-shrink-0 ml-2">
              {section.isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </button>
          
          {/* Контент раздела */}
          {section.isExpanded && (
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              {section.id === 'crop' ? (
                renderCropContent()
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  Инструменты раздела "{section.title}" в разработке
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditMenu;
