import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { VocabularyItem, GrammarPoint, MasteryLevel } from '../../types';
import { getAudioLangCode } from '../../utils/languageUtils';
import { 
  RotateCcw, 
  Sparkles, 
  Check, 
  X, 
  BookOpen, 
  Layers,
  GraduationCap,
  ChevronRight,
  Volume2,
  Filter,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ReviewRoomView: React.FC = () => {
  const { savedVocabulary, savedGrammar, diaryEntries, updateVocabMastery, setActiveTab, userProfile } = useApp();

  const [cardType, setCardType] = useState<'vocab' | 'grammar'>('vocab');
  const [selectedEntryId, setSelectedEntryId] = useState<string>('all');
  const [dailyCap, setDailyCap] = useState<number>(15);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Filter items by selected entry if anchored review is active
  const rawList = cardType === 'vocab' ? savedVocabulary : savedGrammar;

  const filteredItems = useMemo(() => {
    if (selectedEntryId === 'all') return rawList;
    return rawList.filter(item => item.sourceEntryId === selectedEntryId);
  }, [rawList, selectedEntryId]);

  // Apply hard daily cap to prevent review debt burnout
  const activeItemsList = useMemo(() => {
    return filteredItems.slice(0, dailyCap);
  }, [filteredItems, dailyCap]);

  if (activeItemsList.length === 0) {
    return (
      <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 font-display flex items-center gap-1.5">
              Active Recall Room
            </h2>
            <p className="text-xs text-zinc-500">“Entry-anchored review with zero decay guilt.”</p>
          </div>
        </div>

        {/* Category Selector */}
        <div className="grid grid-cols-2 gap-2 bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
          <button
            onClick={() => { setCardType('vocab'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              cardType === 'vocab' ? 'bg-white text-purple-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <BookOpen size={14} />
            <span>Vocabulary ({savedVocabulary.length})</span>
          </button>
          <button
            onClick={() => { setCardType('grammar'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              cardType === 'grammar' ? 'bg-white text-purple-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <GraduationCap size={14} />
            <span>Grammar ({savedGrammar.length})</span>
          </button>
        </div>

        <EmptyState
          icon={<RotateCcw size={28} />}
          title={`No ${cardType === 'vocab' ? 'vocabulary' : 'grammar'} items to review`}
          description={`Write diary entries and save ${cardType === 'vocab' ? 'words' : 'grammar patterns'} to unlock interactive spaced repetition flashcards.`}
          actionLabel="Write Diary Entry"
          onAction={() => setActiveTab('diary')}
        />
      </div>
    );
  }

  const currentItem = activeItemsList[currentIndex % activeItemsList.length];

  const handleNextCard = (gotItRight: boolean) => {
    if (gotItRight) {
      setCorrectCount(prev => prev + 1);
      if (cardType === 'vocab' && 'masteryLevel' in currentItem) {
        const masteryOrder: MasteryLevel[] = ['New seed', 'Sprouting', 'Growing', 'Strong', 'Mastered'];
        const currentPos = masteryOrder.indexOf(currentItem.masteryLevel);
        const nextPos = Math.min(masteryOrder.length - 1, currentPos + 1);
        updateVocabMastery(currentItem.id, masteryOrder[nextPos]);
      }
    }

    setIsFlipped(false);
    if (currentIndex + 1 >= activeItemsList.length) {
      setSessionCompleted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setCorrectCount(0);
  };

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 font-display flex items-center gap-1.5">
            Active Recall Room
          </h2>
          <p className="text-xs text-zinc-500">“Entry-anchored recall with no decay guilt.”</p>
        </div>

        <div className="flex items-center gap-1 bg-purple-100/90 text-purple-900 px-2.5 py-1 rounded-full text-xs font-bold border border-purple-200">
          <span>{Math.min(currentIndex + 1, activeItemsList.length)} / {activeItemsList.length}</span>
        </div>
      </div>

      {/* Guilt-Free & Hard Cap Bar */}
      <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-purple-600 shrink-0" />
          <span>
            <strong>Cap: {dailyCap} items/day.</strong> No wilting or review debt.
          </span>
        </div>
        <select
          value={dailyCap}
          onChange={(e) => {
            setDailyCap(Number(e.target.value));
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className="bg-white text-purple-900 border border-purple-200 px-2 py-1 rounded-lg font-bold text-[11px] focus:outline-none cursor-pointer"
        >
          <option value={10}>Cap 10</option>
          <option value={15}>Cap 15</option>
          <option value={20}>Cap 20</option>
          <option value={50}>Cap 50</option>
        </select>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 gap-2 bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
        <button
          onClick={() => {
            setCardType('vocab');
            setCurrentIndex(0);
            setIsFlipped(false);
            setSessionCompleted(false);
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            cardType === 'vocab' ? 'bg-white text-purple-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <BookOpen size={14} />
          <span>Vocabulary ({savedVocabulary.length})</span>
        </button>

        <button
          onClick={() => {
            setCardType('grammar');
            setCurrentIndex(0);
            setIsFlipped(false);
            setSessionCompleted(false);
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            cardType === 'grammar' ? 'bg-white text-purple-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <GraduationCap size={14} />
          <span>Grammar ({savedGrammar.length})</span>
        </button>
      </div>

      {/* Entry-Anchored Filter Selector */}
      {diaryEntries.length > 0 && (
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-zinc-200 text-xs">
          <Filter size={13} className="text-purple-600 shrink-0" />
          <span className="font-semibold text-zinc-600 whitespace-nowrap text-[11px]">Filter Entry:</span>
          <select
            value={selectedEntryId}
            onChange={(e) => {
              setSelectedEntryId(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="w-full bg-zinc-50 border border-zinc-200 font-bold text-zinc-900 text-xs rounded-xl px-2 py-1 focus:outline-none truncate"
          >
            <option value="all">All Saved Items ({rawList.length})</option>
            {diaryEntries.map((entry) => (
              <option key={entry.id} value={entry.id}>
                "{entry.originalText.slice(0, 24)}..." ({new Date(entry.createdAt).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
      )}

      {sessionCompleted ? (
        <CuteCard accentColor="cream" className="text-center py-8 px-6 space-y-4 border-amber-300">
          <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-800 mx-auto flex items-center justify-center text-2xl shadow-inner">
            <CheckCircle2 size={32} />
          </div>

          <div>
            <h3 className="text-lg font-black text-zinc-900 font-display">
              Flashcard Session Complete!
            </h3>
            <p className="text-xs text-zinc-600 max-w-xs mx-auto mt-1">
              You recalled {correctCount} out of {activeItemsList.length} {cardType} items accurately!
            </p>
          </div>

          <button
            onClick={handleRestartSession}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            <span>Practice Again</span>
          </button>
        </CuteCard>
      ) : (
        <div className="space-y-4">
          {/* Interactive Flashcard Component */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full min-h-[300px] rounded-3xl cursor-pointer group"
          >
            <div
              className={`w-full h-full min-h-[300px] duration-300 transition-all rounded-3xl p-6 flex flex-col justify-between text-center shadow-md border ${
                isFlipped
                  ? 'bg-purple-900 text-white border-purple-700'
                  : 'bg-white text-zinc-900 border-amber-200/80 hover:border-purple-300'
              }`}
            >
              {/* Card Top Indicator */}
              <div className="w-full flex items-center justify-between text-xs mb-2">
                <Badge variant={isFlipped ? 'pink' : 'purple'} size="sm">
                  {cardType === 'vocab' ? 'Vocabulary' : 'Grammar'}
                </Badge>
                <span className="text-[11px] opacity-75 font-semibold">
                  {isFlipped ? 'Back (Tap to flip back)' : 'Front (Tap to reveal)'}
                </span>
              </div>

              {/* Center Content for Vocabulary */}
              {cardType === 'vocab' && (
                !isFlipped ? (
                  <div className="my-auto space-y-3 py-4">
                    <h3 className="text-4xl font-black font-display tracking-wide">
                      {(currentItem as VocabularyItem).targetText}
                    </h3>
                    <p className="text-base font-bold text-purple-600">
                      {(currentItem as VocabularyItem).pronunciation}
                    </p>
                    <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                      <AudioPlayer 
                        text={(currentItem as VocabularyItem).targetText} 
                        lang={getAudioLangCode(userProfile.targetLanguage)} 
                        size="md" 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="my-auto space-y-3 py-4">
                    <span className="text-2xl font-black text-pink-300 font-display block">
                      {(currentItem as VocabularyItem).meaning}
                    </span>
                    <p className="text-xs text-purple-200 font-medium">
                      Part of speech: {(currentItem as VocabularyItem).partOfSpeech}
                    </p>

                    {(currentItem as VocabularyItem).examples && (currentItem as VocabularyItem).examples.length > 0 && (
                      <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-800 text-left text-xs max-w-xs mx-auto space-y-1">
                        <p className="font-bold text-amber-300">{(currentItem as VocabularyItem).examples[0].targetText}</p>
                        <p className="text-[11px] text-purple-300">{(currentItem as VocabularyItem).examples[0].pronunciation}</p>
                        <p className="text-[11px] text-purple-100">{(currentItem as VocabularyItem).examples[0].translation}</p>
                      </div>
                    )}
                  </div>
                )
              )}

              {/* Center Content for Grammar */}
              {cardType === 'grammar' && (
                !isFlipped ? (
                  <div className="my-auto space-y-3 py-4">
                    <Badge variant="amber" size="sm" className="mx-auto">
                      Structure Pattern
                    </Badge>
                    <h3 className="text-2xl font-black font-display text-zinc-900 px-2">
                      {(currentItem as GrammarPoint).title}
                    </h3>
                    <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 font-mono text-xs font-bold max-w-xs mx-auto">
                      {(currentItem as GrammarPoint).structure}
                    </div>
                  </div>
                ) : (
                  <div className="my-auto space-y-3 py-4">
                    <h4 className="text-lg font-bold text-amber-300 font-display">
                      {(currentItem as GrammarPoint).shortExplanation}
                    </h4>
                    
                    <p className="text-xs text-purple-100 line-clamp-3 leading-relaxed max-w-xs mx-auto">
                      {(currentItem as GrammarPoint).detailedExplanation}
                    </p>

                    {(currentItem as GrammarPoint).examples && (currentItem as GrammarPoint).examples.length > 0 && (
                      <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-800 text-left text-xs max-w-xs mx-auto space-y-1">
                        <p className="font-bold text-amber-300">{(currentItem as GrammarPoint).examples[0].targetText}</p>
                        <p className="text-[11px] text-purple-300">{(currentItem as GrammarPoint).examples[0].pronunciation}</p>
                        <p className="text-[11px] text-purple-100">{(currentItem as GrammarPoint).examples[0].translation}</p>
                      </div>
                    )}
                  </div>
                )
              )}

              {/* Bottom Footer Hint */}
              <p className="text-[11px] opacity-60 font-medium pt-2">
                {isFlipped ? 'Rate how well you recalled this item below' : 'Tap card to flip over'}
              </p>
            </div>
          </div>

          {/* Response Buttons */}
          {isFlipped && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-150">
              <button
                onClick={() => handleNextCard(false)}
                className="py-3 px-4 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <X size={16} />
                <span>Review Soon</span>
              </button>

              <button
                onClick={() => handleNextCard(true)}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Check size={16} />
                <span>Recalled Well ✓</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
