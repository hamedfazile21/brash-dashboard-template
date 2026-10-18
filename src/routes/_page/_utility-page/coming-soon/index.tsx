import ComingSoon from '#/features/utility-pages/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_utility-page/coming-soon/')({
  component: ComingSoon,
})
