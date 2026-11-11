import React from 'react';
import { SCREENS } from '../Data/profile';

// Right-hand rail: the current screen is a glowing bar, the previous one is purple, the rest are clickable labels.
const ScrollComponent = ({ currScreenCount, onSelect }) => {
  const items = [...SCREENS];
  items.splice(currScreenCount, 0, '');

  return (
    <div className="absolute flex mt-56 w-full pr-4 items-center justify-end z-30 pointer-events-none">
      <div className="flex flex-col text-right text-white text-xs font-bold pointer-events-auto">
        <span className="self-center mb-5 text-green-400">Up/W · Scroll</span>
        {items.map((item, index) => {
          if (index === currScreenCount) {
            return <div key="bar" className="bg-purple-400 self-end shadow-4xl shadow-white w-[2px] h-[40px] rounded-full" />;
          }
          const screenIndex = index < currScreenCount ? index + 1 : index;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(screenIndex)}
              className={`text-right hover:text-cyan-300 transition-colors ${index === currScreenCount - 1 ? 'text-purple-400' : ''}`}
            >
              {item}
            </button>
          );
        })}
        <div className="self-center mt-5 flex flex-col text-green-500">
          <span>Down/S · Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default ScrollComponent;
