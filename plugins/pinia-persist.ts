import { PiniaPluginContext } from 'pinia'
import { get, set } from 'idb-keyval';

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

  return {}
}

// todo - remove any
export default defineNuxtPlugin(({ $pinia }:any) => {
  $pinia.use(PersistPiniaLocalStorage);
})