import { useState } from 'react'
import {
  GitCommitHorizontal,
  MessageSquare,
  TrendingUp,
  UserPlus,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Tabs from '#/components/tab/tabs'
import CheckBox from '#/components/checkbox'

function OverviewPanel() {
  const { t } = useTranslation()
  const stats = [
    { label: 'Revenue', value: '$12.4k', trend: '+8%' },
    { label: 'Users', value: '1,284', trend: '+3%' },
    { label: 'Orders', value: '342', trend: '+12%' },
  ]
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(({ label, value, trend }) => (
        <div
          key={label}
          className="rounded-xl border border-borderColor bg-surface/40 p-3"
        >
          <p className="text-[11px] text-muted">{t(label)}</p>
          <p className="mt-0.5 text-base font-semibold text-foreground tabular-nums">
            {value}
          </p>
          <p className="mt-0.5 flex items-center gap-x-0.5 text-[11px] font-medium text-success">
            <TrendingUp size={11} />
            {trend}
          </p>
        </div>
      ))}
    </div>
  )
}

function ActivityPanel() {
  const { t } = useTranslation()
  const items = [
    { icon: UserPlus, text: 'Sara joined the workspace', time: '2m' },
    {
      icon: GitCommitHorizontal,
      text: 'Kian pushed 3 commits to main',
      time: '1h',
    },
    { icon: MessageSquare, text: 'Nina commented on the roadmap', time: '3h' },
  ]
  return (
    <ul className="flex flex-col gap-y-2.5">
      {items.map(({ icon: Icon, text, time }) => (
        <li key={text} className="flex items-center gap-x-3 text-sm">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon size={14} />
          </span>
          <span className="min-w-0 flex-1 truncate text-foreground">
            {t(text)}
          </span>
          <span className="shrink-0 text-xs text-muted">{t(time)}</span>
        </li>
      ))}
    </ul>
  )
}

function SettingsPanel() {
  const { t } = useTranslation()
  const [settings, setSettings] = useState({ email: true, digest: false })
  const rows = [
    { key: 'email', label: 'Email notifications' },
    { key: 'digest', label: 'Weekly digest' },
  ] as const
  return (
    <div className="flex flex-col gap-y-3">
      {rows.map(({ key, label }) => (
        <label
          key={key}
          className="flex cursor-pointer items-center justify-between gap-x-3 text-sm text-foreground"
        >
          {t(label)}
          <CheckBox
            rounded
            checked={settings[key]}
            onChange={() =>
              setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
            }
          />
        </label>
      ))}
    </div>
  )
}

/** The same three realistic panels for every tabs example */
const dummyPanels = () => (
  <>
    <Tabs.Content value="overview">
      <OverviewPanel />
    </Tabs.Content>
    <Tabs.Content value="activity">
      <ActivityPanel />
    </Tabs.Content>
    <Tabs.Content value="settings">
      <SettingsPanel />
    </Tabs.Content>
  </>
)

export default dummyPanels
