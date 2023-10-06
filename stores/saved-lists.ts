import { defineStore } from 'pinia'

export const savedListsStore = defineStore({
  id: 'saved-lists',
  state: () => {
    return {
      list: <any>[]
    }
  },
  actions: {
    doSaveToList(value: any) {
      this.list.push(value);
    },
    removeFromList(index: number) {
      this.list.splice(index, 1);
    }
  },
  getters: {
    getList: state => state.list,
  },
});