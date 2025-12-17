import React from 'react';
import { Note } from '../types';
import { X, Quote } from 'lucide-react';

interface NoteViewModalProps {
  note: Note;
  onClose: () => void;
}

const NoteViewModal: React.FC<NoteViewModalProps> = ({ note, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden transform transition-all scale-100 p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="text-6xl filter drop-shadow-lg animate-bounce">
            {note.ornament}
          </div>
        </div>

        <div className="text-center space-y-4">
          <Quote className="inline-block text-christmas-red opacity-20 transform rotate-180" size={32} />
          
          <p className="text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
            {note.content}
          </p>

          <Quote className="inline-block text-christmas-red opacity-20" size={32} />
        </div>

        <div className="mt-8 pt-4 border-t border-red-100 flex justify-end items-center gap-2">
           <span className="text-xs text-slate-400 font-mono">From.</span>
           <span className="text-christmas-green font-bold text-lg">{note.author}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteViewModal;