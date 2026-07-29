import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { OnboardingView } from './features/onboarding/OnboardingView';
import { TodayView } from './features/today/TodayView';
import { NewDiaryView } from './features/diary/NewDiaryView';
import { LessonView } from './features/lesson/LessonView';
import { AnnotationDetailPage } from './features/annotation/AnnotationDetailPage';
import { LibraryCombinedView } from './features/library/LibraryCombinedView';
import { VocabularyDetailPage } from './features/vocabulary/VocabularyDetailPage';
import { GrammarDetailPage } from './features/grammar/GrammarDetailPage';
import { LearningPathwayView } from './features/pathway/LearningPathwayView';
import { ModuleDetailPage } from './features/pathway/ModuleDetailPage';
import { ReviewRoomView } from './features/review/ReviewRoomView';
import { PronunciationPracticeView } from './features/pronunciation/PronunciationPracticeView';
import { SettingsView } from './features/settings/SettingsView';

const MainContent: React.FC = () => {
  const { activeTab, userProfile } = useApp();

  if (activeTab === 'onboarding') {
    return <OnboardingView />;
  }

  const themeMode = userProfile?.settings?.themeMode || 'light';

  const getThemeBgClass = () => {
    switch (themeMode) {
      case 'matcha':
        return 'bg-emerald-50/60 text-emerald-950 selection:bg-emerald-200';
      case 'sepia':
        return 'bg-[#fbf7ee] text-[#433422] selection:bg-amber-200';
      case 'lavender':
        return 'bg-purple-50/70 text-purple-950 selection:bg-purple-200';
      case 'dark':
        return 'bg-zinc-950 text-zinc-100 selection:bg-zinc-800';
      case 'light':
      default:
        return 'bg-[#F8F7F4] text-[#1C1C1C] selection:bg-purple-200';
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${getThemeBgClass()}`}>
      <Header />
      
      <main className="max-w-md mx-auto pt-1 sm:pt-2">
        {activeTab === 'today' && <TodayView />}
        {activeTab === 'diary' && <NewDiaryView />}
        {activeTab === 'lesson' && <LessonView />}
        {activeTab === 'annotation-detail' && <AnnotationDetailPage />}
        {activeTab === 'library' && <LibraryCombinedView />}
        {activeTab === 'vocab-detail' && <VocabularyDetailPage />}
        {activeTab === 'grammar-detail' && <GrammarDetailPage />}
        {activeTab === 'pathway' && <LearningPathwayView />}
        {activeTab === 'module-detail' && <ModuleDetailPage />}
        {activeTab === 'review' && <ReviewRoomView />}
        {activeTab === 'pronunciation' && <PronunciationPracticeView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
