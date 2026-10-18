import AppearanceSettings from '#/features/settings/appearance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/appearance/')({
  component: AppearanceSettings,
})
