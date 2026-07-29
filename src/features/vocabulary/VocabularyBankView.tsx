import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VocabularyItem, MasteryLevel } from '../../types';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { getAudioLangCode, getLanguageMeta } from '../../utils/languageUtils';
import { 
  Search, 
  Filter, 
  Trash2, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  ChevronRight,
  Plus
} from 'lucide-react';

export const VocabularyBankView: React.FC = () => {
  const { 
    savedVocabulary, 
    removeVocabulary, 
    setSelectedVocab, 
    setActiveTab,
    userProfile
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const meta = getLanguageMeta(userProfile.targetLanguage);

  const filteredVocabulary = savedVocabulary.filter((item) => {
    const matchesSearch = 
      item.targetText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pronunciation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDiff = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;

    return matchesSearch && matchesDiff;
  });

  const getMasteryIcon = (mastery: MasteryLevel) => {
    switch (mastery) {
      case 'New seed': return '🌱';
      case 'Sprouting': return '🌿';
      case 'Growing': return '🪴';
      case 'Strong': return '🌳';
      case 'Mastered': return '🌸';
      default: return '🌱';
    }
  };

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 font-sans flex items-center gap-1.5">
            Vocabulary Garden 🌱
          </h2>
          <p className="text-xs text-zinc-500">Every word grown from your daily memories</p>
        </div>
        <Badge variant="emerald">
          {savedVocabulary.length} Words
        </Badge>
      </div>

      {/* Search & Filter Bar */}
      <CuteCard accentColor="cream" className="p-3 space-y-2 border-zinc-200">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search saved words, ${meta.pronunciationSystemName.toLowerCase()}, or meaning...`}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1 flex-shrink-0">
            <Filter size={12} /> Filter:
          </span>
          {['all', 'Beginner', 'Lower intermediate', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDifficulty === diff
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </CuteCard>

      {/* Vocabulary Items List */}
      {filteredVocabulary.length === 0 ? (
        <EmptyState
          icon={<BookOpen size={28} />}
          title="No words in your garden yet"
          description={
            searchQuery
              ? "No saved words match your search filter."
              : "Write a diary entry to harvest words from your real life into your garden."
          }
          actionLabel="Write Diary Entry"
          onAction={() => setActiveTab('diary')}
        />
      ) : (
        <div className="space-y-2.5">
          {filteredVocabulary.map((item) => (
            <CuteCard
              key={item.id}
              accentColor="white"
              onClick={() => {
                setSelectedVocab(item);
                setActiveTab('vocab-detail');
              }}
              className="hover:border-zinc-400 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-zinc-900 font-sans">
                      {item.targetText}
                    </span>
                    <span className="text-xs font-bold text-zinc-700 font-mono">
                      {item.pronunciation}
                    </span>
                    <span className="text-sm" title={`Mastery: ${item.masteryLevel}`}>
                      {getMasteryIcon(item.masteryLevel)}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-zinc-700 mt-0.5">
                    {item.meaning}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-500 font-medium">
                    <span className="bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                      {item.partOfSpeech}
                    </span>
                    <span>{item.examples ? item.examples.length : 0} examples</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <AudioPlayer text={item.targetText} lang={getAudioLangCode(userProfile.targetLanguage)} size="sm" showLabel={false} />
                  <button
                    onClick={() => removeVocabulary(item.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove word"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight size={16} className="text-zinc-400" />
                </div>
              </div>
            </CuteCard>
          ))}
        </div>
      )}
    </div>
  );
};
