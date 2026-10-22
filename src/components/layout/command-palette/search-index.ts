import {
  FileText,
  Languages,
  Lock,
  LogOut,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import i18n from '#/app/i18n'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import {
  changeDirection,
  changeLanguage,
  toggleSidebar,
  toggleTheme,
} from '#/features/theme/slice/theme-slice'
import { settings_nav } from '#/features/settings/data/settings-nav'
import { sidebar_data } from '../data/sidebar-data'
import type { SidebarItem } from '../data/sidebar-data'

export interface PaletteItem {
  id: string
  kind: 'page' | 'action'
  title: string
  /** Parent item for nested links, e.g. "Login" for Login → Cover */
  parent?: string
  /** Scope the item belongs to — a sidebar group, "Settings" or "Actions" */
  group: string
  description: string
  icon: LucideIcon
  href?: string
  run?: () => void
  /** Extra words that should match, e.g. "dark" for the theme action */
  keywords?: string[]
}

/** One line per scope, used as the description of every page in it */
const groupDescriptions: Record<string, string> = {
  Main: 'Core page of the dashboard',
  Projects: 'Interactive app with its own data',
  Authentication: 'Sign-in and account recovery screen',
  'Utility pages': 'Full-screen status page',
  'User Interface': 'Component showcase with live examples',
  'Tables and Forms': 'Data display and form controls',
  Settings: 'Personal preferences',
}

/** Short chip labels for long sidebar group names */
export const scopeLabels: Record<string, string> = {
  Main: 'Pages',
  Projects: 'Apps',
  Authentication: 'Auth',
  'Utility pages': 'Utility',
  'User Interface': 'UI',
  'Tables and Forms': 'Data',
  Settings: 'Settings',
  Actions: 'Actions',
}

/** Static class names per scope — Tailwind can't see `bg-${color}` */
export const scopeColors: Record<string, string> = {
  Main: 'bg-primary/12 text-primary',
  Projects: 'bg-emerald-500/12 text-emerald-500',
  Authentication: 'bg-violet-500/12 text-violet-500',
  'Utility pages': 'bg-amber-500/12 text-amber-500',
  'User Interface': 'bg-pink-500/12 text-pink-500',
  'Tables and Forms': 'bg-cyan-500/12 text-cyan-500',
  Settings: 'bg-slate-500/12 text-slate-500 dark:text-slate-300',
  Actions: 'bg-orange-500/12 text-orange-500',
}

function buildPageIndex(): PaletteItem[] {
  const items: PaletteItem[] = []

  for (const group of sidebar_data) {
    for (const item of (group.children ?? []) as SidebarItem[]) {
      const icon = item.icon ?? FileText
      const description = groupDescriptions[group.title] ?? ''
      if (item.href) {
        items.push({
          id: item.href,
          kind: 'page',
          title: item.title,
          group: group.title,
          description,
          icon,
          href: item.href,
        })
      }
      for (const child of item.children ?? []) {
        if (!child.href) continue
        items.push({
          id: child.href,
          kind: 'page',
          title: child.title,
          parent: item.title,
          group: group.title,
          description,
          icon,
          href: child.href,
        })
      }
    }
  }

  // Settings sections live in their own tabs, not the sidebar
  for (const section of settings_nav) {
    items.push({
      id: section.href,
      kind: 'page',
      title: section.title,
      parent: 'Settings',
      group: 'Settings',
      description: section.description,
      icon: section.icon,
      href: section.href,
    })
  }

  return items
}

export const PAGE_INDEX = buildPageIndex()

/** Quick actions — built per render so labels reflect the current state */
export function usePaletteActions(): PaletteItem[] {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { language, sidebarStatus } = useAppSelector(
    (state) => state.themeConfig,
  )
  // themeMode alone can be "system", so read the resolved class
  useAppSelector((state) => state.themeConfig.themeMode)
  const isDark = document.documentElement.classList.contains('dark')
  const isFarsi = language === 'farsi'
  const isCollapsed = sidebarStatus === 'collapsible-vertical'

  return [
    {
      id: 'action:theme',
      kind: 'action',
      title: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      group: 'Actions',
      description: 'Change the color theme of the whole dashboard',
      icon: isDark ? Sun : Moon,
      keywords: ['theme', 'dark', 'light', 'appearance'],
      run: () => dispatch(toggleTheme(isDark ? 'light' : 'dark')),
    },
    {
      id: 'action:language',
      kind: 'action',
      title: isFarsi ? 'Switch to English' : 'Switch to Farsi',
      group: 'Actions',
      description: 'Change the interface language and text direction',
      icon: Languages,
      keywords: ['language', 'rtl', 'ltr', 'english', 'farsi', 'persian'],
      run: () => {
        dispatch(changeLanguage(isFarsi ? 'english' : 'farsi'))
        dispatch(changeDirection(isFarsi ? 'ltr' : 'rtl'))
        i18n.changeLanguage(isFarsi ? 'en' : 'fa')
      },
    },
    {
      id: 'action:sidebar',
      kind: 'action',
      title: isCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
      group: 'Actions',
      description: 'Show the full sidebar or shrink it to icons',
      icon: isCollapsed ? PanelLeftOpen : PanelLeftClose,
      keywords: ['sidebar', 'menu', 'navigation', 'layout'],
      run: () =>
        dispatch(
          toggleSidebar(isCollapsed ? 'vertical' : 'collapsible-vertical'),
        ),
    },
    {
      id: 'action:lock',
      kind: 'action',
      title: 'Lock screen',
      group: 'Actions',
      description: 'Hide the dashboard until you enter your password',
      icon: Lock,
      keywords: ['lock', 'away', 'security'],
      run: () => navigate({ to: '/lock-screen' }),
    },
    {
      id: 'action:logout',
      kind: 'action',
      title: 'Sign out',
      group: 'Actions',
      description: 'End your session and return to the sign-in page',
      icon: LogOut,
      keywords: ['logout', 'log out', 'sign out', 'exit'],
      run: () => navigate({ to: '/login-basic' }),
    },
  ]
}

/** Case-insensitive match across title, parent, scope and keywords — in English and the active language */
export function matchesQuery(
  item: PaletteItem,
  query: string,
  t: (key: string) => string,
) {
  const q = query.toLowerCase()
  return [item.title, item.parent ?? '', item.group, ...(item.keywords ?? [])]
    .flatMap((text) => [text, t(text)])
    .some((text) => text.toLowerCase().includes(q))
}
