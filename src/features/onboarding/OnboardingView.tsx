import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, TargetLanguage, LanguageLevel, UserGoal } from '../../types';
import { CuteCard } from '../../components/common/CuteCard';
import { Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { completeOnboarding, userProfile } = useApp();

  const [name, setName] = useState(userProfile.name || 'Rume');
  const [nativeLanguage, setNativeLanguage] = useState(userProfile.nativeLanguage || 'English');
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>('Mandarin Chinese');
  const [currentLevel, setCurrentLevel] = useState<LanguageLevel>('Beginner');
  const [goal, setGoal] = useState<UserGoal>('Daily conversation');
  const [preferredStyle, setPreferredStyle] = useState('Storytelling & Journaling');
  const [dailyReminder, setDailyReminder] = useState(true);

  const targetLanguages: TargetLanguage[] = [
    'Mandarin Chinese',
    'French',
    'Spanish',
    'Korean',
    'Japanese',
    'German',
    'Italian',
  ];

  const levels: LanguageLevel[] = [
    'Complete beginner',
    'Beginner',
    'Lower intermediate',
    'Intermediate',
    'Upper intermediate',
    'Advanced',
  ];

  const goals: UserGoal[] = [
    'Speak naturally',
    'Build vocabulary',
    'Improve grammar',
    'Prepare for exams',
    'Travel',
    'Daily conversation',
    'Read and write',
    'All-round fluency',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      ...userProfile,
      name: name.trim() || 'Rume',
      nativeLanguage,
      targetLanguage,
      currentLevel,
      goal,
      preferredStyle,
      dailyReminder,
    };
    completeOnboarding(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 text-white mx-auto flex items-center justify-center shadow-md mb-3">
            <Sparkles size={32} />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 font-sans tracking-tight">
            Welcome to O'Lingua Diary
          </h1>
          <p className="text-sm font-medium text-zinc-600 mt-1 max-w-xs mx-auto">
            “Your diary becomes your language teacher.”
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CuteCard accentColor="white">
            <h2 className="text-sm font-bold text-zinc-900 mb-3 flex items-center gap-1.5">
              <Heart size={16} className="text-zinc-900 fill-zinc-900" />
              1. What should we call you?
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or nickname..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 font-medium"
              required
            />
          </CuteCard>

          <CuteCard accentColor="white">
            <h2 className="text-sm font-bold text-zinc-900 mb-3">
              2. Languages & Goal
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-600 mb-1 block">
                  Native Language
                </label>
                <input
                  type="text"
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-zinc-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600 mb-1 block">
                  Target Language to Learn
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {targetLanguages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setTargetLanguage(lang)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between ${
                        targetLanguage === lang
                          ? 'bg-zinc-900 text-white shadow-xs'
                          : 'bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span>{lang}</span>
                      {targetLanguage === lang && <CheckCircle2 size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600 mb-1 block">
                  Current Level in {targetLanguage}
                </label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value as LanguageLevel)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-zinc-400"
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600 mb-1 block">
                  Your Primary Learning Goal
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {goals.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        goal === g
                          ? 'bg-zinc-900 text-white font-semibold'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CuteCard>

          <CuteCard accentColor="cream">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-zinc-900">Daily Gentle Reminder</h3>
                <p className="text-[11px] text-zinc-500">Notifications to record your day</p>
              </div>
              <input
                type="checkbox"
                checked={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.checked)}
                className="w-5 h-5 accent-zinc-900 rounded cursor-pointer"
              />
            </div>
          </CuteCard>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-zinc-900 hover:bg-black text-white text-sm font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <span>Start My Learning Journey</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
