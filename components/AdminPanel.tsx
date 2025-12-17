import React from 'react';
import { Note } from '../types';
import { Trash2, X, Calendar } from 'lucide-react';

interface AdminPanelProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ notes, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 text-white flex flex-col">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2">
          🛡️ 관리자 모드 <span className="text-sm font-normal text-slate-400">({notes.length}개의 쪽지)</span>
        </h2>
        <button onClick={onClose} className="bg-slate-700 p-2 rounded hover:bg-slate-600">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {notes.length === 0 ? (
          <div className="text-center text-slate-500 mt-20">등록된 쪽지가 없습니다.</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-slate-800 p-4 rounded-lg flex items-start justify-between border border-slate-700 hover:border-slate-500 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{note.ornament}</span>
                  <span className="font-bold text-blue-300">{note.author}</span>
                </div>
                <p className="text-slate-300 text-sm line-clamp-2">{note.content}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                  <Calendar size={12} />
                  {new Date(note.timestamp).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('정말 이 쪽지를 삭제하시겠습니까?')) {
                    onDelete(note.id);
                  }
                }}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded transition"
                title="삭제"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;