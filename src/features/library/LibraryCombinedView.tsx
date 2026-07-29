import React, { useState } from 'react';
import { VocabularyBankView } from '../vocabulary/VocabularyBankView';
import { GrammarLibraryView } from '../grammar/GrammarLibraryView';
import { BookOpen, Layers } from 'lucide-react';

export const LibraryCombinedView: React.FC = () => {
  const [subTab, setSubTab] = useState<'vocab' | 'grammar'>('vocab');

  return (
    <div className="space-y-3">
      {/* Sub-tab switcher */}
      <div className="max-w-md mx-auto px-4 pt-2">
        <div className="bg-stone-200/70 p-1 rounded-2xl flex items-center">
          <button
            onClick={() => setSubTab('vocab')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              subTab === 'vocab'
                ? 'bg-white text-purple-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen size={14} className="text-emerald-600" />
            <span>Vocabulary Garden 🌱</span>
          </button>

          <button
            onClick={() => setSubTab('grammar')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              subTab === 'grammar'
                ? 'bg-white text-purple-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers size={14} className="text-sky-600" />
            <span>Grammar Notes 📚</span>
          </button>
        </div>
      </div>

      {subTab === 'vocab' ? <VocabularyBankView /> : <GrammarLibraryView />}
    </div>
  );
};
