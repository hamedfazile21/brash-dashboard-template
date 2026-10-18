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
    title: 'Profile',
    description: 'Your photo, name and bio',
    href: '/settings/profile',
    icon: UserRound,
  },
  {
    title: 'Account',
    description: 'Email, password and security',
    href: '/settings/account',
    icon: ShieldCheck,
  },
  {
    title: 'Notifications',
    description: 'Choose what you hear about',
    href: '/settings/notifications',
    icon: Bell,
  },
  {
    title: 'Appearance',
    description: 'Theme, language and layout',
    href: '/settings/appearance',
    icon: Palette,
  },
  {
    title: 'Billing',
    description: 'Plan, payment and invoices',
    href: '/settings/billing',
    icon: CreditCard,
  },
]
