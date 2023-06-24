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
      this.list.push(value)
    },
  },
  getters: {
    getList: state => state.list,
  },
});