import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Annotation, VocabularyItem, GrammarPoint } from '../../types';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { getLanguageMeta } from '../../utils/languageUtils';
import { AnnotationBottomSheet } from '../annotation/AnnotationBottomSheet';
import { 
  ArrowLeft, 
  Sparkles, 
  Bookmark, 
  Check, 
  BookOpen, 
  Volume2, 
  HelpCircle, 
  Layers, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

import { enrichLessonTokens, segmentTargetSentence } from '../../services/sentenceExplainer';

export const LessonView: React.FC = () => {
  const { 
    currentLesson, 
    diaryEntries, 
    userProfile,
    setActiveTab, 
    saveVocabulary, 
    saveGrammar, 
    savedVocabulary, 
    savedGrammar
  } = useApp();

  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const [expandedVocabId, setExpandedVocabId] = useState<string | null>(null);
  const [expandedGrammarId, setExpandedGrammarId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [savedAllState, setSavedAllState] = useState<boolean>(false);

  const sourceEntry = diaryEntries.find(e => e.id === currentLesson?.diaryEntryId);
  const targetLang = sourceEntry?.targetLanguage || userProfile.targetLanguage;
  const meta = getLanguageMeta(targetLang);

  const getAudioLang = (langName: string) => {
    switch (langName) {
      case 'French': return 'fr-FR';
      case 'Spanish': return 'es-ES';
      case 'Japanese': return 'ja-JP';
      case 'Korean': return 'ko-KR';
      case 'German': return 'de-DE';
      case 'Italian': return 'it-IT';
      case 'Mandarin Chinese':
      default: return 'zh-CN';
    }
  };

  if (!currentLesson) {
    return (
      <div className="p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-700 mx-auto flex items-center justify-center mb-3">
          <BookOpen size={28} />
        </div>
        <h3 className="text-base font-bold text-slate-800">No active lesson loaded</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">Write a diary entry to generate your custom lesson!</p>
        <button
          onClick={() => setActiveTab('diary')}
          className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-violet-700"
        >
          Write Diary
        </button>
      </div>
    );
  }

  // Generate 100% complete token annotations for every single word & character in the sentence
  const allAnnotations = enrichLessonTokens(currentLesson, targetLang);

  // Tappable token breakdown for target sentence E
  const renderInteractiveSentence = () => {
    return (
      <div className="flex flex-wrap items-center gap-1.5 py-2">
        {allAnnotations.map((ann, idx) => {
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveAnnotation(ann)}
              className="px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-950 font-bold text-base font-sans transition-all border border-violet-200/80 hover:scale-105 active:scale-95 shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-slate-900 font-extrabold">{ann.targetText}</span>
              {ann.meaning && (
                <span className="text-[10px] text-violet-700 font-medium border-l border-violet-200 pl-1.5">
                  {ann.meaning}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const handleSaveAll = () => {
    currentLesson.vocabularyItems.forEach(v => saveVocabulary(v));
    currentLesson.grammarPoints.forEach(g => saveGrammar(g));
    setSavedAllState(true);
  };

  const isVocabSaved = (item: VocabularyItem) => savedVocabulary.some(v => v.targetText === item.targetText);
  const isGrammarSaved = (point: GrammarPoint) => savedGrammar.some(g => g.title === point.title);

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('today')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl transition-colors border border-slate-200"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </button>

        <button
          onClick={handleSaveAll}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
            savedAllState
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-violet-600 text-white shadow-sm hover:bg-violet-700'
          }`}
        >
          {savedAllState ? <Check size={14} /> : <Bookmark size={14} />}
          <span>{savedAllState ? 'Saved All 🌱' : 'Save All Words & Notes'}</span>
        </button>
      </div>

      {/* SECTION A: Original Diary Entry */}
      <CuteCard accentColor="purple">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-violet-200 uppercase tracking-wider">
            A. Original Diary ({sourceEntry?.nativeLanguage || 'English'})
          </span>
          {sourceEntry?.mood && (
            <Badge variant="pink" size="sm">
              Mood: {sourceEntry.mood}
            </Badge>
          )}
        </div>
        <p className="text-xs text-white/90 font-medium italic leading-relaxed">
          "{sourceEntry?.originalText || 'I woke up late today because I slept around 2am.'}"
        </p>
      </CuteCard>

      {/* SECTION B & C & D: Natural Translation & Pronunciation */}
      <CuteCard accentColor="cream" className="border-amber-200/80">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
              B. {meta.lessonTitle}
            </span>
            <h2 className="text-2xl font-black text-amber-950 font-sans mt-0.5">
              {currentLesson.naturalTranslation}
            </h2>
          </div>
          <AudioPlayer text={currentLesson.naturalTranslation} lang={getAudioLang(targetLang)} size="md" />
        </div>

        {/* C. Pronunciation */}
        <div className="mt-3 pt-3 border-t border-amber-200/60">
          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-0.5">
            C. {meta.pronunciationLabel}
          </span>
          <p className="text-sm font-bold text-amber-950 leading-snug font-mono">
            {currentLesson.pronunciation.value}
          </p>

          {currentLesson.pronunciation.notes && currentLesson.pronunciation.notes.length > 0 && (
            <div className="mt-2 text-[11px] text-amber-900 bg-amber-100/70 p-2 rounded-xl border border-amber-200/70 space-y-0.5">
              <span className="font-bold text-amber-950">{meta.pronunciationNotesHeader}</span>
              <ul className="list-disc list-inside space-y-0.5">
                {currentLesson.pronunciation.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* D. Literal Translation */}
        <div className="mt-3 pt-3 border-t border-amber-200/60">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
            D. Literal Translation (Word-for-Word)
          </span>
          <p className="text-xs font-semibold text-amber-900 italic">
            "{currentLesson.literalTranslation}"
          </p>
        </div>
      </CuteCard>

      {/* SECTION E: Interactive Target Sentence */}
      <CuteCard accentColor="white">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-violet-600" />
            E. Interactive Sentence Breakdown
          </h3>
          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            100% Explained • Tap Any Word
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-2">
          Every word, character, connector & particle in your sentence is interactive. Tap to inspect:
        </p>

        {renderInteractiveSentence()}
      </CuteCard>

      {/* EXHAUSTIVE WORD & CHARACTER INDEX */}
      <CuteCard accentColor="purple" className="border-violet-200 bg-violet-50/40">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-violet-950 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={14} className="text-violet-700" />
            Exhaustive Word & Character Index ({allAnnotations.length})
          </h3>
          <span className="text-[10px] font-bold text-violet-800">No Word Left Unexplained</span>
        </div>
        <p className="text-[11px] text-violet-800/80 mb-3">
          Full grammatical, phonetic, and contextual breakdown for every single element in your entry sentence:
        </p>

        <div className="space-y-2">
          {allAnnotations.map((ann, idx) => (
            <div
              key={idx}
              onClick={() => setActiveAnnotation(ann)}
              className="p-2.5 rounded-xl bg-white border border-violet-200/90 shadow-2xs hover:border-violet-400 transition-all cursor-pointer flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">{ann.targetText}</span>
                  <span className="text-[11px] font-mono text-violet-700 font-bold">{ann.pronunciation}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-900 font-semibold">
                    {ann.quickExplanation || 'Grammar role'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 truncate">{ann.meaning}</p>
              </div>

              <div className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-1 rounded-lg border border-violet-200 shrink-0">
                Inspect →
              </div>
            </div>
          ))}
        </div>
      </CuteCard>

      {/* SECTION H: Sentence Breakdown */}
      {currentLesson.sentenceBreakdown && currentLesson.sentenceBreakdown.length > 0 && (
        <CuteCard accentColor="blue">
          <h3 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers size={14} className="text-sky-700" />
            H. Sentence Logic Breakdown
          </h3>
          <div className="space-y-2">
            {currentLesson.sentenceBreakdown.map((sb, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-sky-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-sky-950">
                  <span>{sb.chunkText}</span>
                  <span className="text-sky-700 text-[11px] font-mono">{sb.pronunciation}</span>
                </div>
                <p className="text-[11px] text-sky-800 italic">Literal: "{sb.literalMeaning}"</p>
                <p className="text-[11px] text-sky-900 font-medium">{sb.explanation}</p>
              </div>
            ))}
          </div>
        </CuteCard>
      )}

      {/* SECTION F: New Vocabulary Extracted */}
      <CuteCard accentColor="white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={14} className="text-emerald-600" />
            F. Vocabulary from Your Day ({currentLesson.vocabularyItems.length})
          </h3>
        </div>

        <div className="space-y-2.5">
          {currentLesson.vocabularyItems.map((item) => {
            const isSaved = isVocabSaved(item);
            const isExpanded = expandedVocabId === item.id;

            return (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 transition-all hover:bg-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-900 font-sans">
                        {item.targetText}
                      </span>
                      <span className="text-xs font-bold text-violet-700 font-mono">
                        {item.pronunciation}
                      </span>
                      <Badge variant="amber" size="sm">
                        {item.partOfSpeech}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-0.5">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <AudioPlayer text={item.targetText} lang={getAudioLang(targetLang)} size="sm" showLabel={false} />
                    <button
                      onClick={() => saveVocabulary(item)}
                      className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSaved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200'
                      }`}
                      title="Save to Vocabulary Garden"
                    >
                      {isSaved ? <Check size={14} /> : <Bookmark size={14} />}
                    </button>
                  </div>
                </div>

                {/* Examples section expander */}
                {item.examples && item.examples.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setExpandedVocabId(isExpanded ? null : item.id)}
                      className="text-[11px] font-bold text-violet-700 flex items-center gap-1 hover:underline"
                    >
                      <span>{isExpanded ? 'Hide examples' : `View ${item.examples.length} examples`}</span>
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 space-y-2">
                        {item.examples.map((ex, exIdx) => (
                          <div key={ex.id || exIdx} className="p-2 rounded-lg bg-white border border-slate-200 text-xs">
                            <p className="font-bold text-slate-900">{ex.targetText}</p>
                            <p className="text-[11px] text-violet-700 font-medium font-mono">{ex.pronunciation}</p>
                            <p className="text-[11px] text-slate-500">{ex.translation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CuteCard>

      {/* SECTION G: Grammar Points */}
      <CuteCard accentColor="white">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-600" />
          G. Tiny Grammar Discoveries ({currentLesson.grammarPoints.length})
        </h3>

        <div className="space-y-3">
          {currentLesson.grammarPoints.map((point) => {
            const isSaved = isGrammarSaved(point);
            const isExpanded = expandedGrammarId === point.id;

            return (
              <div
                key={point.id}
                className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/50 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 font-sans">
                      {point.title}
                    </h4>
                    <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md inline-block mt-1 font-mono border border-amber-200/60">
                      Formula: {point.structure}
                    </span>
                  </div>

                  <button
                    onClick={() => saveGrammar(point)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isSaved
                        ? 'bg-amber-800 text-white'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                    }`}
                  >
                    {isSaved ? <Check size={13} /> : <Bookmark size={13} />}
                    <span>{isSaved ? 'Saved' : 'Save Note'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {point.shortExplanation}
                </p>

                <button
                  type="button"
                  onClick={() => setExpandedGrammarId(isExpanded ? null : point.id)}
                  className="text-[11px] font-bold text-amber-900 flex items-center gap-1 hover:underline"
                >
                  <span>{isExpanded ? 'Less detail' : 'Read detailed explanation & examples'}</span>
                  {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>

                {isExpanded && (
                  <div className="pt-2 border-t border-amber-200/60 space-y-2 text-xs">
                    <p className="text-slate-600 font-medium">{point.detailedExplanation}</p>

                    {point.examples && point.examples.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        <span className="font-bold text-slate-900 text-[11px]">Grammar Examples:</span>
                        {point.examples.map((ex, exIdx) => (
                          <div key={ex.id || exIdx} className="p-2 bg-white rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-900">{ex.targetText}</p>
                            <p className="text-[11px] text-violet-700 font-mono">{ex.pronunciation}</p>
                            <p className="text-[11px] text-slate-500">{ex.translation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CuteCard>

      {/* SECTION J: Mini Review Quiz */}
      {currentLesson.miniQuiz && currentLesson.miniQuiz.length > 0 && (
        <CuteCard accentColor="cream">
          <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <HelpCircle size={14} className="text-amber-700" />
            J. Today's Tiny Lesson Quiz ({currentLesson.miniQuiz.length} questions)
          </h3>

          <div className="space-y-4">
            {currentLesson.miniQuiz.map((q, qIdx) => (
              <div key={q.id || qIdx} className="p-3 bg-white rounded-xl border border-amber-200 text-xs">
                <p className="font-bold text-slate-900 mb-2">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="space-y-1.5">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[q.id] === opt;
                    const isCorrect = opt === q.correctAnswer;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt })}
                        className={`w-full p-2.5 rounded-xl text-left font-medium transition-all ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-400'
                              : 'bg-rose-100 text-rose-950 font-bold border border-rose-400'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {opt}
                        {isSelected && (
                          <span className="float-right text-[11px]">
                            {isCorrect ? '✓ Correct' : '✗ Try again'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizAnswers[q.id] && (
                  <p className="mt-2 text-[11px] text-slate-600 italic bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CuteCard>
      )}

      {/* Interactive Bottom Sheet for Token Annotations */}
      <AnnotationBottomSheet
        annotation={activeAnnotation}
        onClose={() => setActiveAnnotation(null)}
      />
    </div>
  );
};

