type TranslationFromWord = {
  grammar: string | null;
  source: string;
};

type TranslationToWord = {
  grammar: string | null;
  meaning: string;
  notes: string | null;
};

type Translation = {
  context: string;
  from_example: string;
  from_word: TranslationFromWord;
  to_example: string;
  to_word: TranslationToWord[];
};

type TranslationGroup = {
  title: string;
  entries: Translation[];
};

type TranslationResponse = {
  word: string;
  from_lang: string;
  to_lang: string;
  url: string;
  translations: TranslationGroup[];
};
