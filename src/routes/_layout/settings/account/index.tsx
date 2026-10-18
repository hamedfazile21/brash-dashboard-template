import AccountSettings from '#/features/settings/account'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/account/')({
  component: AccountSettings,
})
