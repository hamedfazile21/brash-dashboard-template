import NotificationsShowCase from '#/features/components/notifications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_components/notifications/')({
  component: NotificationsShowCase,
})
