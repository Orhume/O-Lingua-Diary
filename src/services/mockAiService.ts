import { DiaryEntry, DiaryLesson, VocabularyItem, GrammarPoint, Annotation, QuizQuestion, SentenceBreakdownItem, TargetLanguage } from '../types';

export class MockAIService {
  public static async generateDiaryLesson(entry: DiaryEntry): Promise<DiaryLesson> {
    // Fast, crisp response time
    await new Promise(resolve => setTimeout(resolve, 350));

    const targetLang = entry.targetLanguage || 'Mandarin Chinese';
    const text = entry.originalText.trim();

    switch (targetLang) {
      case 'French':
        return this.buildFrenchLesson(entry);
      case 'Spanish':
        return this.buildSpanishLesson(entry);
      case 'Japanese':
        return this.buildJapaneseLesson(entry);
      case 'Korean':
        return this.buildKoreanLesson(entry);
      case 'German':
        return this.buildGermanLesson(entry);
      case 'Italian':
        return this.buildItalianLesson(entry);
      case 'Mandarin Chinese':
      default:
        return this.buildChineseLesson(entry);
    }
  }

  public static async explainAnnotation(targetText: string, contextSentence: string): Promise<Annotation> {
    await new Promise(resolve => setTimeout(resolve, 200));

    return {
      id: `ann-${Date.now()}`,
      targetText: targetText,
      annotationType: 'vocabulary',
      startIndex: 0,
      endIndex: targetText.length,
      pronunciation: 'Phonetic / Reading',
      meaning: `Meaning of ${targetText}`,
      quickExplanation: `Key vocabulary item extracted from your daily memory.`,
      detailedExplanation: `Used in natural daily conversations to express your thoughts comfortably.`,
      examples: [
        { id: 'ann-ex-d1', targetText: contextSentence || targetText, pronunciation: '...', translation: 'Source example from your diary context' }
      ]
    };
  }

  // --- FRENCH LESSON GENERATOR ---
  private static buildFrenchLesson(entry: DiaryEntry): DiaryLesson {
    const lessonId = `lesson-${Date.now()}`;
    return {
      id: lessonId,
      diaryEntryId: entry.id,
      naturalTranslation: "Je me suis réveillé(e) tard aujourd'hui parce que je me suis couché(e) vers 2h du matin.",
      pronunciation: {
        system: 'phonetic',
        value: "Zhuh muh swee ray-vay-yay tahr oh-zhoor-dwee parskuh zhuh muh swee koo-shay vair duh uhr dy mah-tan.",
        notes: [
          "'réveillé(e)' has a stress on the final 'é' sound.",
          "'parce que' is pronounced smoothly as 'parskuh' in casual speech.",
          "'vers 2h' links seamlessly ('vair duh-zuhr')."
        ]
      },
      literalTranslation: "I myself am woken late today because I myself am bedded towards 2 hours of-the morning.",
      sentenceBreakdown: [
        {
          chunkText: "Je me suis réveillé(e) tard",
          pronunciation: "Zhuh muh swee ray-vay-yay tahr",
          literalMeaning: "I myself am woken late",
          explanation: "Main clause: Subject (Je) + Reflexive aux (me suis) + Past participle (réveillé) + Adverb (tard)"
        },
        {
          chunkText: "aujourd'hui parce que",
          pronunciation: "oh-zhoor-dwee parskuh",
          literalMeaning: "today because",
          explanation: "Time marker (aujourd'hui) + Causal connector (parce que)"
        },
        {
          chunkText: "je me suis couché(e) vers 2h du matin",
          pronunciation: "zhuh muh swee koo-shay vair duh uhr dy mah-tan",
          literalMeaning: "I myself am bedded towards 2h of-the morning",
          explanation: "Reason clause: Pronominal past verb (me suis couché) + Approx time (vers 2h du matin)"
        }
      ],
      vocabularyItems: [
        {
          id: 'v-fr-1',
          targetText: "se réveiller",
          pronunciation: "suh ray-vay-yay",
          meaning: "to wake up",
          partOfSpeech: "reflexive verb",
          grammarRole: "main action",
          difficulty: "Beginner",
          targetLanguage: "French",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-fr-1', targetText: "Je me réveille toujours à 7h.", pronunciation: "Zhuh muh ray-vay ah set uhr.", translation: "I always wake up at 7am." }
          ]
        },
        {
          id: 'v-fr-2',
          targetText: "tard",
          pronunciation: "tahr",
          meaning: "late",
          partOfSpeech: "adverb",
          grammarRole: "time modifier",
          difficulty: "Beginner",
          targetLanguage: "French",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-fr-2', targetText: "Il est trop tard.", pronunciation: "Eel ay troh tahr.", translation: "It is too late." }
          ]
        },
        {
          id: 'v-fr-3',
          targetText: "parce que",
          pronunciation: "parskuh",
          meaning: "because",
          partOfSpeech: "conjunction",
          grammarRole: "causal connector",
          difficulty: "Beginner",
          targetLanguage: "French",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-fr-3', targetText: "J'aime le café parce que ça me donne de l'énergie.", pronunciation: "Zhem luh kah-fay parskuh sah muh don...", translation: "I like coffee because it gives me energy." }
          ]
        },
        {
          id: 'v-fr-4',
          targetText: "se coucher",
          pronunciation: "suh koo-shay",
          meaning: "to go to bed / sleep",
          partOfSpeech: "reflexive verb",
          grammarRole: "secondary action",
          difficulty: "Beginner",
          targetLanguage: "French",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-fr-4', targetText: "Je vais me coucher maintenant.", pronunciation: "Zhuh vay muh koo-shay...", translation: "I am going to bed now." }
          ]
        },
        {
          id: 'v-fr-5',
          targetText: "vers",
          pronunciation: "vair",
          meaning: "around / towards (time)",
          partOfSpeech: "preposition",
          grammarRole: "time approximation",
          difficulty: "Lower intermediate",
          targetLanguage: "French",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-fr-5', targetText: "On se voit vers midi.", pronunciation: "On suh vwah vair mee-dee.", translation: "We see each other around noon." }
          ]
        }
      ],
      grammarPoints: [
        {
          id: 'g-fr-1',
          title: "Reflexive Verbs in Passé Composé (se réveiller & se coucher)",
          structure: "Sujet + me/te/se + suis/es/est + participe passé",
          shortExplanation: "All reflexive verbs in French use 'être' as their auxiliary verb in past tense.",
          detailedExplanation: "When putting a pronominal verb like 'se coucher' into the past (passé composé), use 'être' (e.g. 'Je me suis couché'), not 'avoir'. The past participle agrees in gender if subject pronoun is female ('réveillée').",
          targetLanguage: "French",
          difficulty: "Beginner",
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge-fr-1', targetText: "Je me suis levé à huit heures.", pronunciation: "Zhuh muh swee luh-vay...", translation: "I got up at 8 o'clock." }
          ],
          commonMistakes: ["Do NOT say 'J'ai me couché'. Always use 'être': 'Je me suis couché'."]
        },
        {
          id: 'g-fr-2',
          title: "Expressing Approximate Time with 'vers'",
          structure: "vers + [heure]",
          shortExplanation: "'vers' translates to 'around' or 'approximately' when speaking of time.",
          detailedExplanation: "Unlike English 'about', French uses 'vers' specifically for clock hours (e.g. 'vers 2h du matin' = around 2am).",
          targetLanguage: "French",
          difficulty: "Beginner",
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge-fr-2', targetText: "Le train arrive vers 15h.", pronunciation: "Luh tran ah-reev...", translation: "The train arrives around 3pm." }
          ],
          commonMistakes: ["Do not confuse 'vers' (towards/around) with 'avec' (with) or 'environ' (about a quantity)."]
        }
      ],
      annotations: [
        {
          id: 'ann-fr-1',
          targetText: "se réveiller",
          annotationType: "vocabulary",
          startIndex: 3,
          endIndex: 15,
          pronunciation: "suh ray-vay-yay",
          meaning: "to wake up",
          quickExplanation: "Reflexive verb for waking up in the morning.",
          detailedExplanation: "Literally 'to wake oneself up'. In past tense: 'Je me suis réveillé(e)'.",
          examples: []
        },
        {
          id: 'ann-fr-2',
          targetText: "parce que",
          annotationType: "grammar",
          startIndex: 22,
          endIndex: 31,
          pronunciation: "parskuh",
          meaning: "because",
          quickExplanation: "Connector introducing full cause clauses.",
          detailedExplanation: "Always followed by a subject + verb sentence structure.",
          examples: []
        },
        {
          id: 'ann-fr-3',
          targetText: "vers 2h du matin",
          annotationType: "structure",
          startIndex: 42,
          endIndex: 58,
          pronunciation: "vair duh uhr dy mah-tan",
          meaning: "around 2:00 AM",
          quickExplanation: "Time phrase combining approximation + hour + morning specifier.",
          detailedExplanation: "'du matin' specifies AM hours after midnight.",
          examples: []
        }
      ],
      miniQuiz: [
        {
          id: 'q-fr-1',
          question: "What auxiliary verb is used for reflexive verbs in past tense in French?",
          options: ["être (Je me suis...)", "avoir (J'ai...)", "faire (Je fais...)", "aller (Je vais...)"],
          correctAnswer: "être (Je me suis...)",
          explanation: "Reflexive verbs always take 'être' in the passé composé.",
          type: "multipleChoice"
        },
        {
          id: 'q-fr-2',
          question: "What does 'tard' mean in your French lesson?",
          options: ["late", "early", "today", "tomorrow"],
          correctAnswer: "late",
          explanation: "'tard' means late in French.",
          type: "multipleChoice"
        },
        {
          id: 'q-fr-3',
          question: "How do you say 'around 2 o'clock' in French?",
          options: ["vers 2h", "avec 2h", "pour 2h", "dans 2h"],
          correctAnswer: "vers 2h",
          explanation: "'vers' is used for approximate clock times.",
          type: "multipleChoice"
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // --- SPANISH LESSON GENERATOR ---
  private static buildSpanishLesson(entry: DiaryEntry): DiaryLesson {
    const lessonId = `lesson-${Date.now()}`;
    return {
      id: lessonId,
      diaryEntryId: entry.id,
      naturalTranslation: "Hoy me desperté tarde porque me acosté como a las 2 de la mañana.",
      pronunciation: {
        system: 'phonetic',
        value: "Oy meh des-per-TEH TAR-deh por-keh meh ah-cos-TEH CO-mo ah las DOS deh lah mah-NYAH-nah.",
        notes: [
          "'Hoy' has a silent 'H'.",
          "'desperté' and 'acosté' have strong stress on the final accented vowel 'é'.",
          "'mañana' features the soft 'ñ' (ny sound)."
        ]
      },
      literalTranslation: "Today myself I-woke late because myself I-bedded like at the 2 of the morning.",
      sentenceBreakdown: [
        {
          chunkText: "Hoy me desperté tarde",
          pronunciation: "Oy meh des-per-TEH TAR-deh",
          literalMeaning: "Today myself I-woke late",
          explanation: "Time marker (Hoy) + Reflexive past verb (me desperté) + Adverb (tarde)"
        },
        {
          chunkText: "porque me acosté",
          pronunciation: "por-keh meh ah-cos-TEH",
          literalMeaning: "because myself I-bedded",
          explanation: "Causal connector (porque) + Reflexive past verb (me acosté)"
        },
        {
          chunkText: "como a las 2 de la mañana",
          pronunciation: "CO-mo ah las DOS deh lah mah-NYAH-nah",
          literalMeaning: "like at the 2 of the morning",
          explanation: "Approximate time modifier (como a las 2) + AM period marker (de la mañana)"
        }
      ],
      vocabularyItems: [
        {
          id: 'v-es-1',
          targetText: "despertarse",
          pronunciation: "des-per-TAR-seh",
          meaning: "to wake up",
          partOfSpeech: "reflexive verb",
          grammarRole: "main action",
          difficulty: "Beginner",
          targetLanguage: "Spanish",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-es-1', targetText: "Me despierto temprano todos los días.", pronunciation: "Meh des-pyer-to...", translation: "I wake up early every day." }
          ]
        },
        {
          id: 'v-es-2',
          targetText: "tarde",
          pronunciation: "TAR-deh",
          meaning: "late",
          partOfSpeech: "adverb",
          grammarRole: "time modifier",
          difficulty: "Beginner",
          targetLanguage: "Spanish",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-es-2', targetText: "Llegué tarde a la reunión.", pronunciation: "Yeh-geh tar-deh...", translation: "I arrived late to the meeting." }
          ]
        },
        {
          id: 'v-es-3',
          targetText: "acostarse",
          pronunciation: "ah-cos-TAR-seh",
          meaning: "to go to bed",
          partOfSpeech: "reflexive verb",
          grammarRole: "secondary action",
          difficulty: "Beginner",
          targetLanguage: "Spanish",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-es-3', targetText: "Me acosté muy cansado.", pronunciation: "Meh ah-cos-teh...", translation: "I went to bed very tired." }
          ]
        }
      ],
      grammarPoints: [
        {
          id: 'g-es-1',
          title: "Preterite Tense of Reflexive Verbs (despertarse)",
          structure: "me + [verb stem + é]",
          shortExplanation: "Use reflexive pronoun 'me' before the preterite past verb form.",
          detailedExplanation: "For 'yo' (I) in past preterite, '-ar' verbs end in '-é' with an accent mark: Me desperté (I woke up), Me acosté (I went to bed).",
          targetLanguage: "Spanish",
          difficulty: "Beginner",
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge-es-1', targetText: "Ayer me acosté a las 11.", pronunciation: "Ah-yer meh ah-cos-teh...", translation: "Yesterday I went to bed at 11." }
          ],
          commonMistakes: ["Don't forget the reflexive pronoun 'me'! Saying just 'desperté' sounds incomplete in Spanish."]
        }
      ],
      annotations: [
        {
          id: 'ann-es-1',
          targetText: "me desperté",
          annotationType: "vocabulary",
          startIndex: 4,
          endIndex: 15,
          pronunciation: "meh des-per-TEH",
          meaning: "I woke up",
          quickExplanation: "Past preterite form of reflexive verb despertarse.",
          detailedExplanation: "Reflexive verb action completed in the past.",
          examples: []
        }
      ],
      miniQuiz: [
        {
          id: 'q-es-1',
          question: "What does 'tarde' mean in Spanish?",
          options: ["late", "early", "today", "always"],
          correctAnswer: "late",
          explanation: "'tarde' means late.",
          type: "multipleChoice"
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // --- JAPANESE LESSON GENERATOR ---
  private static buildJapaneseLesson(entry: DiaryEntry): DiaryLesson {
    const lessonId = `lesson-${Date.now()}`;
    return {
      id: lessonId,
      diaryEntryId: entry.id,
      naturalTranslation: "昨日は夜の2時ごろに寝たので、今日は遅く起きました。",
      pronunciation: {
        system: 'romaji',
        value: "Kinou wa yoru no niji goro ni neta node, kyou wa osoku okimashita.",
        notes: [
          "'Kinou' means yesterday.",
          "'goro' means approximately/around for clock time.",
          "'node' means because/since."
        ]
      },
      literalTranslation: "Yesterday night's 2 o'clock around slept because, today late woke up.",
      sentenceBreakdown: [
        {
          chunkText: "昨日は夜の2時ごろに寝たので",
          pronunciation: "Kinou wa yoru no niji goro ni neta node",
          literalMeaning: "Yesterday night's 2 o'clock around slept because",
          explanation: "Reason clause: Time + Approx marker (goro) + Past verb (neta) + Conjunction (node)"
        },
        {
          chunkText: "今日は遅く起きました",
          pronunciation: "Kyou wa osoku okimashita",
          literalMeaning: "Today late woke up",
          explanation: "Main clause: Topic (Kyou wa) + Adverbial form of late (osoku) + Polite past verb (okimashita)"
        }
      ],
      vocabularyItems: [
        {
          id: 'v-ja-1',
          targetText: "起きる (おきる)",
          pronunciation: "okiru (okimashita)",
          meaning: "to wake up / get up",
          partOfSpeech: "verb",
          grammarRole: "main action",
          difficulty: "Beginner",
          targetLanguage: "Japanese",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-ja-1', targetText: "毎朝7時に起きます。", pronunciation: "Maiasa shichiji ni okimasu.", translation: "I wake up at 7 every morning." }
          ]
        },
        {
          id: 'v-ja-2',
          targetText: "遅く (おそく)",
          pronunciation: "osoku",
          meaning: "late (adverbial)",
          partOfSpeech: "adverb",
          grammarRole: "time modifier",
          difficulty: "Beginner",
          targetLanguage: "Japanese",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-ja-2', targetText: "今日は遅く起きた。", pronunciation: "Kyou wa osoku okita.", translation: "I woke up late today." }
          ]
        },
        {
          id: 'v-ja-3',
          targetText: "寝る (ねる)",
          pronunciation: "neru (neta)",
          meaning: "to sleep / go to bed",
          partOfSpeech: "verb",
          grammarRole: "secondary action",
          difficulty: "Beginner",
          targetLanguage: "Japanese",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-ja-3', targetText: "早く寝ましょう。", pronunciation: "Hayaku nemashou.", translation: "Let's go to sleep early." }
          ]
        }
      ],
      grammarPoints: [
        {
          id: 'g-ja-1',
          title: "Expressing Reasons with ので (node)",
          structure: "Verb (plain past) + ので",
          shortExplanation: "'node' expresses a natural cause-and-effect reason.",
          detailedExplanation: "Placing ので after a plain past verb (寝た) creates a polite cause clause ('because I slept late...').",
          targetLanguage: "Japanese",
          difficulty: "Beginner",
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge-ja-1', targetText: "雨が降ったので、家にいました。", pronunciation: "Ame ga futta node, ie ni imashita.", translation: "Because it rained, I stayed at home." }
          ],
          commonMistakes: ["Do not confuse ので (polite cause) with から (informal/assertive cause)."]
        }
      ],
      annotations: [
        {
          id: 'ann-ja-1',
          targetText: "起きました",
          annotationType: "vocabulary",
          startIndex: 18,
          endIndex: 22,
          pronunciation: "okimashita",
          meaning: "woke up (polite past)",
          quickExplanation: "Polite past tense of verb okiru.",
          detailedExplanation: "Formed by changing okiru to okimasu -> okimashita.",
          examples: []
        }
      ],
      miniQuiz: [
        {
          id: 'q-ja-1',
          question: "What does ので (node) mean in Japanese?",
          options: ["because / since", "but", "today", "tomorrow"],
          correctAnswer: "because / since",
          explanation: "node connects a reason to a result.",
          type: "multipleChoice"
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // --- KOREAN LESSON GENERATOR ---
  private static buildKoreanLesson(entry: DiaryEntry): DiaryLesson {
    const lessonId = `lesson-${Date.now()}`;
    return {
      id: lessonId,
      diaryEntryId: entry.id,
      naturalTranslation: "어제 새벽 2시쯤에 자서 오늘 늦게 일어났어요.",
      pronunciation: {
        system: 'romanization',
        value: "Eoje saebyeok dusi-jjeume jaseo oneul neutge ireonasseoyo.",
        notes: [
          "'saebyeok' means dawn / early morning.",
          "'jjeume' means around / approximately.",
          "'ireonasseoyo' is the polite informal past tense of get up."
        ]
      },
      literalTranslation: "Yesterday dawn 2 o'clock around slept-so today late got-up.",
      sentenceBreakdown: [
        {
          chunkText: "어제 새벽 2시쯤에 자서",
          pronunciation: "Eoje saebyeok dusi-jjeume jaseo",
          literalMeaning: "Yesterday dawn 2 o'clock around slept-so",
          explanation: "Reason clause: Time + Approx marker (jjeume) + Verb connector (-서)"
        },
        {
          chunkText: "오늘 늦게 일어났어요",
          pronunciation: "oneul neutge ireonasseoyo",
          literalMeaning: "today late got-up",
          explanation: "Main clause: Time (oneul) + Adverb (neutge) + Past verb (ireonasseoyo)"
        }
      ],
      vocabularyItems: [
        {
          id: 'v-ko-1',
          targetText: "일어나다",
          pronunciation: "ireonada (ireonasseoyo)",
          meaning: "to wake up / get up",
          partOfSpeech: "verb",
          grammarRole: "main action",
          difficulty: "Beginner",
          targetLanguage: "Korean",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-ko-1', targetText: "아침 일찍 일어났어요.", pronunciation: "Achim iljjik ireonasseoyo.", translation: "I woke up early in the morning." }
          ]
        },
        {
          id: 'v-ko-2',
          targetText: "늦게",
          pronunciation: "neutge",
          meaning: "late (adverb)",
          partOfSpeech: "adverb",
          grammarRole: "time modifier",
          difficulty: "Beginner",
          targetLanguage: "Korean",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-ko-2', targetText: "늦게 와서 죄송해요.", pronunciation: "Neutge waseo joesonghaeyo.", translation: "Sorry for coming late." }
          ]
        }
      ],
      grammarPoints: [
        {
          id: 'g-ko-1',
          title: "Cause & Sequence Connector -아/어서",
          structure: "Verb stem + -아/어서",
          shortExplanation: "Connects a reason action directly to the subsequent resulting action.",
          detailedExplanation: "In 자서 (jaseo), the verb 자다 (to sleep) takes -서 to indicate 'because I slept late, [consequently] I woke up late'.",
          targetLanguage: "Korean",
          difficulty: "Beginner",
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge-ko-1', targetText: "피곤해서 일찍 잤어요.", pronunciation: "Pigonhaeseo iljjik jasseoyo.", translation: "Because I was tired, I slept early." }
          ],
          commonMistakes: ["Do not put past tense before -아서/어서! Say 자서, not 잤어서."]
        }
      ],
      annotations: [
        {
          id: 'ann-ko-1',
          targetText: "일어났어요",
          annotationType: "vocabulary",
          startIndex: 18,
          endIndex: 23,
          pronunciation: "ireonasseoyo",
          meaning: "woke up",
          quickExplanation: "Polite past tense of 일어나다.",
          detailedExplanation: "Standard polite diary verb form.",
          examples: []
        }
      ],
      miniQuiz: [
        {
          id: 'q-ko-1',
          question: "What does '늦게' mean in Korean?",
          options: ["late", "early", "today", "tomorrow"],
          correctAnswer: "late",
          explanation: "'neutge' means late.",
          type: "multipleChoice"
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // --- GERMAN LESSON GENERATOR ---
  private static buildGermanLesson(entry: DiaryEntry): DiaryLesson {
    const lessonId = `lesson-${Date.now()}`;
    return {
      id: lessonId,
      diaryEntryId: entry.id,
      naturalTranslation: "Ich bin heute spät aufgewacht, weil ich erst gegen 2 Uhr morgens schlafen gegangen bin.",
      pronunciation: {
        system: 'phonetic',
        value: "Ikh bin HOY-teh shpait OWF-geh-vakh-t, vile ikh air-st GAY-gen tsvai oor MOR-gens SHLAH-fen geh-GAN-gen bin.",
        notes: [
          "'spät' has the open 'ä' vowel sound.",
          "'weil' sends the conjugated auxiliary verb 'bin' to the very end of the subordinate clause!"
        ]
      },
      literalTranslation: "I am today late up-woken, because I first towards 2 o'clock in-morning to-sleep gone am.",
      sentenceBreakdown: [
        {
          chunkText: "Ich bin heute spät aufgewacht",
          pronunciation: "Ikh bin HOY-teh shpait OWF-geh-vakh-t",
          literalMeaning: "I am today late up-woken",
          explanation: "Main clause: Subject (Ich) + Aux (bin) + Time (heute) + Adverb (spät) + Separable participle (aufgewacht)"
        },
        {
          chunkText: "weil ich erst gegen 2 Uhr morgens",
          pronunciation: "vile ikh air-st GAY-gen tsvai oor MOR-gens",
          literalMeaning: "because I first towards 2 o'clock morning",
          explanation: "Subordinate clause start: Conjunction (weil) + Approx time phrase"
        },
        {
          chunkText: "schlafen gegangen bin",
          pronunciation: "SHLAH-fen geh-GAN-gen bin",
          literalMeaning: "to-sleep gone am",
          explanation: "End of subordinate clause: Double verb structure with end auxiliary (bin)"
        }
      ],
      vocabularyItems: [
        {
          id: 'v-de-1',
          targetText: "aufwachen",
          pronunciation: "OWF-vakh-en",
          meaning: "to wake up",
          partOfSpeech: "separable verb",
          grammarRole: "main action",
          difficulty: "Beginner",
          targetLanguage: "German",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-de-1', targetText: "Ich wache jeden Tag um 7 Uhr auf.", pronunciation: "Ikh vakhe...", translation: "I wake up every day at 7am." }
          ]
        },
        {
          id: 'v-de-2',
          targetText: "spät",
          pronunciation: "shpait",
          meaning: "late",
          partOfSpeech: "adverb",
          grammarRole: "time modifier",
          difficulty: "Beginner",
          targetLanguage: "German",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-de-2', targetText: "Es ist schon spät.", pronunciation: "Es ist shon shpait.", translation: "It is already late." }
          ]
        }
      ],
      grammarPoints: [
        {
          id: 'g-de-1',
          title: "Subordinate Clause Word Order with 'weil'",
          structure: "weil + Subject + ... + conjugated verb",
          shortExplanation: "In German, the conjunction 'weil' pushes the conjugated verb to the end of the clause.",
          detailedExplanation: "In 'weil ich erst... gegangen bin', notice how 'bin' moves to the final position after the participle.",
          targetLanguage: "German",
          difficulty: "Beginner",
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge-de-1', targetText: "Ich trinke Kaffee, weil ich müde bin.", pronunciation: "Ikh trinke...", translation: "I drink coffee because I am tired." }
          ],
          commonMistakes: ["Do not keep the verb in second position after 'weil'! 'weil ich bin müde' is grammatically incorrect."]
        }
      ],
      annotations: [
        {
          id: 'ann-de-1',
          targetText: "aufgewacht",
          annotationType: "vocabulary",
          startIndex: 18,
          endIndex: 28,
          pronunciation: "OWF-geh-vakh-t",
          meaning: "woken up",
          quickExplanation: "Past participle of separable verb aufwachen.",
          detailedExplanation: "Takes 'sein' as auxiliary in perfect tense.",
          examples: []
        }
      ],
      miniQuiz: [
        {
          id: 'q-de-1',
          question: "Where does the conjugated verb go in a German clause starting with 'weil'?",
          options: ["At the very end of the clause", "In the second position", "At the very beginning", "It is omitted"],
          correctAnswer: "At the very end of the clause",
          explanation: "'weil' is a subordinating conjunction that forces the conjugated verb to the end.",
          type: "multipleChoice"
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // --- ITALIAN LESSON GENERATOR ---
  private static buildItalianLesson(entry: DiaryEntry): DiaryLesson {
    const lessonId = `lesson-${Date.now()}`;
    return {
      id: lessonId,
      diaryEntryId: entry.id,
      naturalTranslation: "Oggi mi sono svegliato/a tardi perché sono andato/a a dormire verso le 2 di notte.",
      pronunciation: {
        system: 'phonetic',
        value: "OH-jee mee SOH-noh svay-LYAH-toh TAR-dee pair-KEH SOH-noh ahn-DAH-toh ah dor-MEE-ray VAIR-soh lay DOO-ay dee NOHT-tay.",
        notes: [
          "'svegliato' uses the Italian soft 'gli' sound.",
          "'perché' has an acute accent on 'é'.",
          "'notte' has a crisp double 'tt' consonant."
        ]
      },
      literalTranslation: "Today myself I am woken late because I am gone to sleep towards the 2 of night.",
      sentenceBreakdown: [
        {
          chunkText: "Oggi mi sono svegliato/a tardi",
          pronunciation: "OH-jee mee SOH-noh svay-LYAH-toh TAR-dee",
          literalMeaning: "Today myself I am woken late",
          explanation: "Main clause: Time (Oggi) + Reflexive aux (mi sono) + Participle (svegliato) + Adverb (tardi)"
        },
        {
          chunkText: "perché sono andato/a a dormire",
          pronunciation: "pair-KEH SOH-noh ahn-DAH-toh ah dor-MEE-ray",
          literalMeaning: "because I am gone to sleep",
          explanation: "Causal connector (perché) + Auxiliary verb (sono) + Participle (andato) + Infinitive (a dormire)"
        }
      ],
      vocabularyItems: [
        {
          id: 'v-it-1',
          targetText: "svegliarsi",
          pronunciation: "svay-LYAHR-see",
          meaning: "to wake up",
          partOfSpeech: "reflexive verb",
          grammarRole: "main action",
          difficulty: "Beginner",
          targetLanguage: "Italian",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-it-1', targetText: "Mi sveglio sempre alle 7.", pronunciation: "Mee svay-lyoh...", translation: "I always wake up at 7." }
          ]
        },
        {
          id: 'v-it-2',
          targetText: "tardi",
          pronunciation: "TAR-dee",
          meaning: "late",
          partOfSpeech: "adverb",
          grammarRole: "time modifier",
          difficulty: "Beginner",
          targetLanguage: "Italian",
          isSaved: false,
          masteryLevel: "New seed",
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ex-it-2', targetText: "È troppo tardi.", pronunciation: "Eh trop-poh tar-dee.", translation: "It is too late." }
          ]
        }
      ],
      grammarPoints: [
        {
          id: 'g-it-1',
          title: "Reflexive Verbs in Passato Prossimo",
          structure: "mi/ti/si + essere + past participle",
          shortExplanation: "Italian reflexive verbs always use 'essere' (mi sono, ti sei) in past tense.",
          detailedExplanation: "In 'mi sono svegliato', the auxiliary verb is 'essere' and the participle agrees with gender (-o for masculine, -a for feminine).",
          targetLanguage: "Italian",
          difficulty: "Beginner",
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge-it-1', targetText: "Mi sono alzato presto.", pronunciation: "Mee soh-noh al-tsah-toh...", translation: "I got up early." }
          ],
          commonMistakes: ["Do not use 'avere'! Saying 'Ho svegliato me' is incorrect."]
        }
      ],
      annotations: [
        {
          id: 'ann-it-1',
          targetText: "mi sono svegliato",
          annotationType: "vocabulary",
          startIndex: 5,
          endIndex: 22,
          pronunciation: "mee SOH-noh svay-LYAH-toh",
          meaning: "I woke up",
          quickExplanation: "Passato prossimo form of svegliarsi.",
          detailedExplanation: "Reflexive past action.",
          examples: []
        }
      ],
      miniQuiz: [
        {
          id: 'q-it-1',
          question: "What does 'tardi' mean in Italian?",
          options: ["late", "early", "today", "tomorrow"],
          correctAnswer: "late",
          explanation: "'tardi' means late.",
          type: "multipleChoice"
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // --- MANDARIN CHINESE LESSON GENERATOR ---
  private static buildChineseLesson(entry: DiaryEntry): DiaryLesson {
    const lessonId = `lesson-${Date.now()}`;
    return {
      id: lessonId,
      diaryEntryId: entry.id,
      naturalTranslation: "我今天起晚了，因为我凌晨两点左右才睡觉。",
      pronunciation: {
        system: 'pinyin',
        value: 'Wǒ jīntiān qǐ wǎn le, yīnwèi wǒ língchén liǎng diǎn zuǒyòu cái shuìjiào.',
        notes: [
          'Wǒ uses 3rd dipping tone.',
          'qǐ uses 3rd dipping tone.',
          'cái rises like asking a question (2nd tone).',
          'shuìjiào has two crisp 4th falling tones.'
        ]
      },
      literalTranslation: "I today woke-up late, because I early-morning two o’clock around only then slept.",
      sentenceBreakdown: [
        {
          chunkText: '我今天起晚了',
          pronunciation: 'Wǒ jīntiān qǐ wǎn le',
          literalMeaning: 'I today woke-up late',
          explanation: 'Main clause: Subject (我) + Time (今天) + Result (起晚了)'
        },
        {
          chunkText: '因为我凌晨两点左右',
          pronunciation: 'yīnwèi wǒ língchén liǎng diǎn zuǒyòu',
          literalMeaning: 'because I early-morning two o’clock around',
          explanation: 'Reason clause part 1: Conjunction (因为) + Time expression (凌晨两点左右)'
        },
        {
          chunkText: '才睡觉',
          pronunciation: 'cái shuìjiào',
          literalMeaning: 'only then slept',
          explanation: 'Reason clause part 2: Emphasis of lateness (才) + Action (睡觉)'
        }
      ],
      vocabularyItems: [
        {
          id: 'v1',
          targetText: '起晚了',
          pronunciation: 'qǐ wǎn le',
          meaning: 'woke up late',
          partOfSpeech: 'verb phrase',
          grammarRole: 'main action',
          difficulty: 'Beginner',
          targetLanguage: 'Mandarin Chinese',
          isSaved: false,
          masteryLevel: 'New seed',
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'e1-1', targetText: '我今天起晚了。', pronunciation: 'Wǒ jīntiān qǐ wǎn le.', translation: 'I woke up late today.' }
          ]
        },
        {
          id: 'v2',
          targetText: '因为',
          pronunciation: 'yīnwèi',
          meaning: 'because',
          partOfSpeech: 'conjunction',
          grammarRole: 'causal connector',
          difficulty: 'Beginner',
          targetLanguage: 'Mandarin Chinese',
          isSaved: false,
          masteryLevel: 'New seed',
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'e3-1', targetText: '因为我很累，所以我想睡觉。', pronunciation: 'Yīnwèi wǒ hěn lèi...', translation: 'Because I am tired, I want to sleep.' }
          ]
        },
        {
          id: 'v3',
          targetText: '才',
          pronunciation: 'cái',
          meaning: 'only then / not until',
          partOfSpeech: 'adverb',
          grammarRole: 'lateness modifier',
          difficulty: 'Intermediate',
          targetLanguage: 'Mandarin Chinese',
          isSaved: false,
          masteryLevel: 'New seed',
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'e6-1', targetText: '他十点才来。', pronunciation: 'Tā shí diǎn cái lái.', translation: 'He only arrived at 10.' }
          ]
        }
      ],
      grammarPoints: [
        {
          id: 'g1',
          title: 'Using 因为 (yīnwèi) for reasons',
          structure: '因为 + Reason, (所以 + Result)',
          shortExplanation: '因为 introduces the reason for something in your diary entry.',
          detailedExplanation: 'In Chinese, 因为 (yīnwèi) is placed at the start of the reason clause.',
          targetLanguage: 'Mandarin Chinese',
          difficulty: 'Beginner',
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge1-1', targetText: '因为我很累，所以我想早点睡觉。', pronunciation: 'Yīnwèi wǒ hěn lèi...', translation: 'Because I am tired...' }
          ],
          commonMistakes: ['Do not place 因为 at the end of the sentence like English "because" sometimes appears in casual speech.']
        },
        {
          id: 'g2',
          title: 'Emphasis of lateness with 才 (cái)',
          structure: 'Time + 才 + Verb',
          shortExplanation: '才 emphasizes that an action happened later than expected.',
          detailedExplanation: 'When added before a verb after a time expression, 才 adds the emotional nuance of "only then".',
          targetLanguage: 'Mandarin Chinese',
          difficulty: 'Lower intermediate',
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: [
            { id: 'ge2-1', targetText: '他十点才来。', pronunciation: 'Tā shí diǎn cái lái.', translation: 'He only arrived at 10:00.' }
          ],
          commonMistakes: ['Do not use 才 for physical quantity. Use 只 (zhǐ) for quantity.']
        }
      ],
      annotations: [
        {
          id: 'ann-1',
          targetText: '起晚了',
          annotationType: 'vocabulary',
          startIndex: 4,
          endIndex: 7,
          pronunciation: 'qǐ wǎn le',
          meaning: 'woke up late',
          quickExplanation: 'Verb phrase for waking up later than planned.',
          detailedExplanation: '起 means to get up, 晚 means late.',
          examples: []
        },
        {
          id: 'ann-4',
          targetText: '才',
          annotationType: 'tone',
          startIndex: 17,
          endIndex: 18,
          pronunciation: 'cái',
          meaning: 'only then / not until',
          quickExplanation: 'Adds the feeling that sleeping at 2am was unusually late.',
          detailedExplanation: '才 emphasizes lateness.',
          toneTips: 'Second tone (rising pitch).',
          examples: []
        }
      ],
      miniQuiz: [
        {
          id: 'q1',
          question: 'What does 因为 (yīnwèi) mean in your diary sentence?',
          options: ['because', 'but', 'today', 'to sleep'],
          correctAnswer: 'because',
          explanation: '因为 introduces the reason for sleeping late.',
          type: 'multipleChoice'
        }
      ],
      createdAt: new Date().toISOString()
    };
  }
}
