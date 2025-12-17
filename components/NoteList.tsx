import React from 'react';
import { Note } from '../types';
import { X, MessageCircle } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  onClose: () => void;
  onNoteClick: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onClose, onNoteClick }) => {
  // Sort notes by newest first
  const sortedNotes = [...notes].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="fixed inset-0 z-40 flex justify-end pointer-events-none">
      {/* 
        Container Logic:
        - Mobile: inset-0 (Full screen), pointer-events-auto
        - Desktop: w-96 (Sidebar), pointer-events-auto
      */}
      <div className="w-full h-full md:w-96 bg-slate-900/95 md:bg-black/60 md:backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col pointer-events-auto transition-transform duration-300 animate-fade-in">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <h2 className="text-xl font-bold text-christmas-gold">감사 쪽지들</h2>
            <span className="bg-white/10 text-xs px-2 py-1 rounded-full text-white/70">
              {notes.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {sortedNotes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4">
              <MessageCircle size={48} />
              <p>아직 작성된 쪽지가 없어요.</p>
            </div>
          ) : (
            sortedNotes.map((note) => (
              <div 
                key={note.id}
                onClick={() => onNoteClick(note)}
                className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-christmas-gold/30 rounded-xl p-4 cursor-pointer transition-all duration-200 active:scale-95"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl bg-white/5 p-2 rounded-full group-hover:scale-110 transition-transform">
                    {note.ornament}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-christmas-gold truncate pr-2">
                        {note.author}
                      </h3>
                      <span className="text-[10px] text-slate-400">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default NoteList;