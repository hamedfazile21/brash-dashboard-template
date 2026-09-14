import { Ellipsis } from 'lucide-react'

import RevenueChart from './components/revenue-chart'
import TaskDistribution from './components/task-distribution'
import MonthlyGoal from './components/monthly-goal'
import SalesByCategory from './components/sales-by-category'
import WeeklyActivity from './components/weekly-activity'
import CardInfo from './components/card-info'
import { useTranslation } from 'react-i18next'

export function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-black/8 bg-surface/90 px-3 py-2 text-xs shadow-lg shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-surface/90">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {payload.map((item: any) => (
        <div key={item.name} className="flex items-center gap-x-1.5 text-muted">
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: item.color || item.fill }}
          />
          {item.name}:{' '}
          <span className="font-medium text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

const Dashboard = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-y-5">
      {/* Stat cards */}
      <CardInfo />

      <div className="flex flex-col items-stretch gap-5 lg:flex-row">
        <RevenueChart />

        <div className="card w-full p-0 lg:w-1/3">
          <div className="flex w-full items-center justify-between border-b border-borderColor pb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t('Task Distribution')}
            </h3>
            <button
              type="button"
              aria-label="Chart options"
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <Ellipsis size={18} />
            </button>
          </div>

          <TaskDistribution />
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-5 lg:flex-row">
        <div className="card flex w-full flex-col p-0 lg:w-1/3">
          <div className="flex w-full items-center justify-between border-b border-borderColor pb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t('Monthly Goal')}
            </h3>
            <button
              type="button"
              aria-label="Chart options"
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <Ellipsis size={18} />
            </button>
          </div>

          <MonthlyGoal />
        </div>

        <div className="card w-full p-0 lg:w-2/3">
          <div className="flex w-full items-center justify-between border-b border-borderColor pb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t('Sales by Category')}
            </h3>
            <button
              type="button"
              aria-label="Chart options"
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <Ellipsis size={18} />
            </button>
          </div>
          <SalesByCategory />
        </div>
      </div>

      <div className="card w-full p-0">
        <div className="flex w-full items-center justify-between border-b border-borderColor pb-3">
          <h3 className="text-sm font-semibold text-foreground">
            {t('Monthly Activity')}
          </h3>
          <button
            type="button"
            aria-label="Chart options"
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <Ellipsis size={18} />
          </button>
        </div>

        <WeeklyActivity />
      </div>
    </div>
  )
}

export default Dashboard
