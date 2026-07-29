import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { StorageService } from '../../services/storage';
import { TargetLanguage, ThemePreset } from '../../types';
import { LANGUAGE_META, getLanguageMeta } from '../../utils/languageUtils';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Globe, 
  Palette,
  Bell, 
  Sparkles,
  Heart,
  Moon,
  Sun
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { userProfile, updateUserProfile } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [nativeLanguage, setNativeLanguage] = useState(userProfile.nativeLanguage);
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>(userProfile.targetLanguage);
  const [themeMode, setThemeMode] = useState<ThemePreset>(userProfile.settings?.themeMode || 'light');
  const [showPinyin, setShowPinyin] = useState(userProfile.settings?.showPinyin ?? true);
  const [showLiteral, setShowLiteral] = useState(userProfile.settings?.showLiteral ?? true);
  const [dailyReminder, setDailyReminder] = useState(userProfile.dailyReminder);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableLanguages: TargetLanguage[] = [
    'French',
    'Mandarin Chinese',
    'Spanish',
    'Japanese',
    'Korean',
    'German',
    'Italian',
  ];

  const themeOptions: { id: ThemePreset; name: string; colorBg: string; colorBorder: string; icon: string }[] = [
    { id: 'light', name: 'Clean Light', colorBg: 'bg-zinc-100', colorBorder: 'border-zinc-300', icon: '☀️' },
    { id: 'matcha', name: 'Matcha Zen', colorBg: 'bg-emerald-100', colorBorder: 'border-emerald-300', icon: '🌿' },
    { id: 'sepia', name: 'Sepia Paper', colorBg: 'bg-amber-100', colorBorder: 'border-amber-300', icon: '☕' },
    { id: 'lavender', name: 'Lavender', colorBg: 'bg-purple-100', colorBorder: 'border-purple-300', icon: '🪻' },
    { id: 'dark', name: 'Midnight', colorBg: 'bg-zinc-900 text-white', colorBorder: 'border-zinc-700', icon: '🌙' },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      nativeLanguage,
      targetLanguage,
      dailyReminder,
      settings: {
        ...userProfile.settings,
        themeMode,
        showPinyin,
        showLiteral,
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all local diary entries, saved words, and settings? This action cannot be undone.')) {
      StorageService.clearAllData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 font-sans flex items-center gap-1.5">
            Settings & Preferences
          </h2>
          <p className="text-xs text-zinc-500">Personalize your language space & aesthetic</p>
        </div>
        <Badge variant="purple">
          {getLanguageMeta(userProfile.targetLanguage).nativeName}
        </Badge>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-4">
        {/* Profile Info */}
        <CuteCard accentColor="white">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3 flex items-center gap-1">
            <Globe size={14} className="text-purple-600" />
            Profile & Target Language
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-600 block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-600 block mb-1">Target Language to Learn</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value as TargetLanguage)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-xs font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {availableLanguages.map((langKey) => {
                  const meta = LANGUAGE_META[langKey];
                  return (
                    <option key={langKey} value={langKey}>
                      {meta.flag} {meta.nativeName} ({meta.name})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </CuteCard>

        {/* Theme Customization */}
        <CuteCard accentColor="cream">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Palette size={14} className="text-amber-600" />
            Theme & Appearance
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {themeOptions.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setThemeMode(t.id);
                  updateUserProfile({
                    settings: {
                      ...userProfile.settings,
                      themeMode: t.id
                    }
                  });
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                  t.colorBg
                } ${t.colorBorder} ${
                  themeMode === t.id ? 'ring-2 ring-purple-600 shadow-xs scale-[1.02]' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </div>
                {themeMode === t.id && (
                  <Check size={14} className="text-purple-700 stroke-[3]" />
                )}
              </button>
            ))}
          </div>
        </CuteCard>

        {/* Display Toggles */}
        <CuteCard accentColor="white">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
            Lesson Display Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-zinc-900 block">Show Pinyin / Phonetics</span>
                <span className="text-zinc-500">Show pronunciation guide under target sentences</span>
              </div>
              <input
                type="checkbox"
                checked={showPinyin}
                onChange={(e) => setShowPinyin(e.target.checked)}
                className="w-5 h-5 accent-zinc-900 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
              <div>
                <span className="font-bold text-zinc-900 block">Show Literal Word-for-Word</span>
                <span className="text-zinc-500">Show direct target language word breakdowns</span>
              </div>
              <input
                type="checkbox"
                checked={showLiteral}
                onChange={(e) => setShowLiteral(e.target.checked)}
                className="w-5 h-5 accent-zinc-900 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
              <div>
                <span className="font-bold text-zinc-900 block">Daily Gentle Reminder</span>
                <span className="text-zinc-500">Gentle prompts for daily language journaling</span>
              </div>
              <input
                type="checkbox"
                checked={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.checked)}
                className="w-5 h-5 accent-zinc-900 rounded cursor-pointer"
              />
            </div>
          </div>
        </CuteCard>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-3 bg-zinc-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
        >
          {savedSuccess ? <Check size={16} /> : <SettingsIcon size={16} />}
          <span>{savedSuccess ? 'Preferences Saved ✓' : 'Save All Preferences'}</span>
        </button>
      </form>

      {/* Privacy Note Required by Prompt */}
      <CuteCard accentColor="pink">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-zinc-700" />
          Privacy & Data Protection
        </h3>
        <p className="text-xs text-zinc-800 font-medium leading-relaxed">
          “Your diary is personal. O’Lingua Diary is designed to save your entries locally first. Your memories remain completely private on your device.”
        </p>
      </CuteCard>

      {/* Data Management */}
      <CuteCard accentColor="white">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
          Data Management
        </h3>
        <button
          type="button"
          onClick={handleClearData}
          className="w-full py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw size={14} />
          <span>Clear All Local Data</span>
        </button>
      </CuteCard>
    </div>
  );
};
