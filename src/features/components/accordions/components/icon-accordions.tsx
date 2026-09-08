import Accordion from '#/components/accordion/accordion'
import { CreditCard, Rocket, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const IconAccordions = () => {
  const { t } = useTranslation()
  return (
    <section className="card p-5 w-full lg:w-1/2">
      <p className="mb-3 text-sm font-semibold text-foreground">
        {t('Icon')}{' '}
        <span className="ml-2 text-xs font-normal text-muted">
          variant="icon"
        </span>
      </p>
      <Accordion type="single" variant="icon" defaultValue="q1">
        <Accordion.Item value="q1">
          <Accordion.Trigger icon={<Rocket size={15} />}>
            {t('Getting started')}
          </Accordion.Trigger>
          <Accordion.Content>
            {t(`Create a workspace, invite your team, and connect your first
            integration — you'll be up and running in a few minutes`)}
            .
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="q2">
          <Accordion.Trigger icon={<ShieldCheck size={15} />}>
            {t('Security')}
          </Accordion.Trigger>
          <Accordion.Content>
            {t(`All data is encrypted in transit and at rest. SSO and audit logs are
            available on the Business plan`)}
            .
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="q3">
          <Accordion.Trigger icon={<CreditCard size={15} />}>
            {t('Billing')}
          </Accordion.Trigger>
          <Accordion.Content>
            {t(`Invoices are generated monthly and sent to your billing email, with
            a full history available in Settings`)}
            .
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </section>
  )
}

export default IconAccordions
