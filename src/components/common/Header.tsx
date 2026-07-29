import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetLanguage } from '../../types';
import { LANGUAGE_META, getLanguageMeta } from '../../utils/languageUtils';
import { BookOpen, Sparkles, Settings as SettingsIcon, Flame, WifiOff, Globe, Check, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { userProfile, updateUserProfile, setActiveTab, diaryEntries } = useApp();
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simple streak calculation based on entries
  const streak = Math.max(1, diaryEntries.length);
  const currentMeta = getLanguageMeta(userProfile.targetLanguage);

  const availableLanguages: TargetLanguage[] = [
    'French',
    'Mandarin Chinese',
    'Spanish',
    'Japanese',
    'Korean',
    'German',
    'Italian',
  ];

  const handleSelectLanguage = (lang: TargetLanguage) => {
    updateUserProfile({ targetLanguage: lang });
    setShowLanguageModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div 
              onClick={() => setActiveTab('today')}
              className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-xs hover:scale-105 transition-transform cursor-pointer"
            >
              <BookOpen size={18} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 
                  onClick={() => setActiveTab('today')}
                  className="font-bold text-zinc-900 text-base tracking-tight font-sans cursor-pointer hover:text-purple-900 transition-colors"
                >
                  O'Lingua Diary
                </h1>
                
                {/* Clickable Language Tag */}
                <button
                  onClick={() => setShowLanguageModal(true)}
                  className="group flex items-center gap-1 text-[11px] bg-purple-100 hover:bg-purple-200 border border-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded-full transition-all active:scale-95 shadow-2xs"
                  title="Click to switch target language"
                >
                  <span>{currentMeta.flag}</span>
                  <span>{currentMeta.nativeName}</span>
                  <Globe size={11} className="text-purple-600 group-hover:rotate-45 transition-transform" />
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 font-medium">Your diary is your teacher</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isOnline ? (
              <div 
                title="You are currently offline. AI lesson generation requires an active internet connection."
                className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-1 rounded-full text-[11px] font-bold animate-pulse"
              >
                <WifiOff size={13} className="text-amber-600" />
                <span>Offline</span>
              </div>
            ) : (
              <div 
                title="Online & Ready for AI Lessons"
                className="hidden sm:flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Online</span>
              </div>
            )}

            {/* Total Target Words Written Badge */}
            <div 
              title="Total Output Words Written in Target Language"
              className="flex items-center gap-1 bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full text-xs font-bold border border-purple-200"
            >
              <Sparkles size={13} className="text-purple-700" />
              <span>
                {diaryEntries.reduce((acc, curr) => acc + curr.originalText.trim().split(/\s+/).length, 0)} words
              </span>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 flex items-center justify-center transition-colors"
              title="Settings"
            >
              <SettingsIcon size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Language Switcher Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-zinc-200 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <div>
                <h3 className="text-base font-bold text-zinc-900 font-display flex items-center gap-1.5">
                  <Globe size={18} className="text-purple-600" />
                  Other Languages to Learn 🌍
                </h3>
                <p className="text-xs text-zinc-500">Select your target language roadmap</p>
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {availableLanguages.map((langKey) => {
                const meta = LANGUAGE_META[langKey];
                const isSelected = userProfile.targetLanguage === langKey;
                const hasLearnedBefore = userProfile.learnedLanguages?.includes(langKey);

                return (
                  <div
                    key={langKey}
                    onClick={() => handleSelectLanguage(langKey)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 shadow-xs ring-1 ring-purple-500/20'
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{meta.flag}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-sm text-zinc-900 font-sans">
                            {meta.nativeName}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-medium">
                            ({meta.name})
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                          {meta.description}
                        </p>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center gap-1 shrink-0 shadow-xs">
                        <Check size={12} className="stroke-[3]" />
                        <span>Active</span>
                      </span>
                    ) : hasLearnedBefore ? (
                      <span className="px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs border border-purple-200 shrink-0 transition-colors">
                        Switch
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs shrink-0 transition-colors shadow-2xs">
                        Start Learning
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full py-2.5 bg-zinc-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
