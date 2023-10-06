import { PiniaPluginContext } from 'pinia'
import { get, set } from 'idb-keyval';
import { toRaw } from 'vue';

async function PersistPiniaLocalStorage({ store }: PiniaPluginContext) {

  if(store.$id === 'user-config') {

    if(!process.server) {
      const defaultLangFromStorage = get('lang');
      store.$state.config.lang = await defaultLangFromStorage;
    }

    store.$onAction(
      ({
        name,
        args,
      }) => {
        if(name === 'selectLanguage') {
          const lang = args[0];
  
          set('lang', lang);
        }
      });

  }
    
  if(store.$id === 'saved-lists') {
    if(!process.server) {
      const listFromStorage = get('list');
      if(await listFromStorage) {
        const parsedList = JSON.parse(await listFromStorage);
        store.$state.list = parsedList;
      }
    }

    store.$onAction(({name, args}) => {
      if(name === 'doSaveToList') {
        const currentState = store.$state.list ? store.$state.list : [];
        set('list', JSON.stringify([...currentState, args[0]]))
      }
      if(name === 'removeFromList') {
        const index = args[0];
        const currentState = [...toRaw(store.getList)];
        const modifiedState = currentState.toSpliced(index, 1);
        set('list', JSON.stringify([...modifiedState]));
      }
    })

  }

  return {}
}

// todo - remove any
export default defineNuxtPlugin(({ $pinia }:any) => {
  $pinia.use(PersistPiniaLocalStorage);
})