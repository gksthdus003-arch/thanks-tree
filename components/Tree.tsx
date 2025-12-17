import React from 'react';
import { Note } from '../types';

interface TreeProps {
  notes: Note[];
  onOrnamentClick: (note: Note) => void;
  isPreview?: boolean;
  imageSrc?: string;
}

const Tree: React.FC<TreeProps> = ({ 
  notes, 
  onOrnamentClick, 
  isPreview = false,
  imageSrc
}) => {
  
  return (
    <div className={`relative flex flex-col items-center justify-center transition-all duration-500 ${isPreview ? 'scale-50 sm:scale-75 origin-top' : ''}`}>
      
      {/* Container for the tree image and ornaments */}
      <div className="relative w-full max-w-[500px] aspect-[3/4]">
        
        {/* The Tree Image */}
        {/* Note: The image should be transparent PNG for best results */}
        <img 
          src={imageSrc} 
          alt="Christmas Tree" 
          className="w-full h-full object-contain drop-shadow-2xl z-10 relative"
        />

        {/* Ornaments */}
        {notes.map((note) => {
          return (
            <button
              key={note.id}
              onClick={(e) => {
                e.stopPropagation();
                onOrnamentClick(note);
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200 cursor-pointer z-30"
              style={{
                left: `${note.x}%`,
                top: `${note.y}%`,
                fontSize: isPreview ? '2rem' : '2.3rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
              title={`Message from ${note.author}`}
            >
              {note.ornament}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tree;