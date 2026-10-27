import { useTranslation } from 'react-i18next'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartTooltip } from '../dashboard'

const salesByCategory = [
  { category: 'Electronics', sales: 8400 },
  { category: 'Apparel', sales: 6200 },
  { category: 'Home & Garden', sales: 5100 },
  { category: 'Sports', sales: 3800 },
  { category: 'Books', sales: 2400 },
]

const SalesByCategory = () => {
  const { t } = useTranslation()
  return (
    <div className="h-72 w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salesByCategory}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            tickFormatter={(category) => t(category)}
            tick={{ fill: 'var(--foreground)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: 'var(--surface-hover)' }}
          />
          <Bar
            dataKey="sales"
            name="Sales"
            fill="var(--color-primary)"
            radius={[0, 6, 6, 0]}
            maxBarSize={22}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesByCategory
