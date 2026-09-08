import { BicepsFlexed, HatGlasses, Settings, ShieldMinus } from 'lucide-react'
// import Tabs from '../../../components/tabs/tabs'
import dummyPanels from './components/dummy-panels'
import { GlassBlob1, GlassBlob2 } from '../../../../public/assets'
import { useTranslation } from 'react-i18next'
import Tabs from '#/components/tab/tabs'

function TabsShowcase() {
  const { t } = useTranslation()
  return (
    <div className="relative mx-auto flex w-full flex-col gap-y-8">
      <img src={GlassBlob1} className="absolute size-100 left-0 top-0 -z-10" />
      <img
        src={GlassBlob2}
        className="absolute right-0 bottom-0 size-100 -z-10"
      />

      <div>
        <h1 className="text-xl font-semibold text-foreground">{t('Tabs')}</h1>
        <p className="mt-1 text-sm text-muted">
          {t(`Six visual styles, all built on the same compound Tabs component —
          only the`)}{' '}
          <code className="rounded bg-surface-hover px-1 py-0.5 text-xs">
            variant
          </code>{' '}
          {t('prop changes')}.
        </p>
      </div>

      {/* Segmented Control (pill) */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-5 justify-between">
        <section className="card p-5 w-full lg:w-1/2!">
          <p className="mb-3 text-sm font-semibold text-foreground">
            {t('Segmented Control')}
            <span className="ml-2 text-xs font-normal text-muted">
              variant="pill"
            </span>
          </p>
          <Tabs defaultValue="overview" variant="pill">
            <Tabs.List>
              <Tabs.Trigger value="overview">{t('Overview')}</Tabs.Trigger>
              <Tabs.Trigger value="activity">{t('Activity')}</Tabs.Trigger>
              <Tabs.Trigger value="settings">{t('Settings')}</Tabs.Trigger>
              <Tabs.Trigger disabled value="disable">
                {t('Disable')}
              </Tabs.Trigger>
            </Tabs.List>
            {dummyPanels('Segmented Control')}
          </Tabs>
        </section>

        {/* Underline Tabs */}
        <section className="card p-5 w-full lg:w-1/2!">
          <p className="mb-3 text-sm font-semibold text-foreground">
            {t('Underline Tabs')}
            <span className="ml-2 text-xs font-normal text-muted">
              variant="underline"
            </span>
          </p>
          <Tabs defaultValue="overview" variant="underline">
            <Tabs.List>
              <Tabs.Trigger value="overview">{t('Overview')}</Tabs.Trigger>
              <Tabs.Trigger value="activity">{t('Activity')}</Tabs.Trigger>
              <Tabs.Trigger value="settings">{t('Settings')}</Tabs.Trigger>
              <Tabs.Trigger disabled value="disable">
                {t('Disable')}
              </Tabs.Trigger>
            </Tabs.List>
            {dummyPanels('Underline Tabs')}
          </Tabs>
        </section>
      </div>

      {/* Boxed / card Tabs */}
      <section className="card p-5">
        <p className="mb-3 text-sm font-semibold text-foreground">
          {t('Boxed Tabs')}
          <span className="ml-2 text-xs font-normal text-muted">
            variant="boxed"
          </span>
        </p>
        <Tabs defaultValue="overview" variant="boxed">
          <Tabs.List>
            <Tabs.Trigger value="overview">
              <div className="flex items-center gap-x-2">
                <HatGlasses size={18} />
                <p>{t('Overview')}</p>
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="activity">
              <div className="flex items-center gap-x-2">
                <BicepsFlexed size={18} />
                <p>{t('Activity')}</p>
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="settings">
              <div className="flex items-center gap-x-2">
                <Settings size={18} />
                <p>{t('Settings')}</p>
              </div>
            </Tabs.Trigger>
          </Tabs.List>
          {dummyPanels('Boxed Tabs')}
        </Tabs>
      </section>

      {/* Vertical Tabs */}
      <section className="card p-5">
        <p className="mb-3 text-sm font-semibold text-foreground">
          {t('Vertical Tabs')}
          <span className="ml-2 text-xs font-normal text-muted">
            variant="vertical"
          </span>
        </p>
        <Tabs defaultValue="overview" variant="vertical">
          <Tabs.List>
            <Tabs.Trigger value="overview">
              <div className="flex items-center gap-x-2">
                <HatGlasses size={18} />
                <p>{t('Overview')}</p>
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="activity">
              <div className="flex items-center gap-x-2">
                <BicepsFlexed size={18} />
                <p>{t('Activity')}</p>
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="settings">
              <div className="flex items-center gap-x-2">
                <Settings size={18} />
                <p>{t('Settings')}</p>
              </div>
            </Tabs.Trigger>
          </Tabs.List>
          {dummyPanels('Vertical Tabs')}
        </Tabs>
      </section>

      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <section className="card p-5 w-full lg:w-1/2!">
          <p className="mb-3 text-sm font-semibold text-foreground">
            {t('Circle Tabs')}
            <span className="ml-2 text-xs font-normal text-muted">
              variant="circle"
            </span>
          </p>
          <Tabs defaultValue="overview" variant="circle">
            <Tabs.List>
              <Tabs.Trigger value="overview">
                <HatGlasses size={24} />
              </Tabs.Trigger>
              <Tabs.Trigger value="activity">
                <BicepsFlexed size={24} />
              </Tabs.Trigger>
              <Tabs.Trigger value="settings">
                <Settings size={24} />
              </Tabs.Trigger>
              <Tabs.Trigger disabled value="disable">
                <ShieldMinus />
              </Tabs.Trigger>
            </Tabs.List>
            {dummyPanels('Boxed Tabs')}
          </Tabs>
        </section>

        <section className="card p-5 w-full lg:w-1/2!">
          <p className="mb-3 text-sm font-semibold text-foreground">
            {t('Circle Vertical Tabs')}
            <span className="ml-2 text-xs font-normal text-muted">
              variant="circle-vertical"
            </span>
          </p>
          <Tabs defaultValue="overview" variant="circle-vertical">
            <Tabs.List>
              <Tabs.Trigger value="overview">
                <HatGlasses size={24} />
              </Tabs.Trigger>
              <Tabs.Trigger value="activity">
                <BicepsFlexed size={24} />
              </Tabs.Trigger>
              <Tabs.Trigger value="settings">
                <Settings size={24} />
              </Tabs.Trigger>
            </Tabs.List>
            {dummyPanels('Boxed Tabs')}
          </Tabs>
        </section>
      </div>
    </div>
  )
}

export default TabsShowcase
