import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  GlassSetting,
  GlassSettings,
  Language,
  SpacingSetting,
  SpacingSettings,
  MainWidth,
  SidebarStatusType,
  ThemeMode,
} from './theme-types'
import i18n from '#/app/i18n'
import {
  applyCssVars,
  getStoredOverrides,
  glassVars,
  spacingVars,
} from '../theme'

interface ThemeState {
  themeMode: ThemeMode
  direction: 'ltr' | 'rtl'
  sidebarStatus: SidebarStatusType
  language: Language
  mainWidth: MainWidth
  primaryColor: string | null
  glass: GlassSettings
  spacing: SpacingSettings
}

const initialState: ThemeState = {
  themeMode: (localStorage.getItem('theme-mode') as ThemeMode) || 'system',
  direction: 'ltr',
  sidebarStatus:
    (localStorage.getItem('sidebar-status') as SidebarStatusType) || 'vertical',
  language: (localStorage.getItem('system-language') as Language) || 'english',
  mainWidth: (localStorage.getItem('main-width') as MainWidth) || 'full',
  primaryColor: localStorage.getItem('primary-color'),
  glass: getStoredOverrides<GlassSettings>('glass-settings'),
  spacing: getStoredOverrides<SpacingSettings>('spacing-settings'),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload
    },
    toggleTheme(state, action: PayloadAction<ThemeMode>) {
      const theme = action.payload
      const html = document.documentElement

      html.classList.remove('dark')

      switch (theme) {
        case 'light':
          break

        case 'dark':
          html.classList.add('dark')
          break

        case 'system':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark')
          }
          break
      }

      localStorage.setItem('theme-mode', theme)
      state.themeMode = theme
    },

    changeDirection(state, action: PayloadAction<'ltr' | 'rtl'>) {
      const selectedDir = action.payload
      document.dir = selectedDir
      localStorage.setItem('dir', selectedDir)
      state.direction = selectedDir
    },

    changeLanguage(state, action: PayloadAction<Language>) {
      const selectedLanguage = action.payload
      localStorage.setItem('system-language', selectedLanguage)
      state.language = selectedLanguage
    },

    toggleSidebar(
      state,
      action: PayloadAction<'vertical' | 'collapsible-vertical'>,
    ) {
      localStorage.setItem('sidebar-status', action.payload)
      state.sidebarStatus = action.payload
    },

    changeMainWidth(state, action: PayloadAction<MainWidth>) {
      localStorage.setItem('main-width', action.payload)
      state.mainWidth = action.payload
    },

    /** null falls back to the default primary defined in theme.css */
    changePrimaryColor(state, action: PayloadAction<string | null>) {
      const color = action.payload
      const html = document.documentElement

      if (color) {
        html.style.setProperty('--color-primary', color)
        localStorage.setItem('primary-color', color)
      } else {
        html.style.removeProperty('--color-primary')
        localStorage.removeItem('primary-color')
      }

      state.primaryColor = color
    },

    /** value null drops the override so theme.css applies again */
    changeGlass(
      state,
      action: PayloadAction<{ key: GlassSetting; value: number | null }>,
    ) {
      const { key, value } = action.payload
      const glass = { ...state.glass }

      if (value === null) delete glass[key]
      else glass[key] = value

      applyCssVars(glassVars, glass)
      localStorage.setItem('glass-settings', JSON.stringify(glass))
      state.glass = glass
    },

    /** Replaces every override at once — {} restores the theme.css look */
    setGlass(state, action: PayloadAction<GlassSettings>) {
      applyCssVars(glassVars, action.payload)
      localStorage.setItem('glass-settings', JSON.stringify(action.payload))
      state.glass = action.payload
    },

    changeSpacing(
      state,
      action: PayloadAction<{ key: SpacingSetting; value: number | null }>,
    ) {
      const { key, value } = action.payload
      const spacing = { ...state.spacing }

      if (value === null) delete spacing[key]
      else spacing[key] = value

      applyCssVars(spacingVars, spacing)
      localStorage.setItem('spacing-settings', JSON.stringify(spacing))
      state.spacing = spacing
    },

    setSpacing(state, action: PayloadAction<SpacingSettings>) {
      applyCssVars(spacingVars, action.payload)
      localStorage.setItem('spacing-settings', JSON.stringify(action.payload))
      state.spacing = action.payload
    },
  },
})

export const {
  setTheme,
  toggleTheme,
  changeDirection,
  toggleSidebar,
  changeLanguage,
  changeMainWidth,
  changePrimaryColor,
  changeGlass,
  setGlass,
  changeSpacing,
  setSpacing,
} = themeSlice.actions

export default themeSlice.reducer
