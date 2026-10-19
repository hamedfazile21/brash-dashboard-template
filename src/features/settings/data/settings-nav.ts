import { Bell, CreditCard, Palette, ShieldCheck, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type SettingsNavItem = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export const settings_nav: SettingsNavItem[] = [
  {
    title: 'Appearance',
    description: 'Theme, language and layout',
    href: '/settings/appearance',
    icon: Palette,
  },
]
