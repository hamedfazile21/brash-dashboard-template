import {
  ArrowRight,
  Bookmark,
  DollarSign,
  Heart,
  LayoutGrid,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
  Activity,
  Sparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Card from '#/components/card/card'
import {
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  LoginCoverPNG,
  RegisterCoverPNG,
  ResetPasswordPNG,
} from '../../../assets'
import ShowcaseHeader from '../shared/showcase-header'
import ShowcaseSection from '../shared/showcase-section'
import DemoCard from '../shared/demo-card'

const glassButton =
  'flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30'

function ViewsSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={LayoutGrid}
      title="Views"
      description="Six layouts from one compound component — hover each to see its interaction"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DemoCard
          title="Default"
          code='view="default"'
          description="Accent bar slides in on hover"
        >
          <Card view="default">
            <Card.Header>
              <Card.Title>{t('Team members')}</Card.Title>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                {t('8 active')}
              </span>
            </Card.Header>
            <Card.Content>
              <Card.Description>
                {t(
                  'Invite teammates to collaborate. They get access to shared projects and tasks.',
                )}
              </Card.Description>
            </Card.Content>
            <Card.Footer>
              <button type="button" className="btn btn-primary btn-sm">
                {t('Invite')}
              </button>
            </Card.Footer>
          </Card>
        </DemoCard>

        <DemoCard
          title="Stat"
          code='view="stat"'
          description="A KPI with a trend and an icon"
        >
          <Card view="stat">
            <Card.Header>
              <Card.Description>{t('Total revenue')}</Card.Description>
              <Card.Title>$42,580</Card.Title>
              <span className="mt-1.5 flex items-center gap-x-1 text-xs font-medium text-success">
                <TrendingUp size={13} />
                +12.4% {t('from last month')}
              </span>
            </Card.Header>
            <Card.Icon>
              <DollarSign size={19} />
            </Card.Icon>
          </Card>
        </DemoCard>

        <DemoCard
          title="Media"
          code='view="media"'
          description="Image zooms gently on hover"
        >
          <Card view="media">
            <Card.Media src={LoginCoverPNG} alt="" />
            <Card.Content>
              <Card.Title>{t('Announcing the new dashboard')}</Card.Title>
              <Card.Description>
                {t(
                  'Faster, more accessible, with full dark mode and RTL support.',
                )}
              </Card.Description>
            </Card.Content>
            <Card.Footer>
              <a
                href="#"
                className="flex items-center gap-x-1 text-sm font-medium text-primary hover:underline"
              >
                {t('Read more')}
                <ArrowRight size={15} className="rtl:rotate-180" />
              </a>
              <span className="text-xs text-muted">{t('4 min read')}</span>
            </Card.Footer>
          </Card>
        </DemoCard>

        <DemoCard
          title="Hover reveal"
          code='view="hover"'
          description="Details and actions appear on hover"
        >
          <Card view="hover" className="max-h-72 w-full">
            <Card.Media src={RegisterCoverPNG} alt="" />
            <Card.Actions>
              <button
                type="button"
                aria-label={t('Like')}
                className={glassButton}
              >
                <Heart size={15} />
              </button>
              <button
                type="button"
                aria-label={t('Save')}
                className={glassButton}
              >
                <Bookmark size={15} />
              </button>
            </Card.Actions>
            <Card.Content>
              <Card.Title>{t('Minimal workspace setup')}</Card.Title>
              <Card.Description>
                {t('A calm, distraction-free desk for focused work.')}
              </Card.Description>
            </Card.Content>
          </Card>
        </DemoCard>

        <DemoCard
          title="Horizontal"
          code='view="horizontal"'
          description="List and search-result layout"
        >
          <Card view="horizontal">
            <Card.Media src={ResetPasswordPNG} alt="" />
            <Card.Content>
              <span className="mb-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
                {t('Guide')}
              </span>
              <Card.Title>{t('Securing your account')}</Card.Title>
              <Card.Description>
                {t(
                  'Turn on two-factor authentication and review active sessions in a few clicks.',
                )}
              </Card.Description>
            </Card.Content>
          </Card>
        </DemoCard>

        <DemoCard
          title="Profile"
          code='view="profile"'
          description="Avatar, name, role and actions"
        >
          <Card view="profile">
            <Card.Avatar name="Hamed Fazeli" src={Avatar13} />
            <Card.Content>
              <Card.Title>Hamed Fazeli</Card.Title>
              <Card.Description>{t('Product Designer')}</Card.Description>
            </Card.Content>
            <Card.Footer>
              <button type="button" className="btn btn-secondary btn-sm">
                {t('Message')}
              </button>
              <button type="button" className="btn btn-primary btn-sm">
                {t('Follow')}
              </button>
            </Card.Footer>
          </Card>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

const kpis = [
  { label: 'Revenue', value: '$42.5k', trend: 12.4, icon: DollarSign },
  { label: 'Customers', value: '2,940', trend: 4.1, icon: Users },
  { label: 'Orders', value: '1,206', trend: -2.3, icon: ShoppingBag },
  { label: 'Sessions', value: '18.2k', trend: 8.9, icon: Activity },
]

const team = [
  { name: 'Sara Ahmadi', role: 'Engineering Lead', avatar: Avatar10 },
  { name: 'Kian Rostami', role: 'Frontend Developer', avatar: Avatar11 },
  { name: 'Nina Karimi', role: 'Product Manager', avatar: Avatar12 },
]

function InContextSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Sparkles}
      title="In context"
      description="How the views combine on a real dashboard"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, trend, icon: Icon }) => (
          <Card key={label} view="stat">
            <Card.Header>
              <Card.Description>{t(label)}</Card.Description>
              <Card.Title>{value}</Card.Title>
              <span
                className={`mt-1.5 flex items-center gap-x-1 text-xs font-medium ${trend >= 0 ? 'text-success' : 'text-danger'}`}
              >
                {trend >= 0 ? (
                  <TrendingUp size={13} />
                ) : (
                  <TrendingDown size={13} />
                )}
                {trend > 0 ? '+' : ''}
                {trend}%
              </span>
            </Card.Header>
            <Card.Icon>
              <Icon size={19} />
            </Card.Icon>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {team.map(({ name, role, avatar }) => (
          <Card key={name} view="profile">
            <Card.Avatar name={name} src={avatar} />
            <Card.Content>
              <Card.Title>{name}</Card.Title>
              <Card.Description>{t(role)}</Card.Description>
            </Card.Content>
            <Card.Footer>
              <button type="button" className="btn btn-secondary btn-sm">
                {t('Message')}
              </button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </ShowcaseSection>
  )
}

function CardShowcase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Cards"
        description="Six views on one compound component — only the view prop changes. Each has its own hover interaction."
        code='<Card view="media"><Card.Media /><Card.Content /></Card>'
        stats={[
          { value: 6, label: 'Views' },
          { value: 10, label: 'Slots' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <ViewsSection />
      <InContextSection />
    </div>
  )
}

export default CardShowcase
