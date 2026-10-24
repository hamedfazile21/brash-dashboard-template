import { useTranslation } from 'react-i18next'

interface ShowcaseHeaderProps {
  title: string
  description: string
  /** Usage snippet shown under the description */
  code?: string
  stats?: { value: number | string; label: string }[]
}

/** Hero card at the top of every component showcase page */
function ShowcaseHeader({
  title,
  description,
  code,
  stats = [],
}: ShowcaseHeaderProps) {
  const { t } = useTranslation()

  return (
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
            {t(title)}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {t(description)}
          </p>
          {code && (
            <code
              dir="ltr"
              className="mt-4 inline-block max-w-full overflow-x-auto rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border border-borderColor bg-surface/60 px-3 py-1.5 font-mono text-xs whitespace-nowrap text-foreground"
            >
              {code}
            </code>
          )}
        </div>

        {stats.length > 0 && (
          <dl
            className="grid gap-2 sm:gap-3"
            style={{
              gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
            }}
          >
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
        )}
      </div>
    </div>
  )
}

export default ShowcaseHeader
