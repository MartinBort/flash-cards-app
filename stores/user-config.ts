import { defineStore } from 'pinia'

export const userConfigStore = defineStore({
  id: 'user-config',
  state: () => {
    return {
      config: {
        lang: null as string | null
      }
    }
  },
  actions: {
    selectLanguage(value: string | null) {
      this.config.lang = value;
    },
  },
  getters: {
    selectedLanguage: state => state.config.lang,
  },
});