import BillingSettings from '#/features/settings/billing'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/billing/')({
  component: BillingSettings,
})
