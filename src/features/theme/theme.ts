import i18n from '#/app/i18n'
import type { GlassSetting, GlassSettings, Language } from './slice/theme-types'

export function initializeTheme() {
  const theme = localStorage.getItem('theme-mode') ?? 'system'

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  document.documentElement.classList.toggle('dark', isDark)
}

export function initializeThemePrimaryColor() {
  const primaryColor = localStorage.getItem('primary-color')

  document.documentElement.style.setProperty('--color-primary', primaryColor)
}

export function initializeSystemDir() {
  const dir = localStorage.getItem('dir') ?? 'ltr'

  if (dir === 'rtl') {
    document.dir = 'rtl'
  } else {
    document.dir = 'ltr'
  }
}

export function initializeSystemLanguage() {
  const language = localStorage.getItem('system-language') as Language

  if (language === 'english') {
    i18n.changeLanguage('en')
  }

  if (language === 'farsi') {
    i18n.changeLanguage('fa')
  }
}

export const glassVars: Record<GlassSetting, { name: string; unit: string }> = {
  bgOpacity: { name: '--glass-bg-opacity', unit: '' },
  borderOpacity: { name: '--glass-border-opacity', unit: '' },
  blur: { name: '--glass-blur', unit: 'px' },
  saturate: { name: '--glass-saturate', unit: '%' },
  shadowOpacity: { name: '--glass-shadow-opacity', unit: '' },
}

/** Sets overridden glass tokens on <html> and clears the rest */
export function applyGlassSettings(settings: GlassSettings) {
  const style = document.documentElement.style

  for (const [key, { name, unit }] of Object.entries(glassVars)) {
    const value = settings[key as GlassSetting]
    if (value === undefined) style.removeProperty(name)
    else style.setProperty(name, `${value}${unit}`)
  }
}

export function getStoredGlassSettings(): GlassSettings {
  try {
    return JSON.parse(localStorage.getItem('glass-settings') ?? '{}')
  } catch {
    return {}
  }
}

export function initializeGlass() {
  applyGlassSettings(getStoredGlassSettings())
}
