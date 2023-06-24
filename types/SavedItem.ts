export interface SavedItem {
  lang: string,
  text: string,
  type: string
  translations: Translation[];
}

export interface Translation {
  featured: Boolean;
  text: String;
  examples: TranslationExample[];
}

export interface TranslationExample {
  src: String;
  dst: String;
}