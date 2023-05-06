export interface LingueeResponse extends Array<Item>{}

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

export interface Item {
  featured: boolean;
  text: String;
  pos: String;
  forms: String[];
  grammar_info: null;
  audio_links: AudioLink[];
  translations: Translation[];
}
