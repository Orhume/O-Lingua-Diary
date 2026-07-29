import { Annotation, DiaryLesson, TargetLanguage, VocabularyItem } from '../types';

export interface TokenExplanation {
  token: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  grammarRole: string;
  quickExplanation: string;
  detailedExplanation: string;
  isKeyHighlight: boolean;
}

// Built-in dictionary database for common structural words, particles, connectors & high-frequency vocabulary
const COMMON_DICTIONARY: Record<string, { pronunciation: string; meaning: string; pos: string; role: string; explanation: string }> = {
  // --- MANDARIN CHINESE ---
  '如果': { pronunciation: 'rúguǒ', meaning: 'if / in case', pos: 'conjunction', role: 'conditional connector', explanation: 'Introduces a hypothetical condition clause.' },
  '你': { pronunciation: 'nǐ', meaning: 'you', pos: 'pronoun', role: 'subject / object pronoun', explanation: '2nd person singular pronoun.' },
  '想': { pronunciation: 'xiǎng', meaning: 'want to / wish to / think', pos: 'modal verb', role: 'auxiliary verb of desire', explanation: 'Placed before a verb to express personal desire or intention.' },
  '亲': { pronunciation: 'qīn', meaning: 'to kiss / intimate / close', pos: 'verb', role: 'core action verb', explanation: 'Action verb meaning to kiss someone or express affection.' },
  '我': { pronunciation: 'wǒ', meaning: 'I / me', pos: 'pronoun', role: '1st person pronoun', explanation: '1st person singular pronoun.' },
  '必须': { pronunciation: 'bìxū', meaning: 'must / have to / compulsory', pos: 'adverb / modal verb', role: 'necessity modifier', explanation: 'Expresses an imperative or mandatory requirement before a verb.' },
  '同意': { pronunciation: 'tóngyì', meaning: 'to agree / consent', pos: 'verb', role: 'main action verb', explanation: 'Expresses agreement or giving consent to a statement or condition.' },
  '是': { pronunciation: 'shì', meaning: 'to be (am / is / are)', pos: 'copula verb', role: 'linking verb', explanation: 'Links the subject to a noun predicate or clause.' },
  '唯一': { pronunciation: 'wéiyī', meaning: 'only / sole / unique', pos: 'adjective', role: 'attributive modifier', explanation: 'Modifies a noun to mean "the single/only one".' },
  '会': { pronunciation: 'huì', meaning: 'will / shall / know how to', pos: 'modal auxiliary', role: 'future aspect / capability', explanation: 'Indicates a future tendency, intention, or acquired ability.' },
  '爱': { pronunciation: 'ài', meaning: 'to love / affection', pos: 'verb', role: 'action verb', explanation: 'Expresses deep affection or romantic love.' },
  '的': { pronunciation: 'de', meaning: 'possessive / relative clause particle', pos: 'structural particle', role: 'attributive particle', explanation: 'Connects a modifying clause or adjective to its head noun.' },
  '人': { pronunciation: 'rén', meaning: 'person / human / people', pos: 'noun', role: 'head noun', explanation: 'Noun representing a human being or person.' },
  '今天': { pronunciation: 'jīntiān', meaning: 'today', pos: 'noun', role: 'time adverbial', explanation: 'Time noun specifying the current day.' },
  '起晚了': { pronunciation: 'qǐ wǎn le', meaning: 'woke up late', pos: 'verb phrase', role: 'action + result complement', explanation: 'Combines 起 (get up) + 晚 (late) + 了 (completed aspect).' },
  '因为': { pronunciation: 'yīnwèi', meaning: 'because / since', pos: 'conjunction', role: 'causal connector', explanation: 'Introduces the cause or reason for an action.' },
  '凌晨': { pronunciation: 'língchén', meaning: 'early morning / pre-dawn', pos: 'noun', role: 'time phrase', explanation: 'Refers to the hours just after midnight before dawn (1am - 5am).' },
  '两点': { pronunciation: 'liǎng diǎn', meaning: 'two o\'clock', pos: 'time phrase', role: 'clock time', explanation: 'Specifies 2:00.' },
  '左右': { pronunciation: 'zuǒyòu', meaning: 'around / approximately', pos: 'postposition', role: 'approximation marker', explanation: 'Placed after numbers or time to mean "about" or "or so".' },
  '才': { pronunciation: 'cái', meaning: 'only then / not until', pos: 'adverb', role: 'lateness modifier', explanation: 'Emphasizes that an action occurred later than expected.' },
  '睡觉': { pronunciation: 'shuìjiào', meaning: 'to sleep / go to bed', pos: 'verb', role: 'main action', explanation: 'Standard verb for sleeping.' },
  '他': { pronunciation: 'tā', meaning: 'he / him', pos: 'pronoun', role: '3rd person singular', explanation: '3rd person masculine pronoun.' },
  '她': { pronunciation: 'tā', meaning: 'she / her', pos: 'pronoun', role: '3rd person singular', explanation: '3rd person feminine pronoun.' },
  '我们': { pronunciation: 'wǒmen', meaning: 'we / us', pos: 'pronoun', role: '1st person plural', explanation: '1st person plural pronoun.' },
  '什么': { pronunciation: 'shénme', meaning: 'what', pos: 'interrogative pronoun', role: 'question word', explanation: 'Used to ask about objects or things.' },
  '很': { pronunciation: 'hěn', meaning: 'very / quite', pos: 'adverb', role: 'degree modifier', explanation: 'Modifies adjectives to express degree.' },
  '不': { pronunciation: 'bù', meaning: 'not / no', pos: 'adverb', role: 'negation particle', explanation: 'Standard present/future negation adverb.' },
  '没': { pronunciation: 'méi', meaning: 'did not / have not', pos: 'adverb', role: 'past negation particle', explanation: 'Negates completed actions or possession.' },
  '都': { pronunciation: 'dōu', meaning: 'all / both', pos: 'adverb', role: 'inclusivity marker', explanation: 'Emphasizes that all items in a group share a property.' },

  // --- FRENCH ---
  'je': { pronunciation: 'zhuh', meaning: 'I', pos: 'pronoun', role: 'subject pronoun', explanation: '1st person singular subject pronoun.' },
  'tu': { pronunciation: 'too', meaning: 'you (informal)', pos: 'pronoun', role: 'subject pronoun', explanation: '2nd person singular informal subject pronoun.' },
  'il': { pronunciation: 'eel', meaning: 'he / it', pos: 'pronoun', role: 'subject pronoun', explanation: '3rd person masculine subject pronoun.' },
  'elle': { pronunciation: 'el', meaning: 'she / it', pos: 'pronoun', role: 'subject pronoun', explanation: '3rd person feminine subject pronoun.' },
  'nous': { pronunciation: 'noo', meaning: 'we / us', pos: 'pronoun', role: 'subject/object pronoun', explanation: '1st person plural pronoun.' },
  'vous': { pronunciation: 'voo', meaning: 'you (formal/plural)', pos: 'pronoun', role: 'subject pronoun', explanation: '2nd person plural or polite formal pronoun.' },
  'est': { pronunciation: 'eh', meaning: 'is', pos: 'verb', role: 'copula verb (être)', explanation: '3rd person singular present of être.' },
  'suis': { pronunciation: 'swee', meaning: 'am', pos: 'verb', role: 'copula verb (être)', explanation: '1st person singular present of être.' },
  'avez': { pronunciation: 'ah-vay', meaning: 'have', pos: 'verb', role: 'auxiliary verb (avoir)', explanation: '2nd person plural present of avoir.' },
  'parce que': { pronunciation: 'parskuh', meaning: 'because', pos: 'conjunction', role: 'causal connector', explanation: 'Introduces a full cause sentence.' },
  'mais': { pronunciation: 'may', meaning: 'but', pos: 'conjunction', role: 'adversative connector', explanation: 'Connects contrasting clauses.' },
  'avec': { pronunciation: 'ah-vek', meaning: 'with', pos: 'preposition', role: 'preposition', explanation: 'Indicates accompaniment.' },

  // --- SPANISH ---
  'yo': { pronunciation: 'yoh', meaning: 'I', pos: 'pronoun', role: 'subject pronoun', explanation: '1st person singular pronoun.' },
  'tú': { pronunciation: 'too', meaning: 'you (informal)', pos: 'pronoun', role: 'subject pronoun', explanation: '2nd person singular pronoun.' },
  'él': { pronunciation: 'el', meaning: 'he', pos: 'pronoun', role: 'subject pronoun', explanation: '3rd person masculine pronoun.' },
  'ella': { pronunciation: 'eh-yah', meaning: 'she', pos: 'pronoun', role: 'subject pronoun', explanation: '3rd person feminine pronoun.' },
  'si': { pronunciation: 'see', meaning: 'if', pos: 'conjunction', role: 'conditional connector', explanation: 'Introduces a condition.' },
  'sí': { pronunciation: 'see', meaning: 'yes / indeed', pos: 'adverb', role: 'affirmation', explanation: 'Expresses affirmation.' },
  'porque': { pronunciation: 'por-keh', meaning: 'because', pos: 'conjunction', role: 'causal connector', explanation: 'Introduces reason clause.' },
  'pero': { pronunciation: 'peh-roh', meaning: 'but', pos: 'conjunction', role: 'adversative connector', explanation: 'Introduces contrast.' }
};

/**
 * Tokenizes a sentence into words / characters according to target language rules.
 */
export function segmentTargetSentence(sentence: string, targetLanguage: TargetLanguage): string[] {
  if (!sentence) return [];

  const clean = sentence.trim();

  // For CJK languages (Chinese, Japanese)
  if (targetLanguage === 'Mandarin Chinese' || targetLanguage === 'Japanese') {
    const result: string[] = [];
    let i = 0;
    
    while (i < clean.length) {
      const char = clean[i];
      // Punctuation check
      if (/[，。！？；：、“”（）\s,.!?;:"]/.test(char)) {
        i++;
        continue;
      }

      // Try 3-character match
      const sub3 = clean.substring(i, i + 3);
      const sub2 = clean.substring(i, i + 2);

      if (COMMON_DICTIONARY[sub3]) {
        result.push(sub3);
        i += 3;
      } else if (COMMON_DICTIONARY[sub2]) {
        result.push(sub2);
        i += 2;
      } else {
        result.push(char);
        i += 1;
      }
    }
    return result;
  }

  // For Western languages with spaces (French, Spanish, German, Italian, Korean)
  const rawWords = clean.split(/[\s,.!?;:"]+/).filter(Boolean);
  return rawWords;
}

/**
 * Ensures every single token in a target sentence has a complete, rich explanation.
 */
export function enrichLessonTokens(
  lesson: DiaryLesson,
  targetLanguage: TargetLanguage
): Annotation[] {
  const sentence = lesson.naturalTranslation || '';
  const tokens = segmentTargetSentence(sentence, targetLanguage);

  const existingAnnotations = lesson.annotations || [];
  const existingVocab = lesson.vocabularyItems || [];

  const enriched: Annotation[] = [];

  tokens.forEach((token, idx) => {
    // 1. Check existing annotation
    const foundAnn = existingAnnotations.find(a => a.targetText === token);
    if (foundAnn) {
      enriched.push(foundAnn);
      return;
    }

    // 2. Check existing vocabulary item
    const foundVocab = existingVocab.find(v => v.targetText === token);
    if (foundVocab) {
      enriched.push({
        id: `ann-auto-v-${idx}-${token}`,
        targetText: token,
        annotationType: 'vocabulary',
        startIndex: idx,
        endIndex: idx + token.length,
        pronunciation: foundVocab.pronunciation,
        meaning: foundVocab.meaning,
        quickExplanation: `${foundVocab.partOfSpeech} • ${foundVocab.grammarRole}`,
        detailedExplanation: `In this entry sentence, "${token}" (${foundVocab.meaning}) plays the structural role of ${foundVocab.grammarRole}.`,
        examples: foundVocab.examples || []
      });
      return;
    }

    // 3. Check Built-in Dictionary
    const dict = COMMON_DICTIONARY[token];
    if (dict) {
      enriched.push({
        id: `ann-auto-d-${idx}-${token}`,
        targetText: token,
        annotationType: 'vocabulary',
        startIndex: idx,
        endIndex: idx + token.length,
        pronunciation: dict.pronunciation,
        meaning: dict.meaning,
        quickExplanation: `${dict.pos} • ${dict.role}`,
        detailedExplanation: dict.explanation,
        examples: []
      });
      return;
    }

    // 4. Fallback contextual token generation
    enriched.push({
      id: `ann-auto-f-${idx}-${token}`,
      targetText: token,
      annotationType: 'structure',
      startIndex: idx,
      endIndex: idx + token.length,
      pronunciation: `[${token}]`,
      meaning: `Key component in sentence`,
      quickExplanation: `Part of speech & role in sentence`,
      detailedExplanation: `"${token}" forms an integral structural element in your daily sentence context.`,
      examples: []
    });
  });

  return enriched;
}
