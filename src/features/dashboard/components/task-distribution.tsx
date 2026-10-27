import { useTranslation } from 'react-i18next'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartTooltip } from '../dashboard'

const taskDistribution = [
  { name: 'Done', value: 42, color: 'var(--color-success)' },
  { name: 'In Progress', value: 28, color: 'var(--color-warning)' },
  { name: 'Overdue', value: 10, color: 'var(--color-danger)' },
  { name: 'Not Started', value: 20, color: 'var(--muted-foreground)' },
]

const TaskDistribution = () => {
  const { t } = useTranslation()
  return (
    <div className="flex h-72 w-full flex-col items-center justify-center p-4">
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={taskDistribution}
            dataKey="value"
            nameKey="name"
            innerRadius="65%"
            outerRadius="100%"
            paddingAngle={3}
            stroke="none"
          >
            {taskDistribution.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-2 grid w-full grid-cols-2 gap-x-2 gap-y-1.5">
        {taskDistribution.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-x-1.5 text-xs text-muted"
          >
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate">{t(item.name)}</span>
            <span className="ms-auto font-medium text-foreground">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskDistribution
