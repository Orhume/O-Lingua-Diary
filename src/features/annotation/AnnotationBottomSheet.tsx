import React from 'react';
import { Annotation, VocabularyItem, GrammarPoint } from '../../types';
import { useApp } from '../../context/AppContext';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { getAudioLangCode } from '../../utils/languageUtils';
import { 
  X, 
  Bookmark, 
  BookOpen, 
  Volume2, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  Check
} from 'lucide-react';

interface AnnotationBottomSheetProps {
  annotation: Annotation | null;
  onClose: () => void;
}

export const AnnotationBottomSheet: React.FC<AnnotationBottomSheetProps> = ({
  annotation,
  onClose,
}) => {
  const { 
    saveVocabulary, 
    saveGrammar, 
    savedVocabulary, 
    savedGrammar, 
    setActiveTab, 
    setSelectedAnnotation,
    userProfile
  } = useApp();

  if (!annotation) return null;

  const isVocabSaved = savedVocabulary.some(v => v.targetText === annotation.targetText);
  const isGrammarSaved = savedGrammar.some(g => g.title === annotation.targetText);

  const handleSaveItem = () => {
    if (annotation.annotationType === 'grammar') {
      const gPoint: GrammarPoint = {
        id: `g-${Date.now()}`,
        title: annotation.targetText,
        structure: annotation.meaning,
        shortExplanation: annotation.quickExplanation,
        detailedExplanation: annotation.detailedExplanation,
        examples: annotation.examples || [],
        commonMistakes: annotation.commonMistakes || [],
        targetLanguage: userProfile.targetLanguage,
        difficulty: 'Beginner',
        isSaved: true,
        createdAt: new Date().toISOString()
      };
      saveGrammar(gPoint);
    } else {
      const vItem: VocabularyItem = {
        id: `v-${Date.now()}`,
        targetText: annotation.targetText,
        pronunciation: annotation.pronunciation,
        meaning: annotation.meaning,
        partOfSpeech: annotation.annotationType,
        grammarRole: 'Extracted Annotation',
        difficulty: 'Beginner',
        examples: annotation.examples || [],
        targetLanguage: userProfile.targetLanguage,
        isSaved: true,
        masteryLevel: 'New seed',
        reviewCount: 0,
        createdAt: new Date().toISOString()
      };
      saveVocabulary(vItem);
    }
  };

  const handleLearnDeeply = () => {
    setSelectedAnnotation(annotation);
    onClose();
    setActiveTab('annotation-detail');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 border border-zinc-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="purple" icon={<Sparkles size={12} />}>
              {annotation.annotationType.toUpperCase()}
            </Badge>
            {annotation.toneTips && (
              <Badge variant="amber" size="sm">
                Tone Hint
              </Badge>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center hover:bg-zinc-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Target Word & Audio */}
        <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-zinc-900 font-sans">
              {annotation.targetText}
            </h3>
            <p className="text-sm font-semibold text-zinc-700 font-mono">
              {annotation.pronunciation}
            </p>
            <p className="text-xs text-zinc-600 font-medium mt-0.5">
              {annotation.meaning}
            </p>
          </div>

          <AudioPlayer text={annotation.targetText} lang={getAudioLangCode(userProfile.targetLanguage)} size="md" />
        </div>

        {/* Quick Explanation */}
        <div>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Quick Explanation
          </h4>
          <p className="text-xs text-zinc-800 leading-relaxed font-medium bg-zinc-50 p-3 rounded-xl border border-zinc-200">
            {annotation.quickExplanation}
          </p>
        </div>

        {/* Tone Tip if available */}
        {annotation.toneTips && (
          <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200 text-xs text-zinc-900">
            <span className="font-bold">🎵 Pronunciation Tip: </span>
            <span>{annotation.toneTips}</span>
          </div>
        )}

        {/* Quick Examples */}
        {annotation.examples && annotation.examples.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
              Example
            </h4>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
              <p className="font-bold text-zinc-900">{annotation.examples[0].targetText}</p>
              <p className="text-[11px] text-zinc-700 font-mono font-medium">{annotation.examples[0].pronunciation}</p>
              <p className="text-[11px] text-zinc-500">{annotation.examples[0].translation}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleSaveItem}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              isVocabSaved || isGrammarSaved
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200'
            }`}
          >
            {isVocabSaved || isGrammarSaved ? <Check size={14} /> : <Bookmark size={14} />}
            <span>{isVocabSaved || isGrammarSaved ? 'Saved 🌱' : 'Save to Bank'}</span>
          </button>

          <button
            onClick={handleLearnDeeply}
            className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <BookOpen size={14} />
            <span>Learn Deeply</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
