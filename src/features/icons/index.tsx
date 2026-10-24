import { useState } from 'react'
import { Check, Search, SearchX } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import Input from '#/components/input'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import { categories } from './data/icons'

const ALL = 'All'
const sizes = [16, 20, 24, 32]
const strokes = [1.5, 2, 2.5]
type CopyFormat = 'jsx' | 'import'

/** "LayoutDashboard" -> "layout dashboard", so "layout" and "dash" both match */
const words = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase()

function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
  format = String,
}: {
  label: string
  options: T[]
  value: T
  onChange: (value: T) => void
  format?: (value: T) => string
}) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-x-2">
      <span className="text-xs font-medium text-muted">{t(label)}</span>
      <div
        className="flex rounded-lg bg-surface-hover/70 p-0.5"
        role="radiogroup"
        aria-label={t(label)}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
              value === option
                ? 'bg-surface text-foreground shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {format(option)}
          </button>
        ))}
      </div>
    </div>
  )
}

function IconShowcase() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL)
  const [size, setSize] = useState(24)
  const [stroke, setStroke] = useState(2)
  const [format, setFormat] = useState<CopyFormat>('jsx')
  const [copiedName, setCopiedName] = useState<string | null>(null)

  const query = search.trim().toLowerCase()
  const filtered = categories
    .filter((cat) => category === ALL || cat.label === category)
    .map((cat) => ({
      ...cat,
      icons: cat.icons.filter(
        ({ name }) =>
          !query ||
          words(name).includes(query) ||
          name.toLowerCase().includes(query.replace(/\s/g, '')),
      ),
    }))
    .filter((cat) => cat.icons.length > 0)

  const totalCount = categories.reduce((sum, c) => sum + c.icons.length, 0)
  const shownCount = filtered.reduce((sum, c) => sum + c.icons.length, 0)

  const snippet = (name: string) =>
    format === 'jsx'
      ? `<${name} size={${size}}${stroke !== 2 ? ` strokeWidth={${stroke}}` : ''} />`
      : `import { ${name} } from 'lucide-react'`

  const handleCopy = async (name: string) => {
    const text = snippet(name)
    try {
      await navigator.clipboard.writeText(text)
      toast.success(t('Copied to clipboard'), { description: text })
    } catch {
      // Clipboard is blocked on insecure origins — still show what to copy
      toast.info(t('Copy this snippet'), { description: text })
    }
    setCopiedName(name)
    setTimeout(() => setCopiedName(null), 1200)
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      <ShowcaseHeader
        title="Icons"
        description="A curated set of Lucide icons used across the dashboard. Click any icon to copy it as JSX or an import."
        code="import { Bell } from 'lucide-react'"
        stats={[
          { value: totalCount, label: 'Icons' },
          { value: categories.length, label: 'Categories' },
          { value: 'SVG', label: 'Format' },
        ]}
      />

      {/* Toolbar — sticks under the header while you scroll the grid.
          `sticky!`: .card is unlayered CSS and sets position: relative */}
      <div className="card sticky! top-16 z-20 flex flex-col gap-4 p-4!">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="lg:w-80">
            <Input
              icon={Search}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('Search icons...')}
              aria-label={t('Search icons')}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:ms-auto">
            <Segmented
              label="Size"
              options={sizes}
              value={size}
              onChange={setSize}
            />
            <Segmented
              label="Stroke"
              options={strokes}
              value={stroke}
              onChange={setStroke}
            />
            <Segmented
              label="Copy as"
              options={['jsx', 'import'] as CopyFormat[]}
              value={format}
              onChange={setFormat}
              format={(v) => (v === 'jsx' ? 'JSX' : 'import')}
            />
          </div>
        </div>

        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[ALL, ...categories.map((c) => c.label)].map((label) => {
            const count =
              label === ALL
                ? totalCount
                : (categories.find((c) => c.label === label)?.icons.length ?? 0)
            return (
              <button
                key={label}
                type="button"
                aria-pressed={category === label}
                onClick={() => setCategory(label)}
                className={`flex shrink-0 items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  category === label
                    ? 'bg-foreground text-background'
                    : 'bg-surface-hover/60 text-muted hover:bg-surface-hover hover:text-foreground'
                }`}
              >
                {t(label)}
                <span className="opacity-60 tabular-nums">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="-mt-4 text-xs text-muted" aria-live="polite">
        {t('{{shown}} of {{total}} icons', {
          shown: shownCount,
          total: totalCount,
        })}
      </p>

      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center gap-y-3 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-surface-hover text-muted">
            <SearchX size={24} />
          </span>
          <p className="text-sm font-medium text-foreground">
            {t('No icons match "{{query}}"', { query: search })}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setCategory(ALL)
            }}
            className="btn btn-secondary btn-sm"
          >
            {t('Clear filters')}
          </button>
        </div>
      ) : (
        filtered.map((cat) => (
          <section key={cat.label} className="flex flex-col gap-y-3">
            <h2 className="flex items-center gap-x-2 text-sm font-semibold text-foreground">
              {t(cat.label)}
              <span className="rounded-full bg-surface-hover px-2 text-[11px] font-medium text-muted tabular-nums">
                {cat.icons.length}
              </span>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2.5">
              {cat.icons.map(({ name, Icon }) => {
                const isCopied = copiedName === name
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleCopy(name)}
                    title={snippet(name)}
                    aria-label={`${t('Copy')} ${name}`}
                    className={`card group flex h-28 flex-col items-center justify-center gap-y-3 p-2! text-muted outline-none transition-all duration-150 hover:-translate-y-0.5 hover:text-foreground hover:shadow-lg hover:shadow-black/5 focus-visible:ring-2 focus-visible:ring-primary ${
                      isCopied
                        ? 'border-success/50! text-success!'
                        : 'hover:border-primary/30!'
                    }`}
                  >
                    <span className="flex h-8 items-center justify-center transition-transform duration-150 group-hover:scale-110">
                      {isCopied ? (
                        <Check size={size} strokeWidth={stroke} />
                      ) : (
                        <Icon size={size} strokeWidth={stroke} />
                      )}
                    </span>
                    <span
                      className="w-full px-1 text-center text-[11px] leading-tight wrap-break-word"
                      dir="ltr"
                    >
                      {isCopied ? t('Copied') : name}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

export default IconShowcase
