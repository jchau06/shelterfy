import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={toggleCollapse}
        className="w-full p-[10px] text-white border-none rounded-[6px] cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 transition duration-300"
      >
        {title}
      </button>
      <div
        className={`overflow-hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen scale-y-100' : 'max-h-0 scale-y-0'
        }`}
      >
        <div className="p-4 bg-orange-100 rounded-b-[6px] border-t border-orange-300 shadow-inner">
          <div className={'text-gray-700'}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
