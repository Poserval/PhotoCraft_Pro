import React from 'react';

interface EditMenuProps {
  isActive: boolean;
  onToolSelect: (tool: string) => void;
  onAdjustmentChange: (adjustment: string, value: number) => void;
  onColorAdjustment: (adjustment: string, value: number) => void;
  onEffectApply: (effect: string, intensity?: number) => void;
  onTextAdd: (textConfig: any) => void;
}

const EditMenu: React.FC<EditMenuProps> = ({ 
  isActive,
  onToolSelect,
  onAdjustmentChange,
  onColorAdjustment,
  onEffectApply,
  onTextAdd
}) => {
  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <p className="text-gray-500 text-center py-8">
        Меню редактирования (функционал в разработке)
      </p>
    </div>
  );
};

export default EditMenu;
