import { ListCollapse, Settings2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Accordion from '#/components/accordion/accordion'
import type { AccordionVariant } from '#/components/accordion/accordion-provider'
import ShowcaseHeader from '../shared/showcase-header'
import ShowcaseSection from '../shared/showcase-section'
import DemoCard from '../shared/demo-card'
import { faq } from './data/FAQ'

const variants: {
  variant: AccordionVariant
  title: string
  description: string
}[] = [
  {
    variant: 'simple',
    title: 'Simple',
    description: 'Divider lines, nothing else',
  },
  {
    variant: 'bordered',
    title: 'Bordered',
    description: 'Each item is its own card',
  },
  { variant: 'boxed', title: 'Boxed', description: 'Soft filled tiles' },
  { variant: 'icon', title: 'Icon', description: 'Leading icon per item' },
  {
    variant: 'plusMinus',
    title: 'Plus / minus',
    description: 'Toggle glyph instead of a chevron',
  },
  {
    variant: 'ghost',
    title: 'Ghost',
    description: 'Compact, for dense sidebars',
  },
]

function FaqAccordion({
  variant,
  type = 'single',
  collapsible = true,
  defaultValue = 'q1',
  disableLast = false,
}: {
  variant: AccordionVariant
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  disableLast?: boolean
}) {
  const { t } = useTranslation()

  return (
    <Accordion
      type={type}
      variant={variant}
      collapsible={collapsible}
      defaultValue={defaultValue}
    >
      {faq.map(({ value, q, a, icon: Icon }, i) => (
        <Accordion.Item
          key={value}
          value={value}
          disabled={disableLast && i === faq.length - 1}
        >
          <Accordion.Trigger icon={<Icon size={15} />}>
            {t(q)}
          </Accordion.Trigger>
          <Accordion.Content>{t(a)}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

function AccordionShowcase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Accordion"
        description="Six visual styles on one compound component, with smooth height animation and full keyboard support."
        code='<Accordion type="single" variant="bordered" collapsible />'
        stats={[
          { value: 6, label: 'Variants' },
          { value: 2, label: 'Modes' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />

      <ShowcaseSection
        icon={ListCollapse}
        title="Styles"
        description="Same content, different variant prop"
      >
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {variants.map(({ variant, title, description }) => (
            <DemoCard
              key={variant}
              title={title}
              description={description}
              code={`variant="${variant}"`}
            >
              <FaqAccordion variant={variant} />
            </DemoCard>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        icon={Settings2}
        title="Behaviour"
        description="How many items can be open, and whether they can close"
      >
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          <DemoCard
            title="Multiple open"
            description="Any number of items can be expanded at once"
            code='type="multiple"'
          >
            <FaqAccordion
              variant="bordered"
              type="multiple"
              defaultValue={['q1', 'q2']}
            />
          </DemoCard>
          <DemoCard
            title="Always one open"
            description="Clicking the open item keeps it open; last item disabled"
            code="collapsible={false}"
          >
            <FaqAccordion variant="boxed" collapsible={false} disableLast />
          </DemoCard>
        </div>
      </ShowcaseSection>
    </div>
  )
}

export default AccordionShowcase
