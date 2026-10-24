/* Sample data for the charts showcase */

export const usersData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1900 },
  { month: 'Mar', users: 1700 },
  { month: 'Apr', users: 2400 },
  { month: 'May', users: 2100 },
  { month: 'Jun', users: 2800 },
  { month: 'Jul', users: 3200 },
]

export const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5100 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6300 },
  { month: 'May', revenue: 7200 },
  { month: 'Jun', revenue: 6800 },
  { month: 'Jul', revenue: 8100 },
]

/** Two series — this year vs last year */
export const yearOverYearData = [
  { month: 'Jan', thisYear: 4200, lastYear: 3100 },
  { month: 'Feb', thisYear: 5100, lastYear: 3600 },
  { month: 'Mar', thisYear: 4800, lastYear: 4100 },
  { month: 'Apr', thisYear: 6300, lastYear: 4400 },
  { month: 'May', thisYear: 7200, lastYear: 5000 },
  { month: 'Jun', thisYear: 6800, lastYear: 5600 },
  { month: 'Jul', thisYear: 8100, lastYear: 5900 },
]

export const ordersData = [
  { day: 'Mon', orders: 32 },
  { day: 'Tue', orders: 45 },
  { day: 'Wed', orders: 38 },
  { day: 'Thu', orders: 51 },
  { day: 'Fri', orders: 62 },
  { day: 'Sat', orders: 28 },
  { day: 'Sun', orders: 19 },
]

/** Fixed categorical order: the slot follows the entity, never its rank */
export const trafficData = [
  { name: 'Direct', value: 42, color: 'var(--chart-1)' },
  { name: 'Social', value: 28, color: 'var(--chart-2)' },
  { name: 'Referral', value: 18, color: 'var(--chart-3)' },
  { name: 'Email', value: 12, color: 'var(--chart-4)' },
]

export const skillsData = [
  { metric: 'Speed', team: 85, target: 90 },
  { metric: 'Quality', team: 78, target: 85 },
  { metric: 'Reliability', team: 92, target: 88 },
  { metric: 'Coverage', team: 65, target: 80 },
  { metric: 'Support', team: 88, target: 82 },
]

export const targetData = [
  { month: 'Jan', revenue: 4200, target: 4500 },
  { month: 'Feb', revenue: 5100, target: 4800 },
  { month: 'Mar', revenue: 4800, target: 5000 },
  { month: 'Apr', revenue: 6300, target: 5500 },
  { month: 'May', revenue: 7200, target: 6200 },
  { month: 'Jun', revenue: 6800, target: 6800 },
]

/** 12-point weekly series for the stat-tile sparklines */
export const kpis = [
  {
    label: 'Revenue',
    value: 42580,
    prefix: '$',
    delta: 12.4,
    upIsGood: true,
    trend: [28, 31, 30, 34, 33, 36, 35, 38, 37, 40, 41, 43],
  },
  {
    label: 'Active users',
    value: 3204,
    delta: 8.1,
    upIsGood: true,
    trend: [21, 22, 22, 24, 23, 25, 26, 27, 27, 29, 30, 32],
  },
  {
    label: 'Churn rate',
    value: 2.4,
    suffix: '%',
    delta: -0.6,
    upIsGood: false,
    trend: [3.4, 3.3, 3.2, 3.2, 3.0, 2.9, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4],
  },
  {
    label: 'Avg. response',
    value: 1.8,
    suffix: 'h',
    delta: 0.3,
    upIsGood: false,
    trend: [1.4, 1.5, 1.4, 1.5, 1.6, 1.5, 1.6, 1.7, 1.6, 1.7, 1.8, 1.8],
  },
]
