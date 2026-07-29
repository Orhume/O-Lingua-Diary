import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { VocabularyItem, GrammarPoint } from '../../types';
import { getAudioLangCode } from '../../utils/languageUtils';
import { 
  ArrowLeft, 
  Bookmark, 
  Check, 
  Sparkles, 
  AlertCircle, 
  Volume2,
  HelpCircle
} from 'lucide-react';

export const AnnotationDetailPage: React.FC = () => {
  const { 
    selectedAnnotation, 
    setActiveTab, 
    saveVocabulary, 
    saveGrammar, 
    savedVocabulary, 
    savedGrammar,
    userProfile
  } = useApp();

  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);

  if (!selectedAnnotation) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-stone-500">No annotation selected.</p>
        <button
          onClick={() => setActiveTab('today')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
        >
          Go Home
        </button>
      </div>
    );
  }

  const isVocabSaved = savedVocabulary.some(v => v.targetText === selectedAnnotation.targetText);
  const isGrammarSaved = savedGrammar.some(g => g.title === selectedAnnotation.targetText);

  const handleSave = () => {
    if (selectedAnnotation.annotationType === 'grammar') {
      const gPoint: GrammarPoint = {
        id: `g-${Date.now()}`,
        title: selectedAnnotation.targetText,
        structure: selectedAnnotation.meaning,
        shortExplanation: selectedAnnotation.quickExplanation,
        detailedExplanation: selectedAnnotation.detailedExplanation,
        examples: selectedAnnotation.examples || [],
        commonMistakes: selectedAnnotation.commonMistakes || [],
        targetLanguage: userProfile.targetLanguage,
        difficulty: 'Beginner',
        isSaved: true,
        createdAt: new Date().toISOString()
      };
      saveGrammar(gPoint);
    } else {
      const vItem: VocabularyItem = {
        id: `v-${Date.now()}`,
        targetText: selectedAnnotation.targetText,
        pronunciation: selectedAnnotation.pronunciation,
        meaning: selectedAnnotation.meaning,
        partOfSpeech: selectedAnnotation.annotationType,
        grammarRole: 'Deep Annotation',
        difficulty: 'Beginner',
        examples: selectedAnnotation.examples || [],
        targetLanguage: userProfile.targetLanguage,
        isSaved: true,
        masteryLevel: 'New seed',
        reviewCount: 0,
        createdAt: new Date().toISOString()
      };
      saveVocabulary(vItem);
    }
  };

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('lesson')}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Lesson</span>
        </button>

        <Badge variant="purple">
          {selectedAnnotation.annotationType.toUpperCase()}
        </Badge>
      </div>

      {/* Main Title Hero Card */}
      <CuteCard accentColor="cream" className="border-zinc-300">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 font-sans">
              {selectedAnnotation.targetText}
            </h1>
            <p className="text-base font-bold text-zinc-700 font-mono mt-1">
              {selectedAnnotation.pronunciation}
            </p>
            <p className="text-sm font-semibold text-zinc-800 mt-0.5">
              {selectedAnnotation.meaning}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <AudioPlayer text={selectedAnnotation.targetText} lang={getAudioLangCode(userProfile.targetLanguage)} size="lg" />
            <button
              onClick={handleSave}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                isVocabSaved || isGrammarSaved
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 border border-zinc-200 text-zinc-900 hover:bg-zinc-200'
              }`}
            >
              {isVocabSaved || isGrammarSaved ? <Check size={14} /> : <Bookmark size={14} />}
              <span>{isVocabSaved || isGrammarSaved ? 'Saved 🌱' : 'Save Item'}</span>
            </button>
          </div>
        </div>
      </CuteCard>

      {/* Beginner & Detailed Explanations */}
      <CuteCard accentColor="white">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles size={14} className="text-zinc-700" />
          Explanation
        </h3>
        <p className="text-xs font-bold text-zinc-900 mb-2 font-sans">
          {selectedAnnotation.quickExplanation}
        </p>
        <p className="text-xs text-zinc-700 leading-relaxed font-medium">
          {selectedAnnotation.detailedExplanation}
        </p>
      </CuteCard>

      {/* Tone & Pronunciation Tips if applicable */}
      {selectedAnnotation.toneTips && (
        <CuteCard accentColor="yellow" className="border-zinc-300">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Volume2 size={14} className="text-zinc-700" />
            Pronunciation & Tone Tips
          </h3>
          <p className="text-xs text-zinc-800 font-medium">
            {selectedAnnotation.toneTips}
          </p>
        </CuteCard>
      )}

      {/* Example Sentences */}
      {selectedAnnotation.examples && selectedAnnotation.examples.length > 0 && (
        <CuteCard accentColor="white">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Example Sentences ({selectedAnnotation.examples.length})
          </h3>
          <div className="space-y-2.5">
            {selectedAnnotation.examples.map((ex, idx) => (
              <div
                key={ex.id || idx}
                className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-900 font-sans">{ex.targetText}</span>
                  <AudioPlayer text={ex.targetText} lang={getAudioLangCode(userProfile.targetLanguage)} size="sm" showLabel={false} />
                </div>
                <p className="text-xs font-semibold text-zinc-700 font-mono">{ex.pronunciation}</p>
                <p className="text-xs text-zinc-500 font-medium">{ex.translation}</p>
              </div>
            ))}
          </div>
        </CuteCard>
      )}

      {/* Common Mistakes */}
      {selectedAnnotation.commonMistakes && selectedAnnotation.commonMistakes.length > 0 && (
        <CuteCard accentColor="pink">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertCircle size={14} className="text-zinc-700" />
            Common Mistakes to Avoid
          </h3>
          <ul className="list-disc list-inside text-xs text-zinc-800 font-medium space-y-1">
            {selectedAnnotation.commonMistakes.map((cm, idx) => (
              <li key={idx}>{cm}</li>
            ))}
          </ul>
        </CuteCard>
      )}

      {/* Interactive Mini Check */}
      <CuteCard accentColor="cream">
        <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <HelpCircle size={14} className="text-zinc-700" />
          Quick Practice Check
        </h3>
        <p className="text-xs font-medium text-zinc-800 mb-3">
          What is the primary function of "{selectedAnnotation.targetText}" in your diary entry?
        </p>

        <div className="space-y-1.5">
          {[
            { id: 1, text: selectedAnnotation.meaning, correct: true },
            { id: 2, text: "Express physical counting quantity", correct: false },
            { id: 3, text: "Indicate future planned activity", correct: false }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setQuizAnswered(opt.id)}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                quizAnswered === opt.id
                  ? opt.correct
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-rose-100 border-rose-400 text-rose-900'
                  : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100'
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
