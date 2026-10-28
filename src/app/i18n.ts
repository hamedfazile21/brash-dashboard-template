import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

import enCommon from '@/locales/en/common.json'

// English is the fallback and stays bundled; other languages are fetched as
// separate chunks the first time they are selected.
i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    resources: {
      en: {
        common: enCommon,
      },
    },
    partialBundledLanguages: true,

    lng: 'en',
    fallbackLng: 'en',

    defaultNS: 'common',
    ns: ['common'],

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
