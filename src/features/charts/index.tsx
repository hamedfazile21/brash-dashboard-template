import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

/* ==========================================================================
   Sample data
   ========================================================================== */
const lineData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1900 },
  { month: 'Mar', users: 1700 },
  { month: 'Apr', users: 2400 },
  { month: 'May', users: 2100 },
  { month: 'Jun', users: 2800 },
  { month: 'Jul', users: 3200 },
]

const areaData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5100 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6300 },
  { month: 'May', revenue: 7200 },
  { month: 'Jun', revenue: 6800 },
  { month: 'Jul', revenue: 8100 },
]

const barData = [
  { category: 'Mon', orders: 32 },
  { category: 'Tue', orders: 45 },
  { category: 'Wed', orders: 38 },
  { category: 'Thu', orders: 51 },
  { category: 'Fri', orders: 62 },
  { category: 'Sat', orders: 28 },
  { category: 'Sun', orders: 19 },
]

const pieData = [
  { name: 'Direct', value: 42, color: 'var(--color-primary)' },
  { name: 'Social', value: 28, color: 'var(--color-success)' },
  { name: 'Referral', value: 18, color: 'var(--color-warning)' },
  { name: 'Email', value: 12, color: 'var(--color-info)' },
]

const radarData = [
  { metric: 'Speed', team: 85, target: 90 },
  { metric: 'Quality', team: 78, target: 85 },
  { metric: 'Reliability', team: 92, target: 88 },
  { metric: 'Coverage', team: 65, target: 80 },
  { metric: 'Support', team: 88, target: 82 },
]

const composedData = [
  { month: 'Jan', revenue: 4200, target: 4500 },
  { month: 'Feb', revenue: 5100, target: 4800 },
  { month: 'Mar', revenue: 4800, target: 5000 },
  { month: 'Apr', revenue: 6300, target: 5500 },
  { month: 'May', revenue: 7200, target: 6200 },
  { month: 'Jun', revenue: 6800, target: 6800 },
]

/* ==========================================================================
   Custom glass tooltip — reused across every chart below
   ========================================================================== */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-black/8 bg-surface/90 px-3 py-2 text-xs shadow-lg shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-surface/90">
      {label && <p className="mb-1 font-medium text-foreground">{label}</p>}
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

const axisTick = { fill: 'var(--muted-foreground)', fontSize: 12 }

function Charts() {
  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Charts</h1>
        <p className="mt-1 text-sm text-muted">
          6 common dashboard chart types, built with{' '}
          <a
            href="https://recharts.org"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Recharts
          </a>{' '}
          and themed with CSS variables.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* 1. Line */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Line{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              trend over time
            </span>
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: 'var(--color-primary)' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 2. Area */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Area{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              cumulative volume
            </span>
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={areaData}
                margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
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
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  fill="url(#areaFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 3. Bar */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Bar{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              categorical comparison
            </span>
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="category"
                  tick={axisTick}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: 'var(--surface-hover)' }}
                />
                <Bar
                  dataKey="orders"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 4. Pie / Donut */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Pie{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              proportions / share
            </span>
          </p>
          <div className="flex h-64 w-full items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-muted">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 5. Radar */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Radar{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              multi-metric comparison
            </span>
          </p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="metric" tick={axisTick} />
                <PolarRadiusAxis
                  tick={{ ...axisTick, fontSize: 10 }}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="var(--muted-foreground)"
                  fill="var(--muted-foreground)"
                  fillOpacity={0.1}
                  strokeDasharray="4 4"
                />
                <Radar
                  name="Team"
                  dataKey="team"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.3}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-muted">{value}</span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 6. Composed (Bar + Line) */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Composed{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              actual vs. target
            </span>
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={composedData}
                margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: 'var(--surface-hover)' }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-muted">{value}</span>
                  )}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={32}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="var(--color-danger)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'var(--color-danger)' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Charts
