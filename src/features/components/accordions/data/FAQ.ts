import { CreditCard, Rocket, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface FaqItem {
  value: string
  q: string
  a: string
  icon: LucideIcon
}

export const faq: FaqItem[] = [
  {
    value: 'q1',
    q: 'How does billing work?',
    a: 'You are billed monthly or yearly, depending on your plan. Invoices are emailed to your billing address and the full history is available in Settings.',
    icon: CreditCard,
  },
  {
    value: 'q2',
    q: 'Can I change plans later?',
    a: 'Yes. Upgrades take effect immediately and are prorated; downgrades apply at the start of your next billing period.',
    icon: Rocket,
  },
  {
    value: 'q3',
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit and at rest. SSO, audit logs and custom retention are available on the Business plan.',
    icon: ShieldCheck,
  },
]
