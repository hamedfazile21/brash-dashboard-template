import SettingsLayout from '#/features/settings/components/settings-layout.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings')({
  component: SettingsLayout,
})
