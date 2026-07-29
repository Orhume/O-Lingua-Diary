import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  DiaryEntry, 
  DiaryLesson, 
  VocabularyItem, 
  GrammarPoint, 
  LearningPathModule, 
  Annotation 
} from '../types';
import { StorageService } from '../services/storage';

export type AppTab = 
  | 'today' 
  | 'diary' 
  | 'pathway' 
  | 'review' 
  | 'library' 
  | 'onboarding' 
  | 'lesson' 
  | 'annotation-detail' 
  | 'vocab-detail' 
  | 'grammar-detail' 
  | 'module-detail' 
  | 'pronunciation' 
  | 'settings';

interface AppContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  diaryEntries: DiaryEntry[];
  allDiaryEntries: DiaryEntry[];
  formerEntries: DiaryEntry[];
  importEntryToCurrentLanguage: (entry: DiaryEntry) => Promise<void>;
  addDiaryEntry: (entry: DiaryEntry) => void;
  deleteDiaryEntry: (id: string) => void;
  currentLesson: DiaryLesson | null;
  setCurrentLesson: (lesson: DiaryLesson | null) => void;
  savedVocabulary: VocabularyItem[];
  saveVocabulary: (item: VocabularyItem) => void;
  removeVocabulary: (id: string) => void;
  updateVocabMastery: (id: string, mastery: VocabularyItem['masteryLevel']) => void;
  savedGrammar: GrammarPoint[];
  saveGrammar: (point: GrammarPoint) => void;
  removeGrammar: (id: string) => void;
  pathwayModules: LearningPathModule[];
  toggleModuleComplete: (moduleId: string) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedAnnotation: Annotation | null;
  setSelectedAnnotation: (annotation: Annotation | null) => void;
  selectedVocab: VocabularyItem | null;
  setSelectedVocab: (vocab: VocabularyItem | null) => void;
  selectedGrammar: GrammarPoint | null;
  setSelectedGrammar: (grammar: GrammarPoint | null) => void;
  selectedModule: LearningPathModule | null;
  setSelectedModule: (module: LearningPathModule | null) => void;
  hasOnboarded: boolean;
  completeOnboarding: (profile: UserProfile) => void;
  generateLessonForEntry: (entry: DiaryEntry) => Promise<DiaryLesson>;
  isLoadingLesson: boolean;
  loadingStepText: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(StorageService.getUserProfile());
  const [rawDiaryEntries, setRawDiaryEntries] = useState<DiaryEntry[]>([]);
  const [rawVocabulary, setRawVocabulary] = useState<VocabularyItem[]>([]);
  const [rawGrammar, setRawGrammar] = useState<GrammarPoint[]>([]);
  const [currentLesson, setCurrentLesson] = useState<DiaryLesson | null>(null);
  const [pathwayModules, setPathwayModules] = useState<LearningPathModule[]>([]);
  const [activeTab, setActiveTab] = useState<AppTab>('today');
  
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);
  const [selectedVocab, setSelectedVocab] = useState<VocabularyItem | null>(null);
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(null);
  const [selectedModule, setSelectedModule] = useState<LearningPathModule | null>(null);

  const [isLoadingLesson, setIsLoadingLesson] = useState<boolean>(false);
  const [loadingStepText, setLoadingStepText] = useState<string>("Reading your diary softly...");

  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);

  // Filtered views based on active target language
  const diaryEntries = rawDiaryEntries.filter(
    e => !e.targetLanguage || e.targetLanguage === userProfile.targetLanguage
  );

  const formerEntries = rawDiaryEntries.filter(
    e => e.targetLanguage && e.targetLanguage !== userProfile.targetLanguage
  );

  const savedVocabulary = rawVocabulary.filter(
    v => !v.targetLanguage || v.targetLanguage === userProfile.targetLanguage
  );

  const savedGrammar = rawGrammar.filter(
    g => !g.targetLanguage || g.targetLanguage === userProfile.targetLanguage
  );

  useEffect(() => {
    // Load initial storage state
    const profile = StorageService.getUserProfile();
    setUserProfile(profile);
    const hasOnb = localStorage.getItem('olingua_onboarded_flag') === 'true';
    setHasOnboarded(hasOnb);

    setRawDiaryEntries(StorageService.getDiaryEntries());
    setRawVocabulary(StorageService.getSavedVocabulary());
    setRawGrammar(StorageService.getSavedGrammar());
    setPathwayModules(StorageService.getPathwayModules(profile.targetLanguage));

    if (!hasOnb) {
      setActiveTab('onboarding');
    }
  }, []);

  const refreshStorageState = () => {
    setRawDiaryEntries(StorageService.getDiaryEntries());
    setRawVocabulary(StorageService.getSavedVocabulary());
    setRawGrammar(StorageService.getSavedGrammar());
  };

  const updateUserProfile = (updatedFields: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...updatedFields };
    StorageService.saveUserProfile(updated);
    const saved = StorageService.getUserProfile();
    setUserProfile(saved);
    if (updatedFields.targetLanguage) {
      setPathwayModules(StorageService.getPathwayModules(updatedFields.targetLanguage));
    }
    refreshStorageState();
  };

  const completeOnboarding = (profile: UserProfile) => {
    StorageService.saveUserProfile(profile);
    const saved = StorageService.getUserProfile();
    setUserProfile(saved);
    setPathwayModules(StorageService.getPathwayModules(saved.targetLanguage));
    localStorage.setItem('olingua_onboarded_flag', 'true');
    setHasOnboarded(true);
    setActiveTab('today');
    refreshStorageState();
  };

  const addDiaryEntry = (entry: DiaryEntry) => {
    StorageService.saveDiaryEntry(entry);
    refreshStorageState();
  };

  const deleteDiaryEntry = (id: string) => {
    StorageService.deleteDiaryEntry(id);
    refreshStorageState();
  };

  const saveVocabulary = (item: VocabularyItem) => {
    StorageService.saveVocabularyItem(item);
    refreshStorageState();
  };

  const removeVocabulary = (id: string) => {
    StorageService.removeVocabularyItem(id);
    refreshStorageState();
  };

  const updateVocabMastery = (id: string, mastery: VocabularyItem['masteryLevel']) => {
    StorageService.updateVocabularyMastery(id, mastery);
    refreshStorageState();
  };

  const saveGrammar = (point: GrammarPoint) => {
    StorageService.saveGrammarPoint(point);
    refreshStorageState();
  };

  const removeGrammar = (id: string) => {
    StorageService.removeGrammarPoint(id);
    refreshStorageState();
  };

  const importEntryToCurrentLanguage = async (formerEntry: DiaryEntry) => {
    const targetLang = userProfile.targetLanguage;
    setIsLoadingLesson(true);
    setLoadingStepText(`Importing memory & translating to ${targetLang}...`);

    try {
      const { MockAIService } = await import('../services/mockAiService');
      const importedEntry: DiaryEntry = {
        id: `entry-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        originalText: formerEntry.originalText,
        nativeLanguage: formerEntry.nativeLanguage || userProfile.nativeLanguage,
        targetLanguage: targetLang,
        mood: formerEntry.mood,
        topicTags: formerEntry.topicTags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const newLesson = await MockAIService.generateDiaryLesson(importedEntry);
      importedEntry.lesson = newLesson;

      // Save to storage
      StorageService.saveDiaryEntry(importedEntry);

      if (newLesson.vocabularyItems) {
        newLesson.vocabularyItems.forEach(v => {
          StorageService.saveVocabularyItem({ ...v, targetLanguage: targetLang });
        });
      }
      if (newLesson.grammarPoints) {
        newLesson.grammarPoints.forEach(g => {
          StorageService.saveGrammarPoint({ ...g, targetLanguage: targetLang });
        });
      }

      refreshStorageState();
      setCurrentLesson(newLesson);
      setIsLoadingLesson(false);
      setActiveTab('lesson');
    } catch (err) {
      console.error('Failed to import entry into current language:', err);
      setIsLoadingLesson(false);
    }
  };

  const toggleModuleComplete = (moduleId: string) => {
    const updated = pathwayModules.map(m => {
      if (m.id === moduleId) {
        return { ...m, isCompleted: !m.isCompleted };
      }
      return m;
    });
    setPathwayModules(updated);
    StorageService.savePathwayProgress(updated);
  };

  const generateLessonForEntry = async (entry: DiaryEntry): Promise<DiaryLesson> => {
    setIsLoadingLesson(true);
    setLoadingStepText("Reading your diary softly...");

    const stepTimer1 = setTimeout(() => {
      setLoadingStepText("Finding new words from your day...");
    }, 600);

    const stepTimer2 = setTimeout(() => {
      setLoadingStepText("Preparing your pronunciation...");
    }, 1200);

    try {
      const response = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry }),
      });

      const data = await response.json();
      const lesson: DiaryLesson = data.lesson;

      // Update diary entry with generated lesson
      const updatedEntry = { ...entry, lesson };
      addDiaryEntry(updatedEntry);

      setCurrentLesson(lesson);
      setIsLoadingLesson(false);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      return lesson;
    } catch (e) {
      console.error("Failed to generate lesson via API, using MockAIService fallback", e);
      // Fallback
      const { MockAIService } = await import('../services/mockAiService');
      const lesson = await MockAIService.generateDiaryLesson(entry);
      const updatedEntry = { ...entry, lesson };
      addDiaryEntry(updatedEntry);
      setCurrentLesson(lesson);
      setIsLoadingLesson(false);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      return lesson;
    }
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        diaryEntries,
        allDiaryEntries: rawDiaryEntries,
        formerEntries,
        importEntryToCurrentLanguage,
        addDiaryEntry,
        deleteDiaryEntry,
        currentLesson,
        setCurrentLesson,
        savedVocabulary,
        saveVocabulary,
        removeVocabulary,
        updateVocabMastery,
        savedGrammar,
        saveGrammar,
        removeGrammar,
        pathwayModules,
        toggleModuleComplete,
        activeTab,
        setActiveTab,
        selectedAnnotation,
        setSelectedAnnotation,
        selectedVocab,
        setSelectedVocab,
        selectedGrammar,
        setSelectedGrammar,
        selectedModule,
        setSelectedModule,
        hasOnboarded,
        completeOnboarding,
        generateLessonForEntry,
        isLoadingLesson,
        loadingStepText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
