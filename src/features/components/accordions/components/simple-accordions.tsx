import Accordion from '#/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { faq } from '../data/FAQ'

const SimpleAccordions = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-full lg:w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        {t('Simple')}{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          variant="simple"
        </span>
      </p>
      <Accordion type="single" variant="simple" defaultValue="q1">
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

export default SimpleAccordions
