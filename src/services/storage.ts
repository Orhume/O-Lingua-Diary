import { UserProfile, DiaryEntry, VocabularyItem, GrammarPoint, LearningPathModule, TargetLanguage } from '../types';
import { getPathwayModulesForLanguage } from '../data/pathways';

const KEYS = {
  USER_PROFILE: 'olingua_user_profile',
  DIARY_ENTRIES: 'olingua_diary_entries',
  SAVED_VOCABULARY: 'olingua_saved_vocabulary',
  SAVED_GRAMMAR: 'olingua_saved_grammar',
  PATHWAY_PROGRESS: 'olingua_pathway_progress',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'user-default',
  name: 'Rume',
  nativeLanguage: 'English',
  targetLanguage: 'Mandarin Chinese',
  learnedLanguages: ['Mandarin Chinese'],
  currentLevel: 'Beginner',
  goal: 'Daily conversation',
  preferredStyle: 'Storytelling & Journaling',
  dailyReminder: true,
  createdAt: new Date().toISOString(),
  settings: {
    showPinyin: true,
    showLiteral: true,
    cuteLevel: 'high',
    themeMode: 'light',
    voiceGender: 'female',
  },
};

export class StorageService {
  public static getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(KEYS.USER_PROFILE);
      if (data) {
        const parsed: UserProfile = JSON.parse(data);
        if (!parsed.learnedLanguages || !Array.isArray(parsed.learnedLanguages)) {
          parsed.learnedLanguages = [parsed.targetLanguage || 'Mandarin Chinese'];
        }
        if (!parsed.learnedLanguages.includes(parsed.targetLanguage)) {
          parsed.learnedLanguages.push(parsed.targetLanguage);
        }
        return parsed;
      }
      return DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  }

  public static saveUserProfile(profile: UserProfile): void {
    try {
      const learned = new Set(profile.learnedLanguages || []);
      if (profile.targetLanguage) {
        learned.add(profile.targetLanguage);
      }
      profile.learnedLanguages = Array.from(learned);
      localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user profile', e);
    }
  }

  public static getDiaryEntries(): DiaryEntry[] {
    try {
      const data = localStorage.getItem(KEYS.DIARY_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  public static saveDiaryEntry(entry: DiaryEntry): void {
    try {
      const entries = this.getDiaryEntries();
      const existingIndex = entries.findIndex(e => e.id === entry.id);
      if (existingIndex >= 0) {
        entries[existingIndex] = entry;
      } else {
        entries.unshift(entry);
      }
      localStorage.setItem(KEYS.DIARY_ENTRIES, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save diary entry', e);
    }
  }

  public static deleteDiaryEntry(entryId: string): void {
    try {
      const entries = this.getDiaryEntries().filter(e => e.id !== entryId);
      localStorage.setItem(KEYS.DIARY_ENTRIES, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to delete diary entry', e);
    }
  }

  public static getSavedVocabulary(): VocabularyItem[] {
    try {
      const data = localStorage.getItem(KEYS.SAVED_VOCABULARY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  public static saveVocabularyItem(item: VocabularyItem): void {
    try {
      const items = this.getSavedVocabulary();
      const existingIndex = items.findIndex(i => i.id === item.id || i.targetText === item.targetText);
      if (existingIndex >= 0) {
        items[existingIndex] = { ...items[existingIndex], ...item, isSaved: true };
      } else {
        items.unshift({ ...item, isSaved: true });
      }
      localStorage.setItem(KEYS.SAVED_VOCABULARY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save vocabulary item', e);
    }
  }

  public static removeVocabularyItem(itemId: string): void {
    try {
      const items = this.getSavedVocabulary().filter(i => i.id !== itemId);
      localStorage.setItem(KEYS.SAVED_VOCABULARY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to remove vocabulary item', e);
    }
  }

  public static updateVocabularyMastery(itemId: string, newLevel: VocabularyItem['masteryLevel']): void {
    try {
      const items = this.getSavedVocabulary();
      const target = items.find(i => i.id === itemId);
      if (target) {
        target.masteryLevel = newLevel;
        target.reviewCount = (target.reviewCount || 0) + 1;
        target.lastReviewedAt = new Date().toISOString();
        localStorage.setItem(KEYS.SAVED_VOCABULARY, JSON.stringify(items));
      }
    } catch (e) {
      console.error('Failed to update vocabulary mastery', e);
    }
  }

  public static getSavedGrammar(): GrammarPoint[] {
    try {
      const data = localStorage.getItem(KEYS.SAVED_GRAMMAR);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  public static saveGrammarPoint(point: GrammarPoint): void {
    try {
      const items = this.getSavedGrammar();
      const existingIndex = items.findIndex(g => g.id === point.id || g.title === point.title);
      if (existingIndex >= 0) {
        items[existingIndex] = { ...items[existingIndex], ...point, isSaved: true };
      } else {
        items.unshift({ ...point, isSaved: true });
      }
      localStorage.setItem(KEYS.SAVED_GRAMMAR, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save grammar point', e);
    }
  }

  public static removeGrammarPoint(pointId: string): void {
    try {
      const items = this.getSavedGrammar().filter(g => g.id !== pointId);
      localStorage.setItem(KEYS.SAVED_GRAMMAR, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to remove grammar point', e);
    }
  }

  public static getPathwayModules(targetLang?: TargetLanguage): LearningPathModule[] {
    try {
      const lang = targetLang || this.getUserProfile().targetLanguage || 'Mandarin Chinese';
      const baseModules = getPathwayModulesForLanguage(lang);
      const data = localStorage.getItem(KEYS.PATHWAY_PROGRESS);
      if (data) {
        const savedProgress: Record<string, { isUnlocked: boolean; isCompleted: boolean }> = JSON.parse(data);
        return baseModules.map(m => {
          if (savedProgress[m.id]) {
            return {
              ...m,
              isUnlocked: savedProgress[m.id].isUnlocked,
              isCompleted: savedProgress[m.id].isCompleted
            };
          }
          return m;
        });
      }
      return baseModules;
    } catch (e) {
      const lang = targetLang || 'Mandarin Chinese';
      return getPathwayModulesForLanguage(lang);
    }
  }

  public static savePathwayProgress(modules: LearningPathModule[]): void {
    try {
      const progressMap: Record<string, { isUnlocked: boolean; isCompleted: boolean }> = {};
      modules.forEach(m => {
        progressMap[m.id] = { isUnlocked: m.isUnlocked, isCompleted: m.isCompleted };
      });
      localStorage.setItem(KEYS.PATHWAY_PROGRESS, JSON.stringify(progressMap));
    } catch (e) {
      console.error('Failed to save pathway progress', e);
    }
  }

  public static clearAllData(): void {
    try {
      localStorage.removeItem(KEYS.USER_PROFILE);
      localStorage.removeItem(KEYS.DIARY_ENTRIES);
      localStorage.removeItem(KEYS.SAVED_VOCABULARY);
      localStorage.removeItem(KEYS.SAVED_GRAMMAR);
      localStorage.removeItem(KEYS.PATHWAY_PROGRESS);
    } catch (e) {
      console.error('Failed to clear data', e);
    }
  }
}
