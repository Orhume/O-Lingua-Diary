import { TargetLanguage } from '../types';

export interface LanguageMeta {
  name: TargetLanguage;
  nativeName: string;
  flag: string;
  lessonTitle: string;
  pronunciationLabel: string;
  pronunciationSystemName: string;
  pronunciationNotesHeader: string;
  exampleSentenceHeader: string;
  description: string;
}

export const LANGUAGE_META: Record<TargetLanguage, LanguageMeta> = {
  'Mandarin Chinese': {
    name: 'Mandarin Chinese',
    nativeName: '中文 (Hànyǔ)',
    flag: '🇨🇳',
    lessonTitle: 'Natural Mandarin Chinese Lesson',
    pronunciationLabel: 'Pinyin Pronunciation',
    pronunciationSystemName: 'Pinyin',
    pronunciationNotesHeader: 'Tone & Pinyin Notes:',
    exampleSentenceHeader: 'Mandarin Examples',
    description: 'Master tones, logographic characters & expressive sentence particles.',
  },
  'French': {
    name: 'French',
    nativeName: 'Le Français',
    flag: '🇫🇷',
    lessonTitle: 'Natural French Lesson',
    pronunciationLabel: 'French Phonetics & IPA',
    pronunciationSystemName: 'Phonetics',
    pronunciationNotesHeader: 'Liaison & Pronunciation Notes:',
    exampleSentenceHeader: 'French Examples',
    description: 'Flowing liaisons, elegant verb tenses & authentic daily idioms.',
  },
  'Spanish': {
    name: 'Spanish',
    nativeName: 'El Español',
    flag: '🇪🇸',
    lessonTitle: 'Natural Spanish Lesson',
    pronunciationLabel: 'Spanish Phonetics & Intonation',
    pronunciationSystemName: 'Phonetics',
    pronunciationNotesHeader: 'Stress & Accent Notes:',
    exampleSentenceHeader: 'Spanish Examples',
    description: 'Vibrant rhythm, past tense nuances & conversational fluency.',
  },
  'Japanese': {
    name: 'Japanese',
    nativeName: '日本語 (Nihongo)',
    flag: '🇯🇵',
    lessonTitle: 'Natural Japanese Lesson',
    pronunciationLabel: 'Romaji & Reading',
    pronunciationSystemName: 'Romaji',
    pronunciationNotesHeader: 'Pitch Accent & Reading Notes:',
    exampleSentenceHeader: 'Japanese Examples',
    description: 'Hiragana, Katakana, nuances of politeness & particle precision.',
  },
  'Korean': {
    name: 'Korean',
    nativeName: '한국어 (Hangeug-eo)',
    flag: '🇰🇷',
    lessonTitle: 'Natural Korean Lesson',
    pronunciationLabel: 'Revised Romanization & Reading',
    pronunciationSystemName: 'Romanization',
    pronunciationNotesHeader: 'Batchim & Sound Notes:',
    exampleSentenceHeader: 'Korean Examples',
    description: 'Scientific Hangul script, honorifics & natural daily speech.',
  },
  'German': {
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    lessonTitle: 'Natural German Lesson',
    pronunciationLabel: 'German Phonetics & Stress',
    pronunciationSystemName: 'Phonetics',
    pronunciationNotesHeader: 'Compound & Pronunciation Notes:',
    exampleSentenceHeader: 'German Examples',
    description: 'Structured grammar, compound nouns & clear expressive phrasing.',
  },
  'Italian': {
    name: 'Italian',
    nativeName: 'L\'Italiano',
    flag: '🇮🇹',
    lessonTitle: 'Natural Italian Lesson',
    pronunciationLabel: 'Italian Phonetics & Rhythm',
    pronunciationSystemName: 'Phonetics',
    pronunciationNotesHeader: 'Double Consonants & Stress Notes:',
    exampleSentenceHeader: 'Italian Examples',
    description: 'Melodic vowels, expressive gestures & passionate daily expressions.',
  },
};

export function getLanguageMeta(lang?: TargetLanguage): LanguageMeta {
  if (!lang || !LANGUAGE_META[lang]) {
    return LANGUAGE_META['Mandarin Chinese'];
  }
  return LANGUAGE_META[lang];
}

export function getAudioLangCode(langName?: string): string {
  switch (langName) {
    case 'French': return 'fr-FR';
    case 'Spanish': return 'es-ES';
    case 'Japanese': return 'ja-JP';
    case 'Korean': return 'ko-KR';
    case 'German': return 'de-DE';
    case 'Italian': return 'it-IT';
    case 'Mandarin Chinese':
    default: return 'zh-CN';
  }
}

