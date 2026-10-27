import { Ellipsis } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartTooltip } from '../dashboard'

const revenueData = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 5100, expenses: 3100 },
  { month: 'Mar', revenue: 4800, expenses: 2900 },
  { month: 'Apr', revenue: 6300, expenses: 3400 },
  { month: 'May', revenue: 7200, expenses: 3800 },
  { month: 'Jun', revenue: 6800, expenses: 3600 },
  { month: 'Jul', revenue: 8100, expenses: 4200 },
  { month: 'Aug', revenue: 7987, expenses: 4067 },
  { month: 'Sep', revenue: 7654, expenses: 3727 },
  { month: 'Oct', revenue: 8290, expenses: 4123 },
  { month: 'Nov', revenue: 8879, expenses: 4053 },
  { month: 'Dec', revenue: 8305, expenses: 4492 },
]

const RevenueChart = () => {
  const { t } = useTranslation()
  return (
    <div className="card w-full p-0 lg:w-2/3">
      <div className="flex w-full items-center justify-between border-b border-borderColor pb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {t('Revenue')}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{t('Last 12 months')}</p>
        </div>
        <button
          type="button"
          aria-label={t('Chart options')}
          className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <Ellipsis size={18} />
        </button>
      </div>

      <div className="h-72 w-full p-4 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--muted-foreground)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--muted-foreground)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickFormatter={(month) => t(month)}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="var(--muted-foreground)"
              strokeWidth={2}
              fill="url(#expensesFill)"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart
