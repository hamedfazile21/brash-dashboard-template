import Accordion from '#/components/accordion/accordion'
import { faq } from '../data/FAQ'
import { useTranslation } from 'react-i18next'

const GhostAccordions = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-full lg:w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        {t('Ghost')}{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          variant="ghost"
        </span>
      </p>
      <Accordion type="single" variant="ghost" defaultValue="q1">
        {faq.map(({ value, q, a }) => (
          <Accordion.Item key={value} value={value}>
            <Accordion.Trigger>{t(q)}</Accordion.Trigger>
            <Accordion.Content>{t(a)}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  )
}

export default GhostAccordions
