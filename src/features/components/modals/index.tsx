import { useTranslation } from 'react-i18next'
import Dialogs from './components/dialogs'
import PatternsSection from './components/patterns-section'
import TransitionsSection from './components/transitions-section'
import SizeSection from './components/size-section'
import { sizeOptions, transitionOptions } from './components/modal-provider'

const PATTERN_COUNT = 7

function Modals() {
  const { t } = useTranslation()

  const stats = [
    { value: PATTERN_COUNT, label: 'Patterns' },
    { value: transitionOptions.length, label: 'Transitions' },
    { value: sizeOptions.length, label: 'Sizes' },
    { value: 4, label: 'Positions' },
  ]

  return (
    <div className="flex w-full flex-col gap-y-10">
      {/* Header */}
      <div className="card relative overflow-hidden p-6! sm:p-8!">
        <div
          aria-hidden
          className="absolute -top-24 inset-e-0 size-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">
              {t('Components')}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {t('Modals')}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(
                'Dialog patterns, transitions and sizes — all built on the shared Dialog component. Open any of them to try it live.',
              )}
            </p>
            <code
              dir="ltr"
              className="mt-4 inline-block rounded-lg border border-borderColor bg-surface/60 px-3 py-1.5 font-mono text-xs text-foreground"
            >
              {'<Dialog open onClose title size position transition />'}
            </code>
          </div>

          <dl className="grid grid-cols-4 gap-2 sm:gap-3">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-borderColor bg-surface/50 px-3 py-2.5 text-center sm:px-4"
              >
                <dd className="text-2xl font-bold text-foreground tabular-nums">
                  {value}
                </dd>
                <dt className="text-[11px] text-muted">{t(label)}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <PatternsSection />
      <TransitionsSection />
      <SizeSection />

      <Dialogs />
    </div>
  )
}

export default Modals
