export type ThemeMode = 'light' | 'dark' | 'system'
export type SidebarStatusType = 'vertical' | 'collapsible-vertical'
export type Language = 'english' | 'farsi'
export type MainWidth = '5xl' | '6xl' | '7xl' | 'full'

export type GlassSetting =
  'bgOpacity' | 'borderOpacity' | 'blur' | 'saturate' | 'shadowOpacity'
/** Only the values the user changed — anything missing uses theme.css */
export type GlassSettings = Partial<Record<GlassSetting, number>>

export type SpacingSetting = 'fontSize' | 'cardPadding' | 'btnPadding'
/** Only the values the user changed — anything missing uses theme.css */
export type SpacingSettings = Partial<Record<SpacingSetting, number>>
