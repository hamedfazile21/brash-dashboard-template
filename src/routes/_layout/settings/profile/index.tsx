import ProfileSettings from '#/features/settings/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/profile/')({
  component: ProfileSettings,
})
