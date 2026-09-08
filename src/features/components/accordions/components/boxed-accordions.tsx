import Accordion from '#/components/accordion/accordion'
import { faq } from '../data/FAQ'

const BoxedAccordions = () => {
  return (
    <section className="card p-5 w-full lg:w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Boxed{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          variant="boxed"
        </span>
      </p>
      <Accordion type="multiple" variant="boxed" defaultValue={['q1']}>
        {faq.map(({ value, q, a }) => (
          <Accordion.Item key={value} value={value}>
            <Accordion.Trigger>{q}</Accordion.Trigger>
            <Accordion.Content>{a}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  )
}

export default BoxedAccordions
