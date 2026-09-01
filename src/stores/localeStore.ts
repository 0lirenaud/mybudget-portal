import i18n from '@/i18n/i18n'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type AvailableLocales = 'en' | 'fr'

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const locale = ref<AvailableLocales>('en')

    const updateLocale = (newLocale: AvailableLocales) => {
      locale.value = newLocale
    }

    watch(
      locale,
      (newLocale) => {
        i18n.global.locale.value = newLocale
      },
      { immediate: true },
    )

    return {
      locale,
      updateLocale,
    }
  },
  {
    persist: true,
  },
)
