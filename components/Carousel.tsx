
import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from './Icons';

const images = [
  {
    name: 'Lista',
    url: 'https://images.ctfassets.net/w8fc6tgspyjz/cJ7fgVmMZrAEAxkV5KohY/a7b9268dba1c28170929df52b866ed61/views-table.png',
    alt: 'ClickUp list view showing tasks in a vertical list'
  },
  {
    name: 'Tablero',
    url: 'https://help.clickup.com/hc/article_attachments/23647800719639',
    alt: 'ClickUp board view showing tasks as cards in columns'
  },
  {
    name: 'Calendario',
    url: 'https://cdn.prod.website-files.com/615f4ce7cebadbb94e3ea2ca/643ff6f75332a7d59ec30775_Screenshot%25202023-04-15%2520at%25202.29.51%2520PM.png',
    alt: 'ClickUp calendar view showing tasks on a monthly calendar'
  }
];

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Fix: In browser environments, setInterval returns a number, not NodeJS.Timeout.
    let timer: number | undefined;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
    }
    return () => {
        if (timer) {
            clearInterval(timer);
        }
    };
  }, [isPlaying, currentIndex]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleSelectIndex = (index: number) => {
    setCurrentIndex(index);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-0 pb-[60%] overflow-hidden rounded-2xl shadow-2xl bg-gray-200">
        <button
            onClick={handleTogglePlay}
            className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
        >
            {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
            ) : (
                <PlayIcon className="w-6 h-6" />
            )}
        </button>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            className={`absolute top-0 left-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleSelectIndex(index)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              index === currentIndex
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {image.name}
          </button>
        ))}
      </div>
    </div>
  );
};