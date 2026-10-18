import { Link, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { settings_nav } from '../data/settings-nav'
import { useAppDispatch } from '#/hooks/redux'
import { toggleSidebar } from '#/features/theme/slice/theme-slice'

/** Settings shell: page title, section menu and the active section */
function SettingsLayout() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  dispatch(toggleSidebar('collapsible-vertical'))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          {t('Settings')}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {t('Manage your account settings and preferences')}
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Vertical menu on desktop, scrollable tabs on mobile */}
        <nav className="card p-2! lg:sticky! lg:top-6 lg:w-64 lg:shrink-0">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {settings_nav.map(({ title, description, href, icon: Icon }) => (
              <li key={href} className="shrink-0">
                <Link
                  to={href}
                  className="group flex items-center gap-x-3 rounded-lg px-3 py-2 text-muted transition-colors hover:bg-surface-hover/50 hover:text-foreground"
                  activeProps={{
                    className:
                      'bg-primary/10! text-primary! hover:bg-primary/10',
                  }}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium whitespace-nowrap">
                      {t(title)}
                    </span>
                    <span className="hidden truncate text-xs text-muted lg:block">
                      {t(description)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="min-w-0 flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default SettingsLayout
