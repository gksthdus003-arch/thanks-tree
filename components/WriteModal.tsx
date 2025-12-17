import React, { useState } from 'react';
import { ORNAMENTS } from '../types';
import { X, Check } from 'lucide-react';

interface WriteModalProps {
  onClose: () => void;
  onSubmit: (name: string, content: string, ornament: string) => void;
}

const WriteModal: React.FC<WriteModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [selectedOrnament, setSelectedOrnament] = useState(ORNAMENTS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      onSubmit(name, content, selectedOrnament);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800 border-4 border-christmas-gold">
        
        {/* Header */}
        <div className="bg-christmas-red p-4 flex justify-between items-center text-white">
          {/* Changed font-display to font-sans for better Korean rendering */}
          <h2 className="text-xl font-sans font-bold">감사 쪽지 달기 🎄</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Step 1: Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-christmas-green">1. 누가 보내나요?</label>
            <input
              type="text"
              required
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 또는 닉네임"
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-christmas-red focus:outline-none transition-colors"
            />
          </div>

          {/* Step 2: Content */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-christmas-green">2. 어떤 감사함을 전할까요?</label>
            <textarea
              required
              rows={4}
              maxLength={200}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="따뜻한 마음을 적어주세요..."
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-christmas-red focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Step 3: Ornament */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-christmas-green">3. 오너먼트를 골라주세요</label>
            <div className="grid grid-cols-5 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 h-32 overflow-y-auto">
              {ORNAMENTS.map((orn) => (
                <button
                  key={orn}
                  type="button"
                  onClick={() => setSelectedOrnament(orn)}
                  className={`text-2xl p-2 rounded-lg transition-all hover:bg-white ${
                    selectedOrnament === orn 
                      ? 'bg-christmas-gold/30 ring-2 ring-christmas-gold scale-110' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {orn}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-christmas-green text-white font-bold rounded-xl shadow-md hover:bg-green-800 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Check size={20} />
            트리에 걸기
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteModal;