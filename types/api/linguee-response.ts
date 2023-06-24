export interface LingueeResponse extends Array<LingueeItem>{}

export interface AudioLink {
  url: String;
  lang: String;
}

export interface TranslationExample {
  src: String;
  dst: String;
}

export interface Translation {
  featured: Boolean;
  text: String;
  pos: String;
  audio_links: AudioLink[] | null;
  examples: TranslationExample[];
  usage_frequency: String | null;
}

export interface LingueeItem {
  featured: boolean;
  text: String;
  pos: String;
  forms: String[];
  grammar_info: null;
  audio_links: AudioLink[];
  translations: Translation[];
}
