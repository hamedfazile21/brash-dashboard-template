import { Link, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { settings_nav } from '../data/settings-nav'

/** Settings shell: page title, section tabs and the active section */
function SettingsLayout() {
  const { t } = useTranslation()

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

      {/* Route tabs — same look as the underline Tabs variant, scrolls on small screens */}
      <nav className="-mx-1 overflow-x-auto px-1">
        <ul className="flex min-w-max items-center gap-x-6 border-b border-borderColor">
          {settings_nav.map(({ title, href, icon: Icon }) => (
            <li key={href}>
              <Link
                to={href}
                className="-mb-px flex items-center gap-x-2 border-b-2 border-transparent px-0.5 pb-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 hover:border-muted/40 hover:text-foreground"
                activeProps={{
                  className: 'border-primary! text-primary! hover:text-primary',
                  'aria-current': 'page',
                }}
              >
                <Icon size={16} className="shrink-0" />
                {t(title)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="min-w-0">
        <Outlet />
      </section>
    </div>
  )
}

export default SettingsLayout
