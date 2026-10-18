import Maintenance from '#/features/utility-pages/maintenance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_utility-page/maintenance/')({
  component: Maintenance,
})
