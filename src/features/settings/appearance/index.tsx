import {
  Check,
  LaptopMinimal,
  Moon,
  PanelLeft,
  PanelLeftClose,
  Pipette,
  RotateCcw,
  Sun,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import i18n from '#/app/i18n'
import { AfghanistanFlag, EnglishFlag } from '#/assets'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import {
  changeDirection,
  changeLanguage,
  changeMainWidth,
  changePrimaryColor,
  setGlass,
  setSpacing,
  toggleSidebar,
  toggleTheme,
} from '#/features/theme/slice/theme-slice'
import type {
  Language,
  MainWidth,
  SidebarStatusType,
  ThemeMode,
} from '#/features/theme/slice/theme-types'
import SettingsSection from '../components/settings-section'
import GlassSettings from './components/glass-settings'
import OptionCard from './components/option-card'
import SpacingSettings from './components/spacing-settings'
import {
  SidebarPreview,
  ThemePreview,
  WidthPreview,
} from './components/previews'

const themeOptions: { value: ThemeMode; title: string; icon: typeof Sun }[] = [
  { value: 'light', title: 'Light', icon: Sun },
  { value: 'dark', title: 'Dark', icon: Moon },
  { value: 'system', title: 'System', icon: LaptopMinimal },
]

/** null = the default primary from theme.css */
const accentColors: { title: string; value: string | null; swatch: string }[] =
  [
    { title: 'Blue', value: null, swatch: 'rgb(59 130 246)' },
    { title: 'Indigo', value: 'rgb(99 102 241)', swatch: 'rgb(99 102 241)' },
    { title: 'Violet', value: 'rgb(139 92 246)', swatch: 'rgb(139 92 246)' },
    { title: 'Pink', value: 'rgb(236 72 153)', swatch: 'rgb(236 72 153)' },
    { title: 'Rose', value: 'rgb(244 63 94)', swatch: 'rgb(244 63 94)' },
    { title: 'Orange', value: 'rgb(249 115 22)', swatch: 'rgb(249 115 22)' },
    { title: 'Emerald', value: 'rgb(16 185 129)', swatch: 'rgb(16 185 129)' },
    { title: 'Teal', value: 'rgb(20 184 166)', swatch: 'rgb(20 184 166)' },
  ]

const sidebarOptions: {
  value: SidebarStatusType
  title: string
  icon: typeof Sun
}[] = [
  { value: 'vertical', title: 'Expanded', icon: PanelLeft },
  { value: 'collapsible-vertical', title: 'Collapsed', icon: PanelLeftClose },
]

const widthOptions: { value: MainWidth; title: string; hint: string }[] = [
  { value: '5xl', title: 'Compact', hint: '1024px' },
  { value: '6xl', title: 'Comfortable', hint: '1152px' },
  { value: '7xl', title: 'Wide', hint: '1280px' },
  { value: 'full', title: 'Full width', hint: '100%' },
]

const languageOptions: {
  value: Language
  title: string
  native: string
  flag: string
  dir: 'ltr' | 'rtl'
}[] = [
  {
    value: 'english',
    title: 'English',
    native: 'English',
    flag: EnglishFlag,
    dir: 'ltr',
  },
  {
    value: 'farsi',
    title: 'Farsi',
    native: 'فارسی',
    flag: AfghanistanFlag,
    dir: 'rtl',
  },
]

function AppearanceSettings() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { themeMode, primaryColor, sidebarStatus, mainWidth, language } =
    useAppSelector((state) => state.themeConfig)

  const isCustomColor =
    primaryColor !== null &&
    !accentColors.some((color) => color.value === primaryColor)

  const handleChangeLanguage = (value: Language) => {
    const option = languageOptions.find((item) => item.value === value)!
    dispatch(changeLanguage(value))
    dispatch(changeDirection(option.dir))
    i18n.changeLanguage(value === 'farsi' ? 'fa' : 'en')
  }

  const handleReset = () => {
    dispatch(toggleTheme('system'))
    dispatch(changePrimaryColor(null))
    dispatch(setGlass({}))
    dispatch(setSpacing({}))
    dispatch(toggleSidebar('vertical'))
    dispatch(changeMainWidth('full'))
  }

  return (
    <div className="flex flex-col gap-6">
      <SettingsSection
        title="Theme"
        description="Pick how the dashboard looks to you"
      >
        <div
          role="radiogroup"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {themeOptions.map(({ value, title, icon: Icon }) => (
            <OptionCard
              key={value}
              selected={themeMode === value}
              onSelect={() => dispatch(toggleTheme(value))}
              preview={<ThemePreview mode={value} />}
              icon={<Icon size={16} />}
              label={t(title)}
              hint={value === 'system' ? t('Auto') : undefined}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Accent color"
        description="Used for buttons, links, charts and highlights"
      >
        <div className="flex flex-col gap-y-5">
          <div role="radiogroup" className="flex flex-wrap items-center gap-3">
            {accentColors.map(({ title, value, swatch }) => {
              const selected = primaryColor === value
              return (
                <button
                  key={title}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={t(title)}
                  title={t(title)}
                  onClick={() => dispatch(changePrimaryColor(value))}
                  className={`flex size-9 items-center justify-center rounded-full text-white outline-none ring-offset-2 ring-offset-background transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-foreground ${
                    selected ? 'scale-110 ring-2' : ''
                  }`}
                  style={{
                    background: swatch,
                    ['--tw-ring-color' as string]: swatch,
                  }}
                >
                  <Check
                    size={16}
                    strokeWidth={3}
                    className={`transition-all duration-200 ${selected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                  />
                </button>
              )
            })}

            <span className="mx-1 h-6 w-px bg-borderColor" />

            {/* Custom color — native picker behind a rainbow swatch */}
            <label
              title={t('Custom')}
              className={`relative flex size-9 cursor-pointer items-center justify-center rounded-full text-white ring-offset-2 ring-offset-background transition-all duration-200 hover:scale-110 focus-within:ring-2 focus-within:ring-foreground ${
                isCustomColor ? 'scale-110 ring-2' : ''
              }`}
              style={{
                background: isCustomColor
                  ? primaryColor
                  : 'conic-gradient(from 180deg, #f43f5e, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #f43f5e)',
                ['--tw-ring-color' as string]: isCustomColor
                  ? primaryColor
                  : 'var(--color-primary)',
              }}
            >
              {isCustomColor ? (
                <Check size={16} strokeWidth={3} />
              ) : (
                <Pipette size={15} strokeWidth={2.5} className="drop-shadow" />
              )}
              <input
                type="color"
                aria-label={t('Custom')}
                value={isCustomColor ? primaryColor : '#3b82f6'}
                onChange={(e) => dispatch(changePrimaryColor(e.target.value))}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>
          </div>

          {/* Live sample of the accent on real components */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-borderColor bg-background/50 p-4">
            <button type="button" className="btn btn-primary">
              {t('Primary button')}
            </button>
            <button type="button" className="btn btn-primary-outline">
              {t('Outline')}
            </button>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {t('Badge')}
            </span>
            <span className="text-sm font-medium text-primary underline underline-offset-4">
              {t('Link')}
            </span>
            <span className="h-1.5 min-w-24 flex-1 overflow-hidden rounded-full bg-surface-hover">
              <span className="block h-full w-2/3 rounded-full bg-primary" />
            </span>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Glass effect"
        description="Tune the frosted glass used by cards, popovers and panels"
      >
        <GlassSettings />
      </SettingsSection>

      <SettingsSection
        title="Spacing"
        description="Adjust the padding inside cards and buttons"
      >
        <SpacingSettings />
      </SettingsSection>

      <SettingsSection
        title="Layout"
        description="Control the sidebar and how wide the content can grow"
      >
        <div className="flex flex-col gap-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              {t('Sidebar')}
            </h3>
            <div
              role="radiogroup"
              className="grid grid-cols-2 gap-4 sm:max-w-md"
            >
              {sidebarOptions.map(({ value, title, icon: Icon }) => (
                <OptionCard
                  key={value}
                  selected={sidebarStatus === value}
                  onSelect={() => dispatch(toggleSidebar(value))}
                  preview={
                    <SidebarPreview
                      collapsed={value === 'collapsible-vertical'}
                    />
                  }
                  icon={<Icon size={16} className="rtl:-scale-x-100" />}
                  label={t(title)}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-borderColor pt-6">
            <h3 className="mb-3 text-sm font-medium text-foreground">
              {t('Content width')}
            </h3>
            <div
              role="radiogroup"
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {widthOptions.map(({ value, title, hint }) => (
                <OptionCard
                  key={value}
                  selected={mainWidth === value}
                  onSelect={() => dispatch(changeMainWidth(value))}
                  preview={<WidthPreview width={value} />}
                  label={t(title)}
                  hint={hint}
                />
              ))}
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Language"
        description="Text direction switches automatically with the language"
      >
        <div
          role="radiogroup"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {languageOptions.map(({ value, title, native, flag, dir }) => {
            const selected = language === value
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChangeLanguage(value)}
                className={`flex items-center gap-x-3 rounded-xl border-2 p-3 text-start outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary ${
                  selected
                    ? 'border-primary bg-primary/5'
                    : 'border-borderColor hover:border-muted/40 hover:bg-surface-hover/40'
                }`}
              >
                <img
                  src={flag}
                  alt=""
                  className="size-9 shrink-0 rounded-full object-cover ring-1 ring-borderColor"
                />
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-sm font-medium text-foreground"
                    dir={dir}
                  >
                    {native}
                  </span>
                  <span className="block text-xs text-muted">{t(title)}</span>
                </span>
                <span className="rounded-md bg-surface-hover px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted uppercase">
                  {dir}
                </span>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    selected
                      ? 'border-primary bg-primary text-white'
                      : 'border-borderColor'
                  }`}
                >
                  {selected && <Check size={11} strokeWidth={3.5} />}
                </span>
              </button>
            )
          })}
        </div>
      </SettingsSection>

      <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            {t('Reset appearance')}
          </p>
          <p className="text-sm text-muted">
            {t(
              'Restore the theme, accent color, glass, spacing and layout to their defaults',
            )}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary shrink-0"
          onClick={handleReset}
        >
          <RotateCcw size={16} />
          {t('Reset to defaults')}
        </button>
      </div>
    </div>
  )
}

export default AppearanceSettings
