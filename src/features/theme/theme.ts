import i18n from '#/app/i18n'
import type {
  DarkPalette,
  DarkPreset,
  GlassSetting,
  GlassSettings,
  Language,
  PaletteToken,
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

export async function initializeSystemLanguage() {
  const language = localStorage.getItem('system-language') as Language

  if (language === 'english') {
    await i18n.changeLanguage('en')
  }

  if (language === 'farsi') {
    await i18n.changeLanguage('fa')
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
  applyDarkPalette(getStoredDarkPalette())
}

export const paletteTokenVars: Record<PaletteToken, string> = {
  background: '--background',
  surface: '--surface',
  surfaceHover: '--surface-hover',
  border: '--border',
  foreground: '--foreground',
  mutedForeground: '--muted-foreground',
}

/** slate mirrors the .dark block in theme.css — it's the "no override" preset */
export const darkPresets: Record<DarkPreset, Record<PaletteToken, string>> = {
  slate: {
    background: '#020618',
    surface: '#1e293b',
    surfaceHover: '#334155',
    border: '#1f262f',
    foreground: '#f8fafc',
    mutedForeground: '#94a3b8',
  },
  zinc: {
    background: '#09090b',
    surface: '#18181b',
    surfaceHover: '#27272a',
    border: '#232326',
    foreground: '#fafafa',
    mutedForeground: '#a1a1aa',
  },
  midnight: {
    background: '#0b1120',
    surface: '#131d33',
    surfaceHover: '#1e2b47',
    border: '#1a2339',
    foreground: '#e6edf7',
    mutedForeground: '#8b9bb8',
  },
  oled: {
    background: '#000000',
    surface: '#111113',
    surfaceHover: '#1d1d20',
    border: '#1f1f23',
    foreground: '#f5f5f5',
    mutedForeground: '#9a9aa0',
  },
}

export const defaultDarkPalette: DarkPalette = {
  preset: 'slate',
  overrides: {},
}

/**
 * Dark colors can't go inline on <html> like the other overrides — they'd
 * leak into light mode. Instead a <style> tag re-declares them under
 * :root.dark, which outranks theme.css's .dark block.
 */
export function applyDarkPalette({ preset, overrides }: DarkPalette) {
  const values =
    preset === 'slate' ? overrides : { ...darkPresets[preset], ...overrides }
  const declarations = (Object.keys(values) as PaletteToken[])
    .map((token) => `${paletteTokenVars[token]}: ${values[token]};`)
    .join(' ')

  let tag = document.getElementById('dark-palette')
  if (!declarations) {
    tag?.remove()
    return
  }
  if (!tag) {
    tag = document.createElement('style')
    tag.id = 'dark-palette'
    document.head.appendChild(tag)
  }
  tag.textContent = `:root.dark { ${declarations} }`
}

export function getStoredDarkPalette(): DarkPalette {
  return { ...defaultDarkPalette, ...getStoredOverrides('dark-palette') }
}
