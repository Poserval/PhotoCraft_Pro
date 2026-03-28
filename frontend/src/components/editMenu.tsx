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
  ChevronUp
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

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  if (!isActive) return null;

  // Рендер содержимого раздела "Кадрирование" - ТЕСТОВЫЙ БЛОК
  const renderCropContent = () => {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
        <p className="text-center text-red-700 font-bold text-lg">ЖОПА</p>
        <p className="text-center text-red-600 text-sm mt-1">Тест отображения кода</p>
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
