import { useTranslation } from 'react-i18next'
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts'

const goalProgress = [{ name: 'Goal', value: 78, fill: 'var(--color-primary)' }]

const MonthlyGoal = () => {
  const { t } = useTranslation()
  return (
    <div className="relative flex h-72 w-full items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={goalProgress}
          innerRadius="70%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={20}
            background={{ fill: 'var(--surface-hover)' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute flex flex-col items-center">
        <p className="text-3xl font-semibold text-foreground">78%</p>
        <p className="text-xs text-muted">
          {t('of {{amount}} goal', { amount: '$10,000' })}
        </p>
      </div>
    </div>
  )
}

export default MonthlyGoal
