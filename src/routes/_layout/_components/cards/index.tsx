import CardShowCase from '#/features/components/cards'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_components/cards/')({
  component: CardShowCase,
})
