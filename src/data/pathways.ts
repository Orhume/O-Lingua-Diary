import { LearningPathModule, TargetLanguage } from '../types';
import { MANDARIN_PATHWAY_MODULES } from './mandarinPathway';
import { FRENCH_PATHWAY_MODULES } from './frenchPathway';

export const SPANISH_PATHWAY_MODULES: LearningPathModule[] = [
  {
    id: 'es-m1',
    stageId: 1,
    stageTitle: 'STAGE 1: Spanish Basics & Pronunciation',
    moduleNumber: 1,
    title: 'Spanish Vowels & Rolled R',
    description: 'Master clean Spanish vowels (A, E, I, O, U), silent H, and soft vs rolled R (pero vs perro).',
    targetLanguage: 'Spanish',
    level: 'A1 Beginner',
    keyConcepts: ['5 pure vowels', 'Silent H (hola)', 'Rolled R (perro)', 'LL and Ñ pronunciation'],
    examples: [
      { id: 'es-ex1-1', targetText: '¡Hola! ¿Cómo estás?', pronunciation: 'oh-lah koh-moh es-tahs', translation: 'Hello! How are you?' },
      { id: 'es-ex1-2', targetText: 'buenos días', pronunciation: 'bway-nohs dee-ahs', translation: 'good morning' },
    ],
    isUnlocked: true,
    isCompleted: true,
  },
  {
    id: 'es-m2',
    stageId: 1,
    stageTitle: 'STAGE 1: Spanish Basics & Pronunciation',
    moduleNumber: 2,
    title: 'Ser vs Estar: The Two "To Be" Verbs',
    description: 'Learn when to use Ser (identity, origin, permanent characteristics) vs Estar (location, mood, temporary state).',
    targetLanguage: 'Spanish',
    level: 'A1 Beginner',
    keyConcepts: ['Ser for identity & characteristics', 'Estar for feelings & location', 'DOCTOR vs PLACE mnemonic'],
    examples: [
      { id: 'es-ex2-1', targetText: 'Estoy cansado/a', pronunciation: 'es-toy kahn-sah-doh', translation: 'I am tired (state)' },
      { id: 'es-ex2-2', targetText: 'Soy estudiante', pronunciation: 'soy es-too-dyahn-tay', translation: 'I am a student (identity)' },
    ],
    isUnlocked: true,
    isCompleted: false,
  },
  {
    id: 'es-m3',
    stageId: 2,
    stageTitle: 'STAGE 2: Nouns, Gender & Present Tense',
    moduleNumber: 3,
    title: 'Masculine & Feminine Nouns',
    description: 'Understand noun gender rules (-o vs -a), pluralization, and adjective agreement.',
    targetLanguage: 'Spanish',
    level: 'A1 Beginner',
    keyConcepts: ['Gender (-o / -a endings)', 'Exceptions (el día, la mano)', 'Adjective gender & number agreement'],
    examples: [
      { id: 'es-ex3-1', targetText: 'un día bonito', pronunciation: 'oon dee-ah boh-nee-toh', translation: 'a pretty day' },
      { id: 'es-ex3-2', targetText: 'una buena tarde', pronunciation: 'oo-nah bway-nah tar-day', translation: 'a good afternoon' },
    ],
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: 'es-m4',
    stageId: 2,
    stageTitle: 'STAGE 2: Nouns, Gender & Present Tense',
    moduleNumber: 4,
    title: 'Present Tense (-ar, -er, -ir)',
    description: 'Conjugate regular present tense verbs and common boot verbs (e→ie, o→ue).',
    targetLanguage: 'Spanish',
    level: 'A1 Beginner',
    keyConcepts: ['Regular endings (-o, -as, -a, -amos, -an)', 'Stem-changing verbs (quiero, puedo)', 'Yo-irregular verbs (tengo, hago)'],
    examples: [
      { id: 'es-ex4-1', targetText: 'Me despierto a las 7', pronunciation: 'may des-pyair-toh ah lahs syay-tay', translation: 'I wake up at 7' },
      { id: 'es-ex4-2', targetText: 'Quiero un café caliente', pronunciation: 'kyay-roh oon kah-fay kah-lyen-tay', translation: 'I want a hot coffee' },
    ],
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: 'es-m5',
    stageId: 3,
    stageTitle: 'STAGE 3: Past Narrative & Subjunctive',
    moduleNumber: 5,
    title: 'Pretérito Indefinido vs Imperfecto',
    description: 'Master completed past events (Pretérito) versus past descriptions & habits (Imperfecto).',
    targetLanguage: 'Spanish',
    level: 'A2/B1',
    keyConcepts: ['Pretérito for completed actions', 'Imperfecto for background & habits', 'Reflexive verbs in past (me acosté)'],
    examples: [
      { id: 'es-ex5-1', targetText: 'Ayer me desperté tarde', pronunciation: 'ah-yair may des-pair-tay tar-day', translation: 'Yesterday I woke up late' },
      { id: 'es-ex5-2', targetText: 'Estaba cansado porque me dormí a las 2am', pronunciation: 'es-tah-bah kahn-sah-doh...', translation: 'I was tired because I slept at 2am' },
    ],
    isUnlocked: false,
    isCompleted: false,
  }
];

export const JAPANESE_PATHWAY_MODULES: LearningPathModule[] = [
  {
    id: 'ja-m1',
    stageId: 1,
    stageTitle: 'STAGE 1: Writing Systems & Pronunciation',
    moduleNumber: 1,
    title: 'Hiragana & Katakana Foundation',
    description: 'Learn the 46 basic phonetic Hiragana characters, Katakana for loanwords, and clean mora pronunciation.',
    targetLanguage: 'Japanese',
    level: 'A1 Beginner',
    keyConcepts: ['Hiragana grid', 'Katakana loanwords', 'Long vowels & double consonants (っ)', 'Pitch accent intro'],
    examples: [
      { id: 'ja-ex1-1', targetText: 'こんにちは', pronunciation: 'konnichiwa', translation: 'Hello' },
      { id: 'ja-ex1-2', targetText: 'ありがとう', pronunciation: 'arigatou', translation: 'Thank you' },
    ],
    isUnlocked: true,
    isCompleted: true,
  },
  {
    id: 'ja-m2',
    stageId: 1,
    stageTitle: 'STAGE 1: Writing Systems & Pronunciation',
    moduleNumber: 2,
    title: 'Essential Particles: は, が, を, に, で',
    description: 'Master Japanese sentence structure (SOV) and core grammar particles.',
    targetLanguage: 'Japanese',
    level: 'A1 Beginner',
    keyConcepts: ['Topic marker (は)', 'Subject marker (が)', 'Object marker (を)', 'Target/Time (に)', 'Location of action (で)'],
    examples: [
      { id: 'ja-ex2-1', targetText: 'きょうは おきたのが おそかった', pronunciation: 'kyou wa okita no ga osokatta', translation: 'Today I woke up late' },
      { id: 'ja-ex2-2', targetText: 'コーヒーを のみます', pronunciation: 'koohee o nomimasu', translation: 'I drink coffee' },
    ],
    isUnlocked: true,
    isCompleted: false,
  },
  {
    id: 'ja-m3',
    stageId: 2,
    stageTitle: 'STAGE 2: Verbs & Daily Routines',
    moduleNumber: 3,
    title: 'Verb Groups & Past Tense (~ました / ~た)',
    description: 'Understand Group 1 (U-verbs), Group 2 (Ru-verbs), Irregular verbs (する, くる), and past form.',
    targetLanguage: 'Japanese',
    level: 'A1/A2',
    keyConcepts: ['Polite ~masu form', 'Casual plain form', 'Te-form for connecting sentences', 'Past tense ~ta form'],
    examples: [
      { id: 'ja-ex3-1', targetText: 'きのう 2じごろに ねました', pronunciation: 'kinou niji goro ni nemashita', translation: 'Yesterday I went to bed around 2am' },
      { id: 'ja-ex3-2', targetText: 'あさごはんを たべました', pronunciation: 'asagohan o tabemashita', translation: 'I ate breakfast' },
    ],
    isUnlocked: false,
    isCompleted: false,
  }
];

export const KOREAN_PATHWAY_MODULES: LearningPathModule[] = [
  {
    id: 'ko-m1',
    stageId: 1,
    stageTitle: 'STAGE 1: Hangul & Phonetics',
    moduleNumber: 1,
    title: 'Mastering Hangul (한글)',
    description: 'Learn the logical Korean alphabet consonants, vowels, and syllable block building.',
    targetLanguage: 'Korean',
    level: 'A1 Beginner',
    keyConcepts: ['Consonants (ㄱ, ㄴ, ㄷ, ㄹ...)', 'Vowels (ㅏ, ㅓ, ㅗ, ㅜ...)', 'Batchim final consonants (받침)', 'Sound linkage rules'],
    examples: [
      { id: 'ko-ex1-1', targetText: '안녕하세요', pronunciation: 'an-nyeong-ha-se-yo', translation: 'Hello' },
      { id: 'ko-ex1-2', targetText: '감사합니다', pronunciation: 'gam-sa-ham-ni-da', translation: 'Thank you' },
    ],
    isUnlocked: true,
    isCompleted: true,
  },
  {
    id: 'ko-m2',
    stageId: 1,
    stageTitle: 'STAGE 1: Hangul & Phonetics',
    moduleNumber: 2,
    title: 'Subject & Topic Particles (은/는, 이/가)',
    description: 'Understand particle distinction and polite sentence ending ~이에요 / ~예요.',
    targetLanguage: 'Korean',
    level: 'A1 Beginner',
    keyConcepts: ['Topic particles (은/는)', 'Subject particles (이/가)', 'Polite copula (~이에요/예요)', 'Object particle (을/를)'],
    examples: [
      { id: 'ko-ex2-1', targetText: '오늘 늦게 일어났어요', pronunciation: 'o-neul neut-ge il-eo-nas-seo-yo', translation: 'I woke up late today' },
      { id: 'ko-ex2-2', targetText: '커피를 마셔요', pronunciation: 'keo-pi-reul ma-sheo-yo', translation: 'I drink coffee' },
    ],
    isUnlocked: true,
    isCompleted: false,
  }
];

export const GERMAN_PATHWAY_MODULES: LearningPathModule[] = [
  {
    id: 'de-m1',
    stageId: 1,
    stageTitle: 'STAGE 1: German Sounds & Noun Gender',
    moduleNumber: 1,
    title: 'Umlauts, Ch/Sch Sounds & Der/Die/Das',
    description: 'Master German phonetics (ä, ö, ü, ch, sch, st, sp) and the three noun genders (der, die, das).',
    targetLanguage: 'German',
    level: 'A1 Beginner',
    keyConcepts: ['Umlauts (ä, ö, ü)', 'Ch vs Sch pronunciation', 'Der / Die / Das gender system', 'Compound nouns'],
    examples: [
      { id: 'de-ex1-1', targetText: 'Guten Morgen!', pronunciation: 'GOO-ten MOR-gen', translation: 'Good morning!' },
      { id: 'de-ex1-2', targetText: 'der Kaffee / die Sonne / das Buch', pronunciation: 'der KAH-feh / dee ZOH-neh / dahs BOOKH', translation: 'the coffee (m) / sun (f) / book (n)' },
    ],
    isUnlocked: true,
    isCompleted: true,
  },
  {
    id: 'de-m2',
    stageId: 1,
    stageTitle: 'STAGE 1: German Sounds & Noun Gender',
    moduleNumber: 2,
    title: 'Verb Position & Present Tense',
    description: 'Learn the V2 rule (verb in position 2) and regular present tense endings.',
    targetLanguage: 'German',
    level: 'A1 Beginner',
    keyConcepts: ['V2 rule in main clauses', 'Conjugation endings (-e, -st, -t, -en)', 'Modal verbs (möchte, kann, muss)'],
    examples: [
      { id: 'de-ex2-1', targetText: 'Heute bin ich spät aufgewacht', pronunciation: 'HOY-teh bin ikh shpait OWF-geh-vakh-t', translation: 'Today I woke up late' },
      { id: 'de-ex2-2', targetText: 'Ich trinke einen heißen Kaffee', pronunciation: 'ikh TRING-keh EYE-nen HY-sen KAH-feh', translation: 'I am drinking a hot coffee' },
    ],
    isUnlocked: true,
    isCompleted: false,
  }
];

export const ITALIAN_PATHWAY_MODULES: LearningPathModule[] = [
  {
    id: 'it-m1',
    stageId: 1,
    stageTitle: 'STAGE 1: Italian Vowels & Rhythm',
    moduleNumber: 1,
    title: 'Italian Vowels, C/G Pronunciation & Rhythm',
    description: 'Master musical Italian vowels, soft vs hard C/G (ci vs chi, gi vs ghi), and double consonants.',
    targetLanguage: 'Italian',
    level: 'A1 Beginner',
    keyConcepts: ['5 open vowels', 'Hard/soft C and G', 'Double consonants (doppie)', 'Stress accent'],
    examples: [
      { id: 'it-ex1-1', targetText: 'Ciao! Come stai?', pronunciation: 'CHOW KOH-may STY', translation: 'Hi! How are you?' },
      { id: 'it-ex1-2', targetText: 'un caffè caldo', pronunciation: 'oon kahf-FAYH KAHL-doh', translation: 'a hot coffee' },
    ],
    isUnlocked: true,
    isCompleted: true,
  },
  {
    id: 'it-m2',
    stageId: 1,
    stageTitle: 'STAGE 1: Italian Vowels & Rhythm',
    moduleNumber: 2,
    title: 'Essere & Avere & Passato Prossimo',
    description: 'Learn Essere (to be) and Avere (to have), plus reflexive verbs in daily journal entries.',
    targetLanguage: 'Italian',
    level: 'A1 Beginner',
    keyConcepts: ['Essere & Avere conjugations', 'Passato prossimo past tense', 'Reflexive verbs (mi sono svegliato/a)'],
    examples: [
      { id: 'it-ex2-1', targetText: 'Oggi mi sono svegliato/a tardi', pronunciation: 'OH-jee mee SOH-noh zvay-LYAH-toh TAR-dee', translation: 'Today I woke up late' },
      { id: 'it-ex2-2', targetText: 'Perché sono andato/a a dormire alle 2', pronunciation: 'pair-KAY SOH-noh ahn-DAH-toh ah dor-MEE-ray...', translation: 'Because I went to bed at 2' },
    ],
    isUnlocked: true,
    isCompleted: false,
  }
];

export function getPathwayModulesForLanguage(targetLang: TargetLanguage): LearningPathModule[] {
  switch (targetLang) {
    case 'French':
      return FRENCH_PATHWAY_MODULES;
    case 'Spanish':
      return SPANISH_PATHWAY_MODULES;
    case 'Japanese':
      return JAPANESE_PATHWAY_MODULES;
    case 'Korean':
      return KOREAN_PATHWAY_MODULES;
    case 'German':
      return GERMAN_PATHWAY_MODULES;
    case 'Italian':
      return ITALIAN_PATHWAY_MODULES;
    case 'Mandarin Chinese':
    default:
      return MANDARIN_PATHWAY_MODULES;
  }
}
