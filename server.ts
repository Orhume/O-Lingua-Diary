import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { MockAIService } from "./src/services/mockAiService";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "O'Lingua Diary Server" });
  });

  // Generate Lesson Endpoint
  app.post("/api/generate-lesson", async (req, res) => {
    try {
      const { entry } = req.body;
      if (!entry || !entry.originalText) {
        return res.status(400).json({ error: "Diary entry original text is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      // Fallback to Mock AI if key is default placeholder or missing
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        console.log("[O'Lingua] GEMINI_API_KEY missing, using MockAIService fallback.");
        const lesson = await MockAIService.generateDiaryLesson(entry);
        return res.json({ lesson, source: "mock" });
      }

      // Gemini AI Service setup
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const targetLang = entry.targetLanguage || 'Mandarin Chinese';
      const systemPrompt = `You are a cute, comforting personal language-learning tutor for O'Lingua Diary.
Your mission is: "Your diary becomes your language teacher."
Given a personal diary entry in the user's native language (${entry.nativeLanguage || 'English'}), generate a comprehensive language lesson in their target language (${targetLang}).

For ${targetLang}:
1. Provide a natural, warm translation in ${targetLang}.
2. Provide pronunciation guide suitable for ${targetLang} (e.g., Pinyin with tone marks for Mandarin, Romaji for Japanese, Romanization for Korean, IPA / Phonetics for French/Spanish/German/Italian).
3. Provide a word-for-word literal translation into ${entry.nativeLanguage || 'English'}.
4. Breakdown key sentence structures into chunks.
5. Extract 4-6 key vocabulary words/phrases from the sentence with targetText in ${targetLang}, pronunciation guide, English meaning, part of speech, grammar role, difficulty, and 2-3 clean example sentences (with targetText in ${targetLang}, pronunciation, translation). Make sure to extract connectors, auxiliary verbs, and key modifiers.
6. Extract 2-3 key grammar points (such as conditionals, relative clauses, modal auxiliary patterns) with title, structure formula, short explanation, detailed explanation, common mistakes, and example sentences.
7. Create interactive annotations for all key target words/phrases in ${targetLang}.
8. Create a 4-question mini quiz testing the entry's vocabulary and grammar.`;

      const prompt = `Diary Entry: "${entry.originalText}"
Mood: ${entry.mood || 'Peaceful'}
Tags: ${(entry.topicTags || []).join(', ')}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              naturalTranslation: { type: Type.STRING },
              pronunciationValue: { type: Type.STRING },
              pronunciationNotes: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              literalTranslation: { type: Type.STRING },
              sentenceBreakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    chunkText: { type: Type.STRING },
                    pronunciation: { type: Type.STRING },
                    literalMeaning: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ["chunkText", "pronunciation", "literalMeaning", "explanation"]
                }
              },
              vocabularyItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    targetText: { type: Type.STRING },
                    pronunciation: { type: Type.STRING },
                    meaning: { type: Type.STRING },
                    partOfSpeech: { type: Type.STRING },
                    grammarRole: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    examples: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          targetText: { type: Type.STRING },
                          pronunciation: { type: Type.STRING },
                          translation: { type: Type.STRING }
                        },
                        required: ["targetText", "pronunciation", "translation"]
                      }
                    }
                  },
                  required: ["targetText", "pronunciation", "meaning"]
                }
              },
              grammarPoints: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    structure: { type: Type.STRING },
                    shortExplanation: { type: Type.STRING },
                    detailedExplanation: { type: Type.STRING },
                    commonMistakes: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    examples: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          targetText: { type: Type.STRING },
                          pronunciation: { type: Type.STRING },
                          translation: { type: Type.STRING }
                        },
                        required: ["targetText", "pronunciation", "translation"]
                      }
                    }
                  },
                  required: ["title", "structure", "shortExplanation"]
                }
              },
              annotations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    targetText: { type: Type.STRING },
                    annotationType: { type: Type.STRING },
                    pronunciation: { type: Type.STRING },
                    meaning: { type: Type.STRING },
                    quickExplanation: { type: Type.STRING },
                    detailedExplanation: { type: Type.STRING },
                    toneTips: { type: Type.STRING }
                  },
                  required: ["targetText", "pronunciation", "meaning", "quickExplanation"]
                }
              },
              miniQuiz: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ["question", "options", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["naturalTranslation", "pronunciationValue", "literalTranslation", "vocabularyItems", "grammarPoints"]
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');

      const lesson = {
        id: `lesson-${Date.now()}`,
        diaryEntryId: entry.id,
        naturalTranslation: parsed.naturalTranslation || '',
        pronunciation: {
          system: 'pinyin',
          value: parsed.pronunciationValue || '',
          notes: parsed.pronunciationNotes || []
        },
        literalTranslation: parsed.literalTranslation || '',
        sentenceBreakdown: (parsed.sentenceBreakdown || []).map((sb: any) => ({
          chunkText: sb.chunkText,
          pronunciation: sb.pronunciation,
          literalMeaning: sb.literalMeaning,
          explanation: sb.explanation
        })),
        vocabularyItems: (parsed.vocabularyItems || []).map((v: any, idx: number) => ({
          id: `v-gem-${idx}-${Date.now()}`,
          targetText: v.targetText,
          pronunciation: v.pronunciation,
          meaning: v.meaning,
          partOfSpeech: v.partOfSpeech || 'word',
          grammarRole: v.grammarRole || 'vocabulary',
          difficulty: v.difficulty || 'Beginner',
          targetLanguage: entry.targetLanguage || 'Mandarin Chinese',
          isSaved: false,
          masteryLevel: 'New seed',
          reviewCount: 0,
          createdAt: new Date().toISOString(),
          examples: (v.examples || []).map((e: any, eIdx: number) => ({
            id: `ex-${idx}-${eIdx}`,
            targetText: e.targetText,
            pronunciation: e.pronunciation,
            translation: e.translation
          }))
        })),
        grammarPoints: (parsed.grammarPoints || []).map((g: any, idx: number) => ({
          id: `g-gem-${idx}-${Date.now()}`,
          title: g.title,
          structure: g.structure,
          shortExplanation: g.shortExplanation,
          detailedExplanation: g.detailedExplanation || g.shortExplanation,
          commonMistakes: g.commonMistakes || [],
          targetLanguage: entry.targetLanguage || 'Mandarin Chinese',
          difficulty: 'Beginner',
          isSaved: false,
          createdAt: new Date().toISOString(),
          examples: (g.examples || []).map((e: any, eIdx: number) => ({
            id: `gex-${idx}-${eIdx}`,
            targetText: e.targetText,
            pronunciation: e.pronunciation,
            translation: e.translation
          }))
        })),
        annotations: (parsed.annotations || []).map((ann: any, idx: number) => ({
          id: `ann-gem-${idx}-${Date.now()}`,
          targetText: ann.targetText,
          annotationType: ann.annotationType || 'vocabulary',
          startIndex: idx * 2,
          endIndex: idx * 2 + ann.targetText.length,
          pronunciation: ann.pronunciation,
          meaning: ann.meaning,
          quickExplanation: ann.quickExplanation,
          detailedExplanation: ann.detailedExplanation || ann.quickExplanation,
          toneTips: ann.toneTips || '',
          examples: []
        })),
        miniQuiz: (parsed.miniQuiz || []).map((q: any, idx: number) => ({
          id: `q-gem-${idx}`,
          question: q.question,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          type: 'multipleChoice'
        })),
        createdAt: new Date().toISOString()
      };

      return res.json({ lesson, source: "gemini" });

    } catch (err: any) {
      console.error("[O'Lingua] Gemini API call error, falling back to mock:", err.message);
      const lesson = await MockAIService.generateDiaryLesson(req.body.entry);
      return res.json({ lesson, source: "mock-fallback", error: err.message });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[O'Lingua Diary Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
