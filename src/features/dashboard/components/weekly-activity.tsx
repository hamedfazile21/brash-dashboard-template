import React from 'react'
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

const monthlyActivity = [
  { day: '1', tasks: 14 },
  { day: '2', tasks: 8 },
  { day: '3', tasks: 16 },
  { day: '4', tasks: 24 },
  { day: '5', tasks: 5 },
  { day: '6', tasks: 6 },
  { day: '7', tasks: 21 },
  { day: '8', tasks: 7 },
  { day: '9', tasks: 15 },
  { day: '10', tasks: 22 },
  { day: '11', tasks: 5 },
  { day: '12', tasks: 20 },
  { day: '13', tasks: 10 },
  { day: '14', tasks: 5 },
  { day: '15', tasks: 6 },
  { day: '16', tasks: 17 },
  { day: '17', tasks: 17 },
  { day: '18', tasks: 6 },
  { day: '19', tasks: 11 },
  { day: '20', tasks: 6 },
  { day: '21', tasks: 21 },
  { day: '22', tasks: 17 },
  { day: '23', tasks: 5 },
  { day: '24', tasks: 22 },
  { day: '25', tasks: 7 },
  { day: '26', tasks: 11 },
  { day: '27', tasks: 24 },
  { day: '28', tasks: 24 },
  { day: '29', tasks: 22 },
  { day: '30', tasks: 5 },
]

const WeeklyActivity = () => {
  return (
    <div className="h-56 w-full p-4 pl-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyActivity}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
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
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: 'var(--surface-hover)' }}
          />
          <Bar
            dataKey="tasks"
            name="Tasks"
            fill="var(--color-primary)"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyActivity
