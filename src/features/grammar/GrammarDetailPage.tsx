import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { ArrowLeft, Trash2, AlertCircle, HelpCircle } from 'lucide-react';

export const GrammarDetailPage: React.FC = () => {
  const { selectedGrammar, setActiveTab, removeGrammar } = useApp();
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);

  if (!selectedGrammar) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-stone-500">No grammar point selected.</p>
        <button
          onClick={() => setActiveTab('library')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
        >
          Go to Library
        </button>
      </div>
    );
  }

  const handleRemove = () => {
    removeGrammar(selectedGrammar.id);
    setActiveTab('library');
  };

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('library')}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-purple-700 bg-stone-100 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Library</span>
        </button>

        <button
          onClick={handleRemove}
          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Hero Grammar Card */}
      <CuteCard accentColor="blue" className="border-sky-300">
        <Badge variant="sky" size="sm" className="mb-2">
          {selectedGrammar.targetLanguage} Grammar
        </Badge>
        <h1 className="text-xl font-black text-sky-950 font-display">
          {selectedGrammar.title}
        </h1>
        <div className="mt-2 p-2.5 rounded-xl bg-white/80 border border-sky-200">
          <span className="text-xs font-bold text-purple-800">
            Structure Formula: {selectedGrammar.structure}
          </span>
        </div>
      </CuteCard>

      {/* Simple & Detailed Explanation */}
      <CuteCard accentColor="white">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
          Explanation
        </h3>
        <p className="text-xs font-bold text-stone-800 mb-2">
          {selectedGrammar.shortExplanation}
        </p>
        <p className="text-xs text-stone-700 leading-relaxed font-medium">
          {selectedGrammar.detailedExplanation}
        </p>
      </CuteCard>

      {/* Examples */}
      {selectedGrammar.examples && selectedGrammar.examples.length > 0 && (
        <CuteCard accentColor="white">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Example Sentences ({selectedGrammar.examples.length})
          </h3>

          <div className="space-y-2.5">
            {selectedGrammar.examples.map((ex, idx) => (
              <div key={ex.id || idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{ex.targetText}</span>
                  <AudioPlayer text={ex.targetText} lang="zh-CN" size="sm" showLabel={false} />
                </div>
                <p className="text-[11px] font-semibold text-purple-700">{ex.pronunciation}</p>
                <p className="text-[11px] text-stone-600 font-medium">{ex.translation}</p>
              </div>
            ))}
          </div>
        </CuteCard>
      )}

      {/* Common Mistakes */}
      {selectedGrammar.commonMistakes && selectedGrammar.commonMistakes.length > 0 && (
        <CuteCard accentColor="pink" className="border-pink-200">
          <h3 className="text-xs font-bold text-pink-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertCircle size={14} className="text-pink-600" />
            Common Mistakes
          </h3>
          <ul className="list-disc list-inside text-xs text-pink-950 font-medium space-y-1">
            {selectedGrammar.commonMistakes.map((cm, idx) => (
              <li key={idx}>{cm}</li>
            ))}
          </ul>
        </CuteCard>
      )}

      {/* Practice Quiz */}
      <CuteCard accentColor="cream">
        <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <HelpCircle size={14} className="text-purple-600" />
          Grammar Check
        </h3>
        <p className="text-xs font-medium text-stone-800 mb-3">
          How is "{selectedGrammar.title}" correctly positioned in a Mandarin Chinese sentence?
        </p>

        <div className="space-y-1.5">
          {[
            { id: 1, text: selectedGrammar.structure, correct: true },
            { id: 2, text: "Placed at the very end of every sentence", correct: false },
            { id: 3, text: "Requires subject-verb inversion like French/English", correct: false }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setQuizAnswered(opt.id)}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                quizAnswered === opt.id
                  ? opt.correct
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-rose-100 border-rose-400 text-rose-900'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-purple-50'
              }`}
            >
              {opt.text}
              {quizAnswered === opt.id && (
                <span className="ml-2 font-bold">
                  {opt.correct ? '✓ Correct!' : '✗ Try again'}
                </span>
              )}
            </button>
          ))}
        </div>
      </CuteCard>
    </div>
  );
};
