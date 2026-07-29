import React from 'react';
import { useApp } from '../../context/AppContext';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { getAudioLangCode } from '../../utils/languageUtils';
import { ArrowLeft, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export const ModuleDetailPage: React.FC = () => {
  const { selectedModule, setActiveTab, toggleModuleComplete, userProfile } = useApp();

  if (!selectedModule) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-stone-500">No module selected.</p>
        <button
          onClick={() => setActiveTab('pathway')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
        >
          Go to Pathway
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('pathway')}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-purple-700 bg-stone-100 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Pathway</span>
        </button>

        <button
          onClick={() => toggleModuleComplete(selectedModule.id)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
            selectedModule.isCompleted
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-purple-600 text-white shadow-xs hover:bg-purple-700'
          }`}
        >
          <CheckCircle2 size={14} />
          <span>{selectedModule.isCompleted ? 'Completed ✓' : 'Mark as Complete'}</span>
        </button>
      </div>

      {/* Module Title Card */}
      <CuteCard accentColor="purple" className="border-purple-200">
        <Badge variant="pink" size="sm" className="mb-1">
          Module {selectedModule.moduleNumber} • {selectedModule.level}
        </Badge>
        <h1 className="text-xl font-black text-purple-950 font-display">
          {selectedModule.title}
        </h1>
        <p className="text-xs text-purple-800 mt-1 font-medium">
          {selectedModule.description}
        </p>
      </CuteCard>

      {/* Diary Connection Alert */}
      {selectedModule.linkedGrammarTitles && selectedModule.linkedGrammarTitles.length > 0 && (
        <CuteCard accentColor="yellow" className="border-amber-300">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
            <Sparkles size={14} className="text-amber-600" />
            <span>Connection to Your Life:</span>
          </div>
          <p className="text-xs text-amber-950 font-medium">
            You used "{selectedModule.linkedGrammarTitles[0]}" in your diary! Learning this module solidifies your real memory.
          </p>
        </CuteCard>
      )}

      {/* Key Concepts */}
      <CuteCard accentColor="white">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
          Key Learning Concepts
        </h3>
        <ul className="list-disc list-inside space-y-1 text-xs text-stone-800 font-medium">
          {selectedModule.keyConcepts.map((concept, idx) => (
            <li key={idx}>{concept}</li>
          ))}
        </ul>
      </CuteCard>

      {/* Examples */}
      {selectedModule.examples && selectedModule.examples.length > 0 && (
        <CuteCard accentColor="white">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Module Examples ({selectedModule.examples.length})
          </h3>

          <div className="space-y-2">
            {selectedModule.examples.map((ex, idx) => (
              <div key={ex.id || idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{ex.targetText}</span>
                  <AudioPlayer text={ex.targetText} lang={getAudioLangCode(userProfile.targetLanguage)} size="sm" showLabel={false} />
                </div>
                <p className="text-[11px] font-semibold text-purple-700">{ex.pronunciation}</p>
                <p className="text-[11px] text-stone-600 font-medium">{ex.translation}</p>
              </div>
            ))}
          </div>
        </CuteCard>
      )}

      {/* Action to write diary applying this module */}
      <CuteCard accentColor="cream">
        <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
          Apply in Your Diary
        </h3>
        <p className="text-xs text-stone-600 mb-3 font-medium">
          Write a short diary entry using these new sentence structures to reinforce your memory.
        </p>
        <button
          onClick={() => setActiveTab('diary')}
          className="w-full py-2.5 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
        >
          <BookOpen size={14} />
          <span>Write Diary Entry Now</span>
        </button>
      </CuteCard>
    </div>
  );
};
