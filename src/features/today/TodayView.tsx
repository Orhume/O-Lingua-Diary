import React from 'react';
import { useApp } from '../../context/AppContext';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { getLanguageMeta } from '../../utils/languageUtils';
import { 
  PenTool, 
  Mic, 
  Sparkles, 
  Map, 
  BookOpen, 
  Flame, 
  ChevronRight, 
  Smile, 
  Heart,
  ArrowRight,
  Sun,
  Globe,
  Download
} from 'lucide-react';

export const TodayView: React.FC = () => {
  const { 
    userProfile, 
    setActiveTab, 
    diaryEntries, 
    formerEntries,
    importEntryToCurrentLanguage,
    savedVocabulary, 
    savedGrammar, 
    pathwayModules,
    setCurrentLesson,
    setSelectedModule
  } = useApp();

  const prompts = [
    "What dream did you have last night?",
    "How did you feel when you woke up?",
    "What is one thing you want to do today?",
    "Describe your breakfast or coffee.",
    "What annoyed or challenged you today?",
    "What made you happy or peaceful today?",
    "What are you thinking about right now?"
  ];

  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const timeIcon = currentHour < 18 ? '🌤️' : '🌙';

  // Find current active pathway module
  const nextModule = pathwayModules.find(m => !m.isCompleted) || pathwayModules[0];

  return (
    <div className="space-y-4 pb-20 pt-2 px-4 max-w-md mx-auto">
      {/* Greeting Banner */}
      <CuteCard accentColor="purple" className="relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-white">
          <Sparkles size={120} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              {timeGreeting} {timeIcon}
            </span>
            <Badge variant="pink" size="sm" icon={<Heart size={10} className="fill-zinc-900" />}>
              Level: {userProfile.currentLevel}
            </Badge>
          </div>

          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">
            {userProfile.name}
          </h2>

          <p className="text-xs text-zinc-300 font-medium mt-1">
            Ready to turn today into {userProfile.targetLanguage}?
          </p>

          <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-zinc-400 italic">
              “Your diary becomes your language teacher.”
            </p>
          </div>
        </div>
      </CuteCard>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveTab('diary')}
          className="p-4 rounded-2xl bg-zinc-900 text-white border border-zinc-800 text-left transition-transform active:scale-95 group relative overflow-hidden shadow-xs hover:bg-black"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <PenTool size={20} />
          </div>
          <h3 className="font-bold text-sm font-sans">Write Diary</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">Tell me about your day</p>
        </button>

        <button
          onClick={() => setActiveTab('diary')}
          className="p-4 rounded-2xl bg-white text-zinc-900 border border-zinc-200 text-left transition-transform active:scale-95 group relative overflow-hidden shadow-xs hover:bg-zinc-50"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Mic size={20} />
          </div>
          <h3 className="font-bold text-sm font-sans">Speak Diary</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">Voice recording</p>
        </button>
      </div>

      {/* Today's Prompt Suggestions */}
      <CuteCard accentColor="cream">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-zinc-700" />
            Today's Diary Ideas
          </h3>
          <span className="text-[11px] text-zinc-500 font-medium">Tap to write</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {prompts.map((p, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab('diary')}
              className="flex-shrink-0 w-48 p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
            >
              <p className="text-xs text-zinc-800 font-medium line-clamp-2">"{p}"</p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-900 font-bold">
                <span>Start writing</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </CuteCard>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3">
        <CuteCard 
          onClick={() => setActiveTab('library')}
          accentColor="green" 
          className="flex flex-col justify-between cursor-pointer hover:border-zinc-400 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-zinc-700 uppercase">Vocabulary</span>
            <span className="text-lg">🌱</span>
          </div>
          <div>
            <span className="text-2xl font-black text-zinc-900 font-sans">
              {savedVocabulary.length}
            </span>
            <p className="text-[11px] text-zinc-500 font-medium">Saved to garden</p>
          </div>
        </CuteCard>

        <CuteCard 
          onClick={() => setActiveTab('library')}
          accentColor="blue" 
          className="flex flex-col justify-between cursor-pointer hover:border-zinc-400 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-zinc-700 uppercase">Grammar</span>
            <span className="text-lg">📚</span>
          </div>
          <div>
            <span className="text-2xl font-black text-zinc-900 font-sans">
              {savedGrammar.length}
            </span>
            <p className="text-[11px] text-zinc-500 font-medium">Notes discovered</p>
          </div>
        </CuteCard>
      </div>

      {/* Continue Pathway Widget */}
      {nextModule && (
        <CuteCard 
          accentColor="yellow" 
          onClick={() => {
            setSelectedModule(nextModule);
            setActiveTab('module-detail');
          }}
          className="border-zinc-300 cursor-pointer hover:border-amber-400 hover:shadow-md hover:bg-amber-50/20 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <Badge variant="amber" icon={<Map size={12} />}>
              {nextModule.stageTitle.split(':')[0]}
            </Badge>
            <span className="text-[10px] font-semibold text-zinc-800 bg-zinc-200/80 px-2 py-0.5 rounded-full">
              Module {nextModule.moduleNumber} of {pathwayModules.length}
            </span>
          </div>

          <h4 className="font-bold text-sm text-zinc-900 font-sans mb-1 group-hover:text-amber-900 transition-colors">
            {nextModule.title}
          </h4>
          <p className="text-xs text-zinc-600 line-clamp-2 mb-3">
            {nextModule.description}
          </p>

          <div
            className="w-full py-2 px-3 bg-zinc-900 group-hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 transition-all"
          >
            <span>Continue Your Pathway</span>
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </CuteCard>
      )}

      {/* Import Former Language Entries Banner */}
      {formerEntries.length > 0 && (
        <CuteCard accentColor="purple" className="border-purple-300 bg-purple-50/70">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Badge variant="purple" size="sm" icon={<Globe size={11} />}>
                  Former Language Memory ({formerEntries.length})
                </Badge>
              </div>
              <h4 className="font-bold text-sm text-purple-950 font-sans flex items-center gap-1.5">
                <Download size={14} className="text-purple-700" />
                <span>Import Entries into {userProfile.targetLanguage}?</span>
              </h4>
              <p className="text-[11px] text-purple-800/80 mt-0.5">
                You have saved diary entries from your previous language roadmap. Import & generate lessons for {userProfile.targetLanguage}!
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {formerEntries.map((e) => {
              const langMeta = getLanguageMeta(e.targetLanguage);
              return (
                <div
                  key={e.id}
                  className="p-2.5 rounded-xl bg-white border border-purple-200 flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-purple-800 mb-0.5">
                      <span>{langMeta.flag}</span>
                      <span>{e.targetLanguage} Entry</span>
                    </div>
                    <p className="text-xs text-zinc-900 font-medium line-clamp-1 italic">
                      "{e.originalText}"
                    </p>
                  </div>
                  <button
                    onClick={() => importEntryToCurrentLanguage(e)}
                    className="px-2.5 py-1.5 bg-purple-900 hover:bg-black text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 shadow-xs active:scale-95"
                  >
                    <Sparkles size={11} />
                    <span>Import into {getLanguageMeta(userProfile.targetLanguage).nativeName}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </CuteCard>
      )}

      {/* Recent Diary Entries */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-zinc-900 font-sans flex items-center gap-1.5">
            <BookOpen size={16} className="text-zinc-900" />
            Your {userProfile.targetLanguage} Diary Journey
          </h3>
          <span className="text-xs text-zinc-500 font-medium">
            {diaryEntries.length} entries
          </span>
        </div>

        {diaryEntries.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={24} />}
            title="No diary entries yet"
            description="Write your first entry today! Your memories will become your personalized language lesson."
            actionLabel="Write First Entry"
            onAction={() => setActiveTab('diary')}
          />
        ) : (
          <div className="space-y-2.5">
            {diaryEntries.slice(0, 3).map((entry) => (
              <CuteCard
                key={entry.id}
                accentColor="white"
                onClick={() => {
                  if (entry.lesson) {
                    setCurrentLesson(entry.lesson);
                    setActiveTab('lesson');
                  }
                }}
                className="hover:border-zinc-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-zinc-400">
                    {new Date(entry.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-md font-medium">
                      {entry.mood}
                    </span>
                    {entry.lesson && (
                      <span className="text-[10px] bg-zinc-900 text-white px-1.5 py-0.5 rounded font-bold">
                        Lesson Ready ✨
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-zinc-800 font-medium line-clamp-2 mb-2">
                  "{entry.originalText}"
                </p>

                {entry.lesson && (
                  <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-900 line-clamp-1 font-sans">
                      {entry.lesson.naturalTranslation}
                    </p>
                    <ChevronRight size={14} className="text-zinc-700 flex-shrink-0" />
                  </div>
                )}
              </CuteCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
