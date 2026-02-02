import React, { useEffect, useState } from 'react';
import { BACKGROUND_IMAGES } from '../constants';

interface BackgroundItem {
  id: number;
  src: string;
  top: number;
  left: number;
  rotation: number;
  scale: number;
}

const Background: React.FC = () => {
  const [items, setItems] = useState<BackgroundItem[]>([]);

  useEffect(() => {
    // Generate random positions on mount
    const newItems: BackgroundItem[] = [];
    const count = 12; // Number of images to scatter

    for (let i = 0; i < count; i++) {
      newItems.push({
        id: i,
        src: BACKGROUND_IMAGES[i % BACKGROUND_IMAGES.length],
        top: Math.random() * 100, // percentage
        left: Math.random() * 100, // percentage
        rotation: Math.random() * 60 - 30, // -30 to 30 deg
        scale: Math.random() * 0.5 + 0.8, // 0.8 to 1.3
      });
    }
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-valentine-50">
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-0" />
      
      {items.map((item) => (
        <img
          key={item.id}
          src={item.src}
          alt="decoration"
          className="absolute object-cover rounded-xl shadow-lg opacity-60 transition-all duration-1000 ease-in-out"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            width: '180px',
            height: '180px',
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
          }}
        />
      ))}
    </div>
  );
};

export default Background;