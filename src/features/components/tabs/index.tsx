import {
  Activity,
  Columns3,
  LayoutDashboard,
  Lock,
  PanelLeft,
  Settings,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Tabs from '#/components/tab/tabs'
import ShowcaseHeader from '../shared/showcase-header'
import ShowcaseSection from '../shared/showcase-section'
import DemoCard from '../shared/demo-card'
import dummyPanels from './components/dummy-panels'

const tabs = [
  { value: 'overview', label: 'Overview', icon: LayoutDashboard },
  { value: 'activity', label: 'Activity', icon: Activity, count: 3 },
  { value: 'settings', label: 'Settings', icon: Settings },
]

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-borderColor bg-surface px-1 font-mono text-[10px] text-muted">
      {children}
    </kbd>
  )
}

function TabsShowcase() {
  const { t } = useTranslation()

  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Tabs"
        description="Six visual styles on one compound component — only the variant prop changes. Keyboard and screen-reader ready."
        code='<Tabs variant="pill"><Tabs.List /><Tabs.Content /></Tabs>'
        stats={[
          { value: 6, label: 'Variants' },
          { value: 2, label: 'Orientations' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />

      <ShowcaseSection
        icon={Columns3}
        title="Horizontal"
        description="Tabs in a row above their content"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <DemoCard
            title="Segmented control"
            code='variant="pill"'
            description="The active pill glides between options"
          >
            <Tabs defaultValue="overview" variant="pill">
              <Tabs.List>
                {tabs.map(({ value, label }) => (
                  <Tabs.Trigger key={value} value={value}>
                    {t(label)}
                  </Tabs.Trigger>
                ))}
                <Tabs.Trigger value="locked" disabled>
                  {t('Disabled')}
                </Tabs.Trigger>
              </Tabs.List>
              {dummyPanels()}
            </Tabs>
          </DemoCard>

          <DemoCard
            title="Underline"
            code='variant="underline"'
            description="With count badges"
          >
            <Tabs defaultValue="overview" variant="underline">
              <Tabs.List>
                {tabs.map(({ value, label, count }) => (
                  <Tabs.Trigger key={value} value={value}>
                    {t(label)}
                    {count && (
                      <span className="rounded-full bg-primary/10 px-1.5 text-[10px] font-semibold text-primary">
                        {count}
                      </span>
                    )}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {dummyPanels()}
            </Tabs>
          </DemoCard>

          <DemoCard
            title="Boxed"
            code='variant="boxed"'
            description="Bordered tabs with icons"
          >
            <Tabs defaultValue="overview" variant="boxed">
              <Tabs.List>
                {tabs.map(({ value, label, icon: Icon }) => (
                  <Tabs.Trigger key={value} value={value}>
                    <Icon size={16} />
                    {t(label)}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {dummyPanels()}
            </Tabs>
          </DemoCard>

          <DemoCard
            title="Circle"
            code='variant="circle"'
            description="Icon-only, labelled for screen readers"
          >
            <Tabs defaultValue="overview" variant="circle">
              <Tabs.List>
                {tabs.map(({ value, label, icon: Icon }) => (
                  <Tabs.Trigger key={value} value={value} label={t(label)}>
                    <Icon size={20} />
                  </Tabs.Trigger>
                ))}
                <Tabs.Trigger value="locked" disabled label={t('Disabled')}>
                  <Lock size={20} />
                </Tabs.Trigger>
              </Tabs.List>
              {dummyPanels()}
            </Tabs>
          </DemoCard>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        icon={PanelLeft}
        title="Vertical"
        description="Tabs in a column beside their content"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <DemoCard title="Vertical" code='variant="vertical"'>
            <Tabs defaultValue="overview" variant="vertical">
              <Tabs.List>
                {tabs.map(({ value, label, icon: Icon }) => (
                  <Tabs.Trigger key={value} value={value}>
                    <Icon size={16} />
                    {t(label)}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {dummyPanels()}
            </Tabs>
          </DemoCard>

          <DemoCard title="Circle vertical" code='variant="circle-vertical"'>
            <Tabs defaultValue="overview" variant="circle-vertical">
              <Tabs.List>
                {tabs.map(({ value, label, icon: Icon }) => (
                  <Tabs.Trigger key={value} value={value} label={t(label)}>
                    <Icon size={20} />
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {dummyPanels()}
            </Tabs>
          </DemoCard>
        </div>
      </ShowcaseSection>

      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted">
        {t('Click a tab, then use')} <Kbd>←</Kbd> <Kbd>→</Kbd> <Kbd>↑</Kbd>{' '}
        <Kbd>↓</Kbd> <Kbd>Home</Kbd> <Kbd>End</Kbd> {t('to move between tabs')}
      </p>
    </div>
  )
}

export default TabsShowcase
