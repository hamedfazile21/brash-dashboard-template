import NotificationsSettings from '#/features/settings/notifications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/notifications/')({
  component: NotificationsSettings,
})
