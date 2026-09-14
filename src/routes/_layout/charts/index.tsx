import Charts from '#/features/charts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/charts/')({
  component: Charts,
})
