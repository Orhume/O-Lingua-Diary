export type TargetLanguage = 
  | 'Mandarin Chinese' 
  | 'French' 
  | 'Spanish' 
  | 'Korean' 
  | 'Japanese' 
  | 'German' 
  | 'Italian';

export type LanguageLevel = 
  | 'Complete beginner' 
  | 'Beginner' 
  | 'Lower intermediate' 
  | 'Intermediate' 
  | 'Upper intermediate' 
  | 'Advanced';

export type UserGoal = 
  | 'Speak naturally' 
  | 'Build vocabulary' 
  | 'Improve grammar' 
  | 'Prepare for exams' 
  | 'Travel' 
  | 'Daily conversation' 
  | 'Read and write' 
  | 'All-round fluency';

export type MoodType = 
  | 'Happy' 
  | 'Tired' 
  | 'Sad' 
  | 'Excited' 
  | 'Confused' 
  | 'Angry' 
  | 'Peaceful' 
  | 'Anxious' 
  | 'Grateful';

export type TopicTag = 
  | 'Dream' 
  | 'School' 
  | 'Work' 
  | 'Family' 
  | 'Food' 
  | 'Travel' 
  | 'Love' 
  | 'Friendship' 
  | 'Health' 
  | 'Random thought';

export type MasteryLevel = 
  | 'New seed' 
  | 'Sprouting' 
  | 'Growing' 
  | 'Strong' 
  | 'Mastered';

export type ThemePreset = 'light' | 'matcha' | 'dark' | 'sepia' | 'lavender';

export interface UserProfile {
  id: string;
  name: string;
  nativeLanguage: string;
  targetLanguage: TargetLanguage;
  learnedLanguages?: TargetLanguage[];
  currentLevel: LanguageLevel;
  goal: UserGoal;
  preferredStyle: string;
  dailyReminder: boolean;
  createdAt: string;
  settings: {
    showPinyin: boolean;
    showLiteral: boolean;
    cuteLevel: 'high' | 'medium' | 'minimal';
    themeMode: ThemePreset;
    voiceGender: 'female' | 'male';
  };
}

export interface ExampleSentence {
  id: string;
  targetText: string;
  pronunciation: string;
  translation: string;
  notes?: string;
}

export interface VocabularyItem {
  id: string;
  targetText: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  grammarRole: string;
  difficulty: LanguageLevel | string;
  examples: ExampleSentence[];
  sourceDiaryEntryId?: string;
  sourceSentence?: string;
  targetLanguage: TargetLanguage;
  isSaved: boolean;
  masteryLevel: MasteryLevel;
  reviewCount: number;
  lastReviewedAt?: string;
  createdAt: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  structure: string;
  shortExplanation: string;
  detailedExplanation: string;
  examples: ExampleSentence[];
  commonMistakes: string[];
  sourceDiaryEntryId?: string;
  targetLanguage: TargetLanguage;
  difficulty: LanguageLevel | string;
  isSaved: boolean;
  relatedModuleId?: string;
  createdAt: string;
}

export interface Annotation {
  id: string;
  targetText: string;
  annotationType: 'vocabulary' | 'grammar' | 'pronunciation' | 'structure' | 'cultural' | 'tone';
  startIndex: number;
  endIndex: number;
  pronunciation: string;
  meaning: string;
  quickExplanation: string;
  detailedExplanation: string;
  examples: ExampleSentence[];
  relatedVocabularyIds?: string[];
  relatedGrammarIds?: string[];
  sourceDiaryEntryId?: string;
  toneTips?: string;
  commonMistakes?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  type: 'multipleChoice' | 'fillInBlank' | 'wordMeaning' | 'grammarChoice';
}

export interface SentenceBreakdownItem {
  chunkText: string;
  pronunciation: string;
  literalMeaning: string;
  explanation: string;
}

export interface DiaryLesson {
  id: string;
  diaryEntryId: string;
  naturalTranslation: string;
  pronunciation: {
    system: string; // e.g., 'pinyin'
    value: string;
    notes: string[];
  };
  literalTranslation: string;
  sentenceBreakdown: SentenceBreakdownItem[];
  vocabularyItems: VocabularyItem[];
  grammarPoints: GrammarPoint[];
  annotations: Annotation[];
  miniQuiz: QuizQuestion[];
  createdAt: string;
}

export interface DiaryEntry {
  id: string;
  originalText: string;
  nativeLanguage: string;
  targetLanguage: TargetLanguage;
  mood: MoodType;
  topicTags: TopicTag[];
  createdAt: string;
  updatedAt: string;
  lesson?: DiaryLesson;
}

export interface LearningPathModule {
  id: string;
  stageId: number;
  stageTitle: string;
  moduleNumber: number;
  title: string;
  description: string;
  targetLanguage: TargetLanguage;
  level: LanguageLevel;
  keyConcepts: string[];
  examples: ExampleSentence[];
  linkedGrammarTitles?: string[];
  isUnlocked: boolean;
  isCompleted: boolean;
}
