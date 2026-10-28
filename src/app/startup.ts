import {
  initializeCssVarOverrides,
  initializeSystemDir,
  initializeSystemLanguage,
  initializeTheme,
  initializeThemePrimaryColor,
} from '@/features/theme/theme'

export async function startup() {
  initializeTheme()

  initializeThemePrimaryColor()

  initializeCssVarOverrides()

  initializeSystemDir()

  // Awaited so a lazily loaded language is ready before the first render
  await initializeSystemLanguage()

  // Future initialization
  // await restoreSession();
  // await fetchSettings();
  // await initializeAnalytics();
}
