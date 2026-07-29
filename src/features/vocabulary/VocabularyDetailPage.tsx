import React from 'react';
import { useApp } from '../../context/AppContext';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { getAudioLangCode } from '../../utils/languageUtils';
import { ArrowLeft, Trash2, Volume2, Sparkles, RotateCcw } from 'lucide-react';

export const VocabularyDetailPage: React.FC = () => {
  const { selectedVocab, userProfile, setActiveTab, removeVocabulary, updateVocabMastery } = useApp();

  if (!selectedVocab) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-stone-500">No word selected.</p>
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
    removeVocabulary(selectedVocab.id);
    setActiveTab('library');
  };

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('library')}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-purple-700 bg-stone-100 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Bank</span>
        </button>

        <button
          onClick={handleRemove}
          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Delete from garden"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Hero Word Card */}
      <CuteCard accentColor="cream" className="border-amber-300">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
              {selectedVocab.partOfSpeech}
            </span>
            <h1 className="text-3xl font-black text-stone-900 font-display mt-1">
              {selectedVocab.targetText}
            </h1>
            <p className="text-base font-bold text-purple-700 mt-0.5">
              {selectedVocab.pronunciation}
            </p>
            <p className="text-sm font-semibold text-stone-700 mt-1">
              {selectedVocab.meaning}
            </p>
          </div>

          <AudioPlayer text={selectedVocab.targetText} lang={getAudioLangCode(userProfile.targetLanguage)} size="lg" />
        </div>

        {/* Plant Growth Mastery Level */}
        <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700">Mastery Level:</span>
          <div className="flex items-center gap-1.5">
            {['New seed', 'Sprouting', 'Growing', 'Strong', 'Mastered'].map((m) => (
              <button
                key={m}
                onClick={() => updateVocabMastery(selectedVocab.id, m as any)}
                className={`text-sm p-1.5 rounded-lg transition-all ${
                  selectedVocab.masteryLevel === m
                    ? 'bg-emerald-200 scale-110 shadow-xs'
                    : 'opacity-40 hover:opacity-100'
                }`}
                title={`Set level to ${m}`}
              >
                {m === 'New seed' ? '🌱' : m === 'Sprouting' ? '🌿' : m === 'Growing' ? '🪴' : m === 'Strong' ? '🌳' : '🌸'}
              </button>
            ))}
          </div>
        </div>
      </CuteCard>

      {/* Example Sentences */}
      {selectedVocab.examples && selectedVocab.examples.length > 0 && (
        <CuteCard accentColor="white">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Example Sentences ({selectedVocab.examples.length})
          </h3>

          <div className="space-y-2.5">
            {selectedVocab.examples.map((ex, idx) => (
              <div key={ex.id || idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{ex.targetText}</span>
                  <AudioPlayer text={ex.targetText} lang={getAudioLangCode(userProfile.targetLanguage)} size="sm" showLabel={false} />
                </div>
                <p className="text-[11px] font-semibold text-purple-700">{ex.pronunciation}</p>
                <p className="text-[11px] text-stone-600 font-medium">{ex.translation}</p>
              </div>
            ))}
          </div>
        </CuteCard>
      )}

      {/* Action Buttons */}
      <button
        onClick={() => setActiveTab('review')}
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
      >
        <RotateCcw size={16} />
        <span>Practice in Review Room</span>
      </button>
    </div>
  );
};
