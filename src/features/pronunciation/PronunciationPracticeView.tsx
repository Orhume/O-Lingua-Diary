import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { getLanguageMeta } from '../../utils/languageUtils';
import { Volume2, Mic, MicOff, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const PronunciationPracticeView: React.FC = () => {
  const { currentLesson, diaryEntries, userProfile, setActiveTab } = useApp();

  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; text: string } | null>(null);

  const sourceEntry = diaryEntries.find(e => e.id === currentLesson?.diaryEntryId);
  const targetLang = sourceEntry?.targetLanguage || userProfile.targetLanguage;
  const meta = getLanguageMeta(targetLang);

  const sampleSentence = currentLesson?.naturalTranslation || 'Sample practice sentence';
  const samplePronunciation = currentLesson?.pronunciation?.value || meta.pronunciationSystemName;

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

  const handleRecordPractice = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setFeedback(null);

    // Simulate voice recording & tone/phonetic match feedback
    setTimeout(() => {
      setIsRecording(false);
      setFeedback({
        score: 97,
        text: `Excellent accent & rhythm match for ${targetLang}! Your stress and cadence sounded crisp and natural.`
      });
    }, 2200);
  };

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('lesson')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl transition-colors border border-slate-200"
        >
          <ArrowLeft size={16} />
          <span>Back to Lesson</span>
        </button>

        <Badge variant="amber" icon={<Volume2 size={12} />}>
          Pronunciation Lab
        </Badge>
      </div>

      {/* Target Practice Sentence */}
      <CuteCard accentColor="cream" className="border-amber-200 text-center py-6">
        <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
          {targetLang} Practice Sentence
        </span>
        <h2 className="text-2xl font-black text-amber-950 font-sans mb-1">
          {sampleSentence}
        </h2>
        <p className="text-sm font-bold text-amber-900 font-mono mb-4">
          {samplePronunciation}
        </p>

        <div className="flex justify-center">
          <AudioPlayer text={sampleSentence} lang={getAudioLang(targetLang)} size="lg" label="Listen to Native Speaker" />
        </div>
      </CuteCard>

      {/* Syllable / Phonetic Breakdown Notes */}
      <CuteCard accentColor="white">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          {meta.pronunciationLabel} Breakdown
        </h3>

        {currentLesson?.pronunciation?.notes && currentLesson.pronunciation.notes.length > 0 ? (
          <div className="space-y-2">
            {currentLesson.pronunciation.notes.map((note, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-violet-50/70 border border-violet-200 text-xs font-medium text-violet-950">
                • {note}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            Focus on smooth vowel connections and natural stress rhythm.
          </p>
        )}
      </CuteCard>

      {/* Interactive Recording Section */}
      <CuteCard accentColor="purple" className="border-violet-800 text-center py-6">
        <span className="text-xs font-bold text-violet-200 uppercase tracking-wider block mb-2">
          Voice Speech Analyzer
        </span>

        <p className="text-xs text-violet-100 max-w-xs mx-auto mb-4">
          Speak your entry sentence out loud to test tone accuracy and rhythm match.
        </p>

        <button
          onClick={handleRecordPractice}
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-lg transition-all ${
            isRecording
              ? 'bg-rose-500 animate-pulse ring-4 ring-rose-200'
              : 'bg-white text-violet-700 hover:scale-105 active:scale-95'
          }`}
        >
          {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
        </button>

        <p className="text-xs font-bold text-white mt-3">
          {isRecording ? 'Listening... Speak now!' : 'Tap mic to start speaking'}
        </p>

        {feedback && (
          <div className="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left space-y-1">
            <div className="flex items-center justify-between text-emerald-300 font-bold text-xs">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={14} /> Score: {feedback.score}% Match!
              </span>
              <Sparkles size={14} />
            </div>
            <p className="text-xs text-white leading-relaxed font-medium">
              {feedback.text}
            </p>
          </div>
        )}
      </CuteCard>
    </div>
  );
};
