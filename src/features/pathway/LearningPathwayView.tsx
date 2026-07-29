import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LearningPathModule } from '../../types';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { 
  Map, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const LearningPathwayView: React.FC = () => {
  const { pathwayModules, setSelectedModule, setActiveTab, userProfile } = useApp();
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const stages = [
    { id: 1, title: 'STAGE 1: Sound & Survival' },
    { id: 2, title: 'STAGE 2: Daily Life Vocabulary' },
    { id: 3, title: 'STAGE 3: Core Grammar' },
    { id: 4, title: 'STAGE 4: Diary Expression' },
    { id: 5, title: 'STAGE 5: Conversation Builder' },
    { id: 6, title: 'STAGE 6: Fluency Growth' },
    { id: 7, title: 'STAGE 7: Advanced Expression' },
  ];

  const stageModules = pathwayModules.filter(m => m.stageId === selectedStage);

  const completedCount = pathwayModules.filter(m => m.isCompleted).length;
  const progressPercent = Math.round((completedCount / pathwayModules.length) * 100);

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header & Overall Roadmap Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-800 font-display flex items-center gap-1.5">
            Fluency Pathway 🗺️
          </h2>
          <p className="text-xs text-stone-500">Your step-by-step {userProfile.targetLanguage} roadmap</p>
        </div>
        <Badge variant="purple">
          {completedCount}/{pathwayModules.length} Done
        </Badge>
      </div>

      {/* Progress Bar Card */}
      <CuteCard accentColor="purple" className="border-purple-200">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-purple-900 font-display">
            Overall Pathway Progress
          </span>
          <span className="text-xs font-extrabold text-purple-700">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 bg-purple-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </CuteCard>

      {/* Stage Selector Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {stages.map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedStage(st.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedStage === st.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white border border-amber-200/80 text-stone-700 hover:bg-amber-50'
            }`}
          >
            Stage {st.id}
          </button>
        ))}
      </div>

      {/* Current Stage Title */}
      <div className="bg-amber-100/70 p-3 rounded-2xl border border-amber-200/80">
        <h3 className="text-xs font-extrabold text-amber-950 font-display uppercase tracking-wider">
          {stages.find(s => s.id === selectedStage)?.title}
        </h3>
        <p className="text-[11px] text-amber-900 mt-0.5">
          {stageModules.length} structured modules linking diary grammar directly to lessons.
        </p>
      </div>

      {/* Modules List */}
      <div className="space-y-2.5">
        {stageModules.map((mod) => (
          <CuteCard
            key={mod.id}
            accentColor={mod.isCompleted ? 'green' : mod.isUnlocked ? 'white' : 'cream'}
            onClick={() => {
              setSelectedModule(mod);
              setActiveTab('module-detail');
            }}
            className={`hover:border-purple-300 transition-colors cursor-pointer ${
              !mod.isUnlocked ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  mod.isCompleted
                    ? 'bg-emerald-500 text-white'
                    : mod.isUnlocked
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {mod.isCompleted ? <CheckCircle2 size={16} /> : mod.isUnlocked ? mod.moduleNumber : <Lock size={14} />}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-stone-900 font-display">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-0.5">
                    {mod.description}
                  </p>

                  {mod.linkedGrammarTitles && mod.linkedGrammarTitles.length > 0 && (
                    <div className="mt-2 text-[10px] bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded-md inline-flex items-center gap-1 border border-purple-100">
                      <Sparkles size={10} />
                      <span>Used in your diary!</span>
                    </div>
                  )}
                </div>
              </div>

              <ChevronRight size={18} className="text-stone-400 flex-shrink-0 mt-1" />
            </div>
          </CuteCard>
        ))}
      </div>
    </div>
  );
};
