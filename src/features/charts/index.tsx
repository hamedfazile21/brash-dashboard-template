import {
  ArrowDownRight,
  ArrowUpRight,
  ChartColumn,
  ChartPie,
  Gauge,
  TrendingUp,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import ChartCard from './components/chart-card'
import {
  ChartLegend,
  ChartTooltip,
  axisTick,
  compact,
  dotProps,
  gridProps,
  useChartDirection,
} from './components/chart-parts'
import {
  kpis,
  ordersData,
  revenueData,
  skillsData,
  targetData,
  trafficData,
  usersData,
  yearOverYearData,
} from './data'

/* ------------------------------------------------------------------ */
/* Figures — stat tiles with sparklines                                */
/* ------------------------------------------------------------------ */

function Sparkline({ points }: { points: number[] }) {
  const width = 96
  const height = 32
  const min = Math.min(...points)
  const max = Math.max(...points)
  const x = (i: number) => (i / (points.length - 1)) * width
  const y = (v: number) =>
    height - 4 - ((v - min) / (max - min || 1)) * (height - 8)
  const d = points.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  const last = points.length - 1

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className="shrink-0 overflow-visible rtl:-scale-x-100"
    >
      {/* De-emphasised history, current period in the accent */}
      <path
        d={d}
        fill="none"
        stroke="var(--muted-foreground)"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={x(last)}
        cy={y(points[last])}
        r={4}
        fill="var(--color-primary)"
        stroke="var(--surface)"
        strokeWidth={2}
      />
    </svg>
  )
}

function FiguresSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Gauge}
      title="Figures"
      description="When the answer is one number, show the number"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(
          ({
            label,
            value,
            prefix = '',
            suffix = '',
            delta,
            upIsGood,
            trend,
          }) => {
            // Color = direction × whether up is good; the arrow + sign carry it too
            const good = delta >= 0 === upIsGood
            const Arrow = delta >= 0 ? ArrowUpRight : ArrowDownRight
            return (
              <div key={label} className="card flex flex-col gap-y-3 p-5!">
                <p className="text-sm text-muted">{t(label)}</p>
                <div className="flex items-end justify-between gap-x-3">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    {value >= 1000
                      ? compact(value, prefix, suffix)
                      : `${prefix}${value}${suffix}`}
                  </p>
                  <Sparkline points={trend} />
                </div>
                <p className="flex items-center gap-x-1 text-xs text-muted">
                  <span
                    className={`flex items-center gap-x-0.5 font-semibold ${good ? 'text-success' : 'text-danger'}`}
                  >
                    <Arrow size={14} />
                    {delta > 0 ? '+' : ''}
                    {delta}
                    {suffix === '%' || suffix === 'h' ? suffix : '%'}
                  </span>
                  {t('vs last month')}
                </p>
              </div>
            )
          },
        )}
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Trends                                                              */
/* ------------------------------------------------------------------ */

function TrendsSection() {
  const { t } = useTranslation()
  const { rtl, xAxis, yAxis } = useChartDirection()
  const margin = { top: 8, right: 16, left: 16, bottom: 0 }

  // Direct label at each line's last point (≤ 4 series are labelled, plus the legend)
  const endLabel =
    (text: string) =>
    ({
      x,
      y,
      index,
    }: {
      x?: number | string
      y?: number | string
      index?: number
    }) => {
      if (
        index !== yearOverYearData.length - 1 ||
        x === undefined ||
        y === undefined
      ) {
        return <g />
      }
      const px = Number(x)
      return (
        <text
          x={rtl ? px - 10 : px + 10}
          y={Number(y)}
          dy={4}
          // Physical anchoring: in an RTL document text-anchor flips meaning
          direction="ltr"
          textAnchor={rtl ? 'end' : 'start'}
          fontSize={12}
          fill="var(--foreground)"
        >
          {t(text)}
        </text>
      )
    }

  return (
    <ShowcaseSection
      icon={TrendingUp}
      title="Trends"
      description="Change over time — lines for rates, areas for volume"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard
          title="Active users"
          description="Monthly, Jan–Jul"
          table={{
            columns: ['Month', 'Users'],
            rows: usersData.map((d) => [d.month, d.users]),
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usersData} margin={margin}>
              <CartesianGrid {...gridProps} />
              <XAxis
                dataKey="month"
                tick={axisTick}
                tickFormatter={(v: string) => t(v)}
                axisLine={false}
                tickLine={false}
                {...xAxis}
              />
              <YAxis
                tick={axisTick}
                tickFormatter={(v: number) => compact(v)}
                axisLine={false}
                tickLine={false}
                width={40}
                {...yAxis}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
                activeDot={dotProps('var(--color-primary)')}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Revenue"
          description="Monthly volume in USD"
          table={{
            columns: ['Month', 'Revenue'],
            rows: revenueData.map((d) => [d.month, d.revenue]),
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={margin}>
              <CartesianGrid {...gridProps} />
              <XAxis
                dataKey="month"
                tick={axisTick}
                tickFormatter={(v: string) => t(v)}
                axisLine={false}
                tickLine={false}
                {...xAxis}
              />
              <YAxis
                tick={axisTick}
                tickFormatter={(v: number) => compact(v, '$')}
                axisLine={false}
                tickLine={false}
                width={44}
                {...yAxis}
              />
              <Tooltip
                content={<ChartTooltip prefix="$" />}
                cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              />
              {/* A ~10% wash, never a saturated block */}
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="var(--color-primary)"
                fillOpacity={0.1}
                activeDot={dotProps('var(--color-primary)')}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Revenue, year over year"
          description="Two series with direct labels at the line ends"
          className="lg:col-span-2"
          legend={
            <ChartLegend
              items={[
                { label: 'This year', color: 'var(--chart-1)' },
                { label: 'Last year', color: 'var(--chart-2)' },
              ]}
            />
          }
          table={{
            columns: ['Month', 'This year', 'Last year'],
            rows: yearOverYearData.map((d) => [
              d.month,
              d.thisYear,
              d.lastYear,
            ]),
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={yearOverYearData}
              margin={{ ...margin, [rtl ? 'left' : 'right']: 72 }}
            >
              <CartesianGrid {...gridProps} />
              <XAxis
                dataKey="month"
                tick={axisTick}
                tickFormatter={(v: string) => t(v)}
                axisLine={false}
                tickLine={false}
                {...xAxis}
              />
              <YAxis
                tick={axisTick}
                tickFormatter={(v: number) => compact(v, '$')}
                axisLine={false}
                tickLine={false}
                width={44}
                {...yAxis}
              />
              <Tooltip
                content={<ChartTooltip prefix="$" />}
                cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="thisYear"
                name="This year"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
                activeDot={dotProps('var(--chart-1)')}
                label={endLabel('This year')}
              />
              <Line
                type="monotone"
                dataKey="lastYear"
                name="Last year"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
                activeDot={dotProps('var(--chart-2)')}
                label={endLabel('Last year')}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Comparison                                                          */
/* ------------------------------------------------------------------ */

function ComparisonSection() {
  const { t } = useTranslation()
  const { xAxis, yAxis } = useChartDirection()
  const margin = { top: 8, right: 16, left: 16, bottom: 0 }

  return (
    <ShowcaseSection
      icon={ChartColumn}
      title="Comparison"
      description="Magnitude across categories, and against a goal"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard
          title="Orders by weekday"
          description="Last 7 days"
          table={{
            columns: ['Day', 'Orders'],
            rows: ordersData.map((d) => [d.day, d.orders]),
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersData} margin={margin}>
              <CartesianGrid {...gridProps} />
              <XAxis
                dataKey="day"
                tick={axisTick}
                tickFormatter={(v: string) => t(v)}
                axisLine={false}
                tickLine={false}
                {...xAxis}
              />
              <YAxis
                tick={axisTick}
                axisLine={false}
                tickLine={false}
                width={32}
                {...yAxis}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: 'var(--surface-hover)', opacity: 0.5 }}
              />
              {/* ≤ 24px thick, 4px rounded data-end, square at the baseline */}
              <Bar
                dataKey="orders"
                name="Orders"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Revenue vs. target"
          description="Bars for actuals, a dashed line for the goal"
          legend={
            <ChartLegend
              items={[
                { label: 'Revenue', color: 'var(--chart-1)' },
                {
                  label: 'Target',
                  color: 'var(--muted-foreground)',
                  dashed: true,
                },
              ]}
            />
          }
          table={{
            columns: ['Month', 'Revenue', 'Target'],
            rows: targetData.map((d) => [d.month, d.revenue, d.target]),
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={targetData} margin={margin}>
              <CartesianGrid {...gridProps} />
              <XAxis
                dataKey="month"
                tick={axisTick}
                tickFormatter={(v: string) => t(v)}
                axisLine={false}
                tickLine={false}
                {...xAxis}
              />
              <YAxis
                tick={axisTick}
                tickFormatter={(v: number) => compact(v, '$')}
                axisLine={false}
                tickLine={false}
                width={44}
                {...yAxis}
              />
              <Tooltip
                content={<ChartTooltip prefix="$" />}
                cursor={{ fill: 'var(--surface-hover)', opacity: 0.5 }}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
              {/* The goal is a reference, not a series — muted ink, dashed, no status color */}
              <Line
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                activeDot={dotProps('var(--muted-foreground)')}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

function CompositionSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={ChartPie}
      title="Composition"
      description="Parts of a whole, and a profile across metrics"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard
          title="Traffic sources"
          description="Share of 12.4K sessions"
          table={{
            columns: ['Source', 'Share (%)'],
            rows: trafficData.map((d) => [d.name, d.value]),
          }}
        >
          <div className="flex h-full items-center gap-x-6 px-2">
            <div className="relative h-full min-w-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* 2px surface-colored gap between slices instead of padding angles */}
                  <Pie
                    data={trafficData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="62%"
                    outerRadius="90%"
                    stroke="var(--surface)"
                    strokeWidth={2}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {trafficData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip suffix="%" />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                {/* The absolute total — the shares already add up to 100% */}
                <span className="text-2xl font-semibold text-foreground">
                  12.4K
                </span>
                <span className="text-xs text-muted">{t('Sessions')}</span>
              </div>
            </div>
            {/* Legend doubles as direct labels: name + value in text ink */}
            <ul className="flex shrink-0 flex-col gap-y-2.5">
              {trafficData.map(({ name, value, color }) => (
                <li key={name} className="flex items-center gap-x-2 text-sm">
                  <span
                    className="size-2.5 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-muted">{t(name)}</span>
                  <span className="ms-auto ps-4 font-semibold text-foreground tabular-nums">
                    {value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ChartCard>

        <ChartCard
          title="Team health"
          description="Score out of 100, against the target"
          legend={
            <ChartLegend
              items={[
                { label: 'Team', color: 'var(--chart-1)' },
                {
                  label: 'Target',
                  color: 'var(--muted-foreground)',
                  dashed: true,
                },
              ]}
            />
          }
          table={{
            columns: ['Metric', 'Team', 'Target'],
            rows: skillsData.map((d) => [d.metric, d.team, d.target]),
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillsData} outerRadius="72%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="metric"
                tick={axisTick}
                tickFormatter={(v: string) => t(v)}
              />
              <Tooltip content={<ChartTooltip />} />
              <Radar
                name="Target"
                dataKey="target"
                stroke="var(--muted-foreground)"
                strokeDasharray="5 4"
                strokeWidth={2}
                fill="none"
              />
              <Radar
                name="Team"
                dataKey="team"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="var(--chart-1)"
                fillOpacity={0.1}
                dot={{ r: 3, fill: 'var(--chart-1)' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </ShowcaseSection>
  )
}

function Charts() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Charts"
        description="Recharts themed with your tokens — a colour-blind-safe categorical palette, thin marks, token tooltips and a table view on every chart."
        code="var(--chart-1) … var(--chart-4)"
        stats={[
          { value: 7, label: 'Charts' },
          { value: 4, label: 'Figures' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <FiguresSection />
      <TrendsSection />
      <ComparisonSection />
      <CompositionSection />
    </div>
  )
}

export default Charts
