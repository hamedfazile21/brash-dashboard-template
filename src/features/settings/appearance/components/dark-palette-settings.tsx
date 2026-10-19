import { Moon, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import {
  changeDarkToken,
  setDarkPreset,
  toggleTheme,
} from '#/features/theme/slice/theme-slice'
import type {
  DarkPreset,
  PaletteToken,
} from '#/features/theme/slice/theme-types'
import { darkPresets } from '#/features/theme/theme'
import ColorPickerPopover from './color-picker-popover'
import OptionCard from './option-card'
import { MiniDashboard, paletteFromTokens } from './previews'

const presetOptions: { value: DarkPreset; title: string; hint: string }[] = [
  { value: 'slate', title: 'Slate', hint: 'Default' },
  { value: 'zinc', title: 'Zinc', hint: 'Neutral' },
  { value: 'midnight', title: 'Midnight', hint: 'Navy' },
  { value: 'oled', title: 'OLED', hint: 'True black' },
]

const tokenOptions: { token: PaletteToken; title: string; hint: string }[] = [
  { token: 'background', title: 'Background', hint: 'Page' },
  { token: 'surface', title: 'Surface', hint: 'Cards & panels' },
  { token: 'surfaceHover', title: 'Surface hover', hint: 'Hover & tracks' },
  { token: 'border', title: 'Border', hint: 'Dividers' },
  { token: 'foreground', title: 'Text', hint: 'Headings & body' },
  { token: 'mutedForeground', title: 'Muted text', hint: 'Hints & labels' },
]

function DarkPaletteSettings() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { darkPalette, themeMode } = useAppSelector(
    (state) => state.themeConfig,
  )
  const { preset, overrides } = darkPalette
  const tokens = { ...darkPresets[preset], ...overrides }
  const isCustomized = Object.keys(overrides).length > 0
  // themeMode in the selector keeps this fresh when the theme switches
  const isDark =
    themeMode === 'dark' || document.documentElement.classList.contains('dark')

  return (
    <div className="flex flex-col gap-y-6">
      {!isDark && (
        <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:flex-row sm:items-center">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Moon size={16} />
          </span>
          <p className="flex-1 text-sm text-foreground">
            {t(
              'You are in light mode — switch to dark to see these colors across the app.',
            )}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm shrink-0"
            onClick={() => dispatch(toggleTheme('dark'))}
          >
            {t('Switch to dark')}
          </button>
        </div>
      )}

      <div role="radiogroup" className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {presetOptions.map(({ value, title, hint }) => (
          <OptionCard
            key={value}
            selected={preset === value}
            onSelect={() => dispatch(setDarkPreset(value))}
            preview={
              <div className="aspect-16/10 w-full">
                <MiniDashboard
                  palette={paletteFromTokens(
                    preset === value ? tokens : darkPresets[value],
                  )}
                />
              </div>
            }
            label={t(title)}
            hint={preset === value && isCustomized ? t('Customized') : t(hint)}
          />
        ))}
      </div>

      <div className="border-t border-borderColor pt-6">
        <div className="mb-3 flex items-center justify-between gap-x-2">
          <h3 className="text-sm font-medium text-foreground">
            {t('Customize colors')}
          </h3>
          {isCustomized && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => dispatch(setDarkPreset(preset))}
            >
              <RotateCcw size={13} />
              {t('Reset colors')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tokenOptions.map(({ token, title, hint }) => {
            const overridden = overrides[token] !== undefined
            return (
              <ColorPickerPopover
                key={token}
                getInitialColor={() => tokens[token]}
                onConfirm={(value) =>
                  dispatch(changeDarkToken({ token, value }))
                }
                trigger={
                  <button
                    type="button"
                    className={`group flex items-center gap-x-3 rounded-xl border p-2.5 text-start outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary ${
                      overridden
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-borderColor hover:border-muted/40 hover:bg-surface-hover/40'
                    }`}
                  >
                    <span
                      className="size-9 shrink-0 rounded-lg shadow-inner ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-105 dark:ring-white/15"
                      style={{ background: tokens[token] }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-foreground">
                        {t(title)}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {t(hint)}
                      </span>
                    </span>
                    <span
                      className={`font-mono text-xs uppercase ${overridden ? 'text-primary' : 'text-muted'}`}
                      dir="ltr"
                    >
                      {tokens[token]}
                    </span>
                  </button>
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DarkPaletteSettings
