
import React from 'react';

interface SwitchProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label: string;
}

export const Switch: React.FC<SwitchProps> = ({ isChecked, onChange, label }) => {
  const toggleSwitch = () => {
    onChange(!isChecked);
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-gray-400">{label}</label>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
          isChecked ? 'bg-blue-500' : 'bg-gray-700'
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            isChecked ? 'translate-x-6' : ''
          }`}
        ></div>
      </div>
    </div>
  );
};
