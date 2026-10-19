import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import { changeGlass, setGlass } from '#/features/theme/slice/theme-slice'
import type {
  GlassSetting,
  GlassSettings as GlassSettingsType,
} from '#/features/theme/slice/theme-types'
import { glassVars, readCssVarDefault } from '#/features/theme/theme'
import SettingSlider from './setting-slider'

const sliders: {
  key: GlassSetting
  title: string
  min: number
  max: number
  step: number
  format: (value: number) => string
}[] = [
  {
    key: 'blur',
    title: 'Blur',
    min: 0,
    max: 48,
    step: 1,
    format: (v) => `${v}px`,
  },
  {
    key: 'bgOpacity',
    title: 'Opacity',
    min: 0.1,
    max: 1,
    step: 0.05,
    format: (v) => `${Math.round(v * 100)}%`,
  },
  {
    key: 'saturate',
    title: 'Saturation',
    min: 100,
    max: 200,
    step: 5,
    format: (v) => `${v}%`,
  },
  {
    key: 'borderOpacity',
    title: 'Border',
    min: 0,
    max: 0.3,
    step: 0.01,
    format: (v) => `${Math.round(v * 100)}%`,
  },
  {
    key: 'shadowOpacity',
    title: 'Shadow',
    min: 0,
    max: 0.5,
    step: 0.01,
    format: (v) => `${Math.round(v * 100)}%`,
  },
]

const presets: { title: string; settings: GlassSettingsType }[] = [
  {
    title: 'Clear',
    settings: {
      blur: 10,
      bgOpacity: 0.2,
      saturate: 180,
      borderOpacity: 0.15,
      shadowOpacity: 0.1,
    },
  },
  { title: 'Frosted', settings: {} },
  {
    title: 'Solid',
    settings: {
      blur: 0,
      bgOpacity: 1,
      saturate: 100,
      borderOpacity: 0.1,
      shadowOpacity: 0.08,
    },
  },
]

function isSamePreset(a: GlassSettingsType, b: GlassSettingsType) {
  const keys = Object.keys(glassVars) as GlassSetting[]
  return keys.every((key) => a[key] === b[key])
}

function GlassSettings() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const glass = useAppSelector((state) => state.themeConfig.glass)
  // Subscribed so the theme.css defaults are re-read when light/dark switches
  useAppSelector((state) => state.themeConfig.themeMode)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Live preview — a real .card floating over colorful blobs */}
      <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-xl border border-borderColor bg-background p-6">
        <span className="absolute -inset-s-6 -top-8 size-36 rounded-full bg-primary opacity-80" />
        <span className="absolute inset-e-4 top-6 size-24 rounded-full bg-pink-500 opacity-80" />
        <span className="absolute -bottom-2 inset-s-1/3 size-32 rounded-full bg-amber-400 opacity-80" />
        <span className="absolute inset-e-10 bottom-4 size-16 rounded-full bg-emerald-400 opacity-80" />

        <div className="card relative w-full max-w-64">
          <div className="flex items-center gap-x-3">
            <span className="size-9 shrink-0 rounded-full bg-primary/80" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                {t('Glass card')}
              </p>
              <p className="text-xs text-muted">{t('Live preview')}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-y-1.5">
            <span className="h-1.5 w-full rounded-full bg-foreground/15" />
            <span className="h-1.5 w-4/5 rounded-full bg-foreground/15" />
            <span className="h-1.5 w-3/5 rounded-full bg-foreground/15" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="btn-group w-full" role="radiogroup">
          {presets.map(({ title, settings }) => {
            const selected = isSamePreset(glass, settings)
            return (
              <button
                key={title}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => dispatch(setGlass(settings))}
                className={`btn flex-1 ${selected ? 'btn-primary' : 'btn-secondary'}`}
              >
                {t(title)}
              </button>
            )
          })}
        </div>

        {sliders.map(({ key, ...slider }) => (
          <SettingSlider
            key={key}
            id={`glass-${key}`}
            {...slider}
            value={glass[key] ?? readCssVarDefault(glassVars[key].name)}
            overridden={glass[key] !== undefined}
            onChange={(value) => dispatch(changeGlass({ key, value }))}
            onReset={() => dispatch(changeGlass({ key, value: null }))}
          />
        ))}
      </div>
    </div>
  )
}

export default GlassSettings
