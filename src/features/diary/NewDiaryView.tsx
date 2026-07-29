import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DiaryEntry, MoodType, TopicTag, TargetLanguage } from '../../types';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { getLanguageMeta } from '../../utils/languageUtils';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  Smile, 
  Globe, 
  Heart,
  BookOpen,
  Lock,
  ShieldCheck,
  Check
} from 'lucide-react';

export const NewDiaryView: React.FC = () => {
  const { userProfile, generateLessonForEntry, addDiaryEntry, setActiveTab, isLoadingLesson, loadingStepText } = useApp();

  const [originalText, setOriginalText] = useState('');
  const [mood, setMood] = useState<MoodType>('Peaceful');
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>(userProfile.targetLanguage);
  const [isRecording, setIsRecording] = useState(false);
  const [isPrivateEntry, setIsPrivateEntry] = useState(false);
  const [privateSaved, setPrivateSaved] = useState(false);

  const moods: MoodType[] = [
    'Peaceful', 'Happy', 'Grateful', 'Excited', 'Tired', 'Sad', 'Confused'
  ];

  const availableLanguages: TargetLanguage[] = [
    'French', 'Spanish', 'Japanese', 'Mandarin Chinese', 'Korean', 'German', 'Italian'
  ];

  const handleSimulateVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setTimeout(() => {
      setOriginalText((prev) => 
        prev 
          ? prev + " I woke up late today because I slept around 2am."
          : "I woke up late today because I slept around 2am."
      );
      setIsRecording(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalText.trim()) return;

    const newEntry: DiaryEntry = {
      id: `entry-${Date.now()}`,
      originalText: originalText.trim(),
      nativeLanguage: userProfile.nativeLanguage || 'English',
      targetLanguage,
      mood,
      topicTags: [isPrivateEntry ? 'Private reflection' : 'Random thought'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isPrivateEntry) {
      // Save locally with no external lesson generation
      addDiaryEntry(newEntry);
      setPrivateSaved(true);
      setTimeout(() => {
        setPrivateSaved(false);
        setActiveTab('today');
      }, 1200);
      return;
    }

    await generateLessonForEntry(newEntry);
    setActiveTab('lesson');
  };

  const meta = getLanguageMeta(targetLanguage);

  if (isLoadingLesson) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg animate-pulse">
            <Sparkles size={38} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-rose-200 flex items-center justify-center text-rose-500 shadow-xs">
            <Heart size={16} className="fill-rose-500 text-rose-500" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-sans mb-1.5">
          {loadingStepText || `Translating to ${targetLanguage}...`}
        </h3>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Crafting your {targetLanguage} lesson, pronunciation guide, and vocabulary breakdown...
        </p>

        <div className="w-48 h-2 bg-slate-200 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 animate-pulse w-3/4 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between py-1">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-sans">Dear Diary...</h2>
          <p className="text-xs text-slate-500">A peaceful space to express your day</p>
        </div>

        {/* Target Language Switcher */}
        <div className="flex items-center gap-1.5 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-xl">
          <Globe size={13} className="text-violet-600" />
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as TargetLanguage)}
            className="bg-transparent text-xs font-bold text-violet-900 focus:outline-none cursor-pointer"
          >
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Distraction-Free Text Input */}
        <CuteCard accentColor="white" className="p-4 shadow-sm border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} className="text-violet-600" />
              Your Entry ({userProfile.nativeLanguage || 'English'})
            </label>
            <button
              type="button"
              onClick={handleSimulateVoice}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200'
              }`}
            >
              {isRecording ? <MicOff size={13} /> : <Mic size={13} />}
              <span>{isRecording ? 'Listening...' : 'Dictate'}</span>
            </button>
          </div>

          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Write freely... e.g. 'I woke up late today because I slept around 2am.' or 'Today I drank a hot coffee and met a friend.'"
            rows={6}
            className="w-full p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:bg-white font-medium placeholder:text-slate-400 leading-relaxed resize-none transition-all"
            required
          />

          {/* Quick Starter Helper */}
          {!originalText && (
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] text-slate-400 whitespace-nowrap font-medium">Quick start:</span>
              <button
                type="button"
                onClick={() => setOriginalText("I woke up late today because I slept around 2am.")}
                className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium whitespace-nowrap hover:bg-amber-100 transition-colors"
              >
                "I woke up late today..."
              </button>
              <button
                type="button"
                onClick={() => setOriginalText("This morning I had a hot coffee and read my favorite book.")}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium whitespace-nowrap hover:bg-emerald-100 transition-colors"
              >
                "Hot coffee morning..."
              </button>
            </div>
          )}
        </CuteCard>

        {/* Soothing Mood Selection */}
        <CuteCard accentColor="cream" className="p-3.5 border-amber-200/60">
          <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Smile size={14} className="text-amber-700" />
            Mood of the day
          </label>
          <div className="flex flex-wrap gap-1.5">
            {moods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  mood === m
                    ? 'bg-amber-900 text-white shadow-xs scale-105'
                    : 'bg-white border border-amber-200 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </CuteCard>

        {/* Sleek Private Entry Toggle Pill with Smooth Hover Explanation */}
        <div className="flex items-center justify-between pt-1">
          <div className="relative group flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPrivateEntry(!isPrivateEntry)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                isPrivateEntry
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-zinc-900'
              }`}
            >
              <Lock size={12} className={isPrivateEntry ? 'text-amber-400' : 'text-zinc-400'} />
              <span>{isPrivateEntry ? 'Private (On-Device)' : 'Keep Private'}</span>
            </button>

            {/* Subtle Hover Tooltip / Smooth Note */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute bottom-full mb-2 left-0 z-20 w-64 p-2.5 rounded-xl bg-zinc-900 text-zinc-100 text-[11px] shadow-lg border border-zinc-700 leading-snug">
              <div className="flex items-center gap-1 font-bold text-amber-300 mb-0.5">
                <ShieldCheck size={12} />
                <span>On-Device Privacy Guard</span>
              </div>
              <span>
                Saves strictly to your browser local storage. No text sent to cloud AI or lesson generators.
              </span>
              <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-zinc-900" />
            </div>
          </div>

          <span className="text-[11px] text-zinc-400 italic">
            {isPrivateEntry ? '🔒 Saved locally • No AI calls' : '✨ AI Lesson will be generated'}
          </span>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={!originalText.trim()}
          className={`w-full py-3.5 px-4 font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 ${
            privateSaved
              ? 'bg-emerald-600 text-white'
              : isPrivateEntry
              ? 'bg-zinc-900 hover:bg-black text-white'
              : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white'
          } disabled:opacity-50`}
        >
          {privateSaved ? (
            <>
              <Check size={18} />
              <span>Saved Privately to Local Diary ✓</span>
            </>
          ) : isPrivateEntry ? (
            <>
              <Lock size={16} />
              <span>Save Private Entry (On-Device Only)</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Transform into {meta.flag} {targetLanguage} Lesson</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
