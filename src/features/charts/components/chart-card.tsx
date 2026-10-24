import { useState } from 'react'
import type { ReactNode } from 'react'
import { BarChart3, Table2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface ChartTable {
  columns: string[]
  rows: (string | number)[][]
}

interface ChartCardProps {
  title: string
  description: string
  /** Legend or other key shown under the header */
  legend?: ReactNode
  /** Same data as the chart, as a table — the accessible / exact-values view */
  table: ChartTable
  children: ReactNode
  className?: string
}

/** Card for one chart with a Chart / Table switch in the header */
function ChartCard({
  title,
  description,
  legend,
  table,
  children,
  className = '',
}: ChartCardProps) {
  const { t } = useTranslation()
  const [view, setView] = useState<'chart' | 'table'>('chart')

  return (
    <section className={`card flex flex-col p-0! ${className}`}>
      <div className="flex items-start justify-between gap-3 px-5 pt-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{t(title)}</h3>
          <p className="mt-0.5 text-xs text-muted">{t(description)}</p>
        </div>
        <div
          className="flex shrink-0 rounded-lg bg-surface-hover/70 p-0.5"
          role="radiogroup"
          aria-label={t('View')}
        >
          {(
            [
              { value: 'chart', icon: BarChart3, label: 'Chart' },
              { value: 'table', icon: Table2, label: 'Table' },
            ] as const
          ).map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={view === value}
              aria-label={t(label)}
              title={t(label)}
              onClick={() => setView(value)}
              className={`flex size-7 items-center justify-center rounded-md transition-colors ${
                view === value
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {legend && view === 'chart' && <div className="px-5 pt-3">{legend}</div>}

      <div className="px-3 pt-3 pb-4">
        {view === 'chart' ? (
          <div className="h-64 w-full">{children}</div>
        ) : (
          <div className="h-64 overflow-auto px-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-borderColor text-xs text-muted">
                  {table.columns.map((column, i) => (
                    <th
                      key={column}
                      className={`py-2 font-medium ${i === 0 ? 'text-start' : 'text-end'}`}
                    >
                      {t(column)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, r) => (
                  <tr
                    key={r}
                    className="border-b border-borderColor last:border-b-0"
                  >
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`py-2 ${
                          i === 0
                            ? 'text-start text-foreground'
                            : 'text-end font-medium text-foreground tabular-nums'
                        }`}
                      >
                        {typeof cell === 'string'
                          ? t(cell)
                          : cell.toLocaleString('en')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default ChartCard
