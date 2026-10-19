import i18n from '#/app/i18n'
import type {
  GlassSetting,
  GlassSettings,
  Language,
  SpacingSetting,
  SpacingSettings,
} from './slice/theme-types'

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

type CssVar = {
  name: string
  unit: string
  /** A second token kept in sync, for values CSS can't derive itself */
  linked?: { name: string; value: (value: number) => string }
}

type CssVarMap<TKey extends string> = Record<TKey, CssVar>

export const glassVars: CssVarMap<GlassSetting> = {
  bgOpacity: { name: '--glass-bg-opacity', unit: '' },
  borderOpacity: { name: '--glass-border-opacity', unit: '' },
  blur: { name: '--glass-blur', unit: 'px' },
  saturate: { name: '--glass-saturate', unit: '%' },
  shadowOpacity: { name: '--glass-shadow-opacity', unit: '' },
}

export const spacingVars: CssVarMap<SpacingSetting> = {
  fontSize: {
    name: '--font-size',
    unit: 'px',
    // Unitless ratio for icon zoom — CSS can't divide px by px everywhere yet
    linked: { name: '--font-scale', value: (v) => String(v / 16) },
  },
  cardPadding: { name: '--card-padding', unit: 'px' },
  btnPadding: { name: '--btn-padding', unit: 'px' },
}

/** Sets overridden tokens on <html> and clears the rest */
export function applyCssVars<TKey extends string>(
  vars: CssVarMap<TKey>,
  settings: Partial<Record<TKey, number>>,
) {
  const style = document.documentElement.style

  for (const key of Object.keys(vars) as TKey[]) {
    const { name, unit, linked } = vars[key]
    const value = settings[key]

    if (value === undefined) {
      style.removeProperty(name)
      if (linked) style.removeProperty(linked.name)
    } else {
      style.setProperty(name, `${value}${unit}`)
      if (linked) style.setProperty(linked.name, linked.value(value))
    }
  }
}

/** Value from theme.css for the active theme, ignoring any inline override */
export function readCssVarDefault(name: string) {
  const html = document.documentElement
  const inline = html.style.getPropertyValue(name)
  html.style.removeProperty(name)
  const value = parseFloat(getComputedStyle(html).getPropertyValue(name))
  if (inline) html.style.setProperty(name, inline)
  return value
}

export function getStoredOverrides<T extends object>(storageKey: string): T {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? '{}')
  } catch {
    return {} as T
  }
}

export function initializeCssVarOverrides() {
  applyCssVars(glassVars, getStoredOverrides<GlassSettings>('glass-settings'))
  applyCssVars(
    spacingVars,
    getStoredOverrides<SpacingSettings>('spacing-settings'),
  )
}
