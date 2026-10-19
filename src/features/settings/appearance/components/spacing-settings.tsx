import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import { changeSpacing, setSpacing } from '#/features/theme/slice/theme-slice'
import type {
  SpacingSetting,
  SpacingSettings as SpacingSettingsType,
} from '#/features/theme/slice/theme-types'
import { readCssVarDefault, spacingVars } from '#/features/theme/theme'
import SettingSlider from './setting-slider'

const sliders: {
  key: SpacingSetting
  title: string
  min: number
  max: number
  step: number
  format: (value: number) => string
}[] = [
  {
    key: 'cardPadding',
    title: 'Card padding',
    min: 8,
    max: 32,
    step: 2,
    format: (v) => `${v}px`,
  },
  {
    key: 'btnPadding',
    title: 'Button padding',
    min: 4,
    max: 14,
    step: 1,
    format: (v) => `${v}px`,
  },
]

const presets: { title: string; settings: SpacingSettingsType }[] = [
  { title: 'Compact', settings: { cardPadding: 12, btnPadding: 6 } },
  { title: 'Default', settings: {} },
  { title: 'Spacious', settings: { cardPadding: 24, btnPadding: 10 } },
]

function isSamePreset(a: SpacingSettingsType, b: SpacingSettingsType) {
  const keys = Object.keys(spacingVars) as SpacingSetting[]
  return keys.every((key) => a[key] === b[key])
}

function SpacingSettings() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const spacing = useAppSelector((state) => state.themeConfig.spacing)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Live preview — real .card and .btn, so padding updates as you drag */}
      <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-borderColor bg-background/50 p-6">
        <div className="card w-full max-w-72">
          <div className="card-header">
            <span className="card-title">{t('Card title')}</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {t('New')}
            </span>
          </div>
          <p className="card-body">
            {t('Padding here follows your card and button settings.')}
          </p>
          <div className="card-footer">
            <button type="button" className="btn btn-secondary btn-sm">
              {t('Cancel')}
            </button>
            <button type="button" className="btn btn-primary">
              <Plus size={16} />
              {t('Create')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="btn-group w-full" role="radiogroup">
          {presets.map(({ title, settings }) => {
            const selected = isSamePreset(spacing, settings)
            return (
              <button
                key={title}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => dispatch(setSpacing(settings))}
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
            id={`spacing-${key}`}
            {...slider}
            value={spacing[key] ?? readCssVarDefault(spacingVars[key].name)}
            overridden={spacing[key] !== undefined}
            onChange={(value) => dispatch(changeSpacing({ key, value }))}
            onReset={() => dispatch(changeSpacing({ key, value: null }))}
          />
        ))}

        <p className="text-xs text-muted">
          {t('Small and large buttons scale from the same value.')}
        </p>
      </div>
    </div>
  )
}

export default SpacingSettings
