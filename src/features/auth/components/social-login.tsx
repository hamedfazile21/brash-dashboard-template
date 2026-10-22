import { useTranslation } from 'react-i18next'
import Github from '../../../assets/media/github'
import Google from '../../../assets/media/google'
import Linkedin from '../../../assets/media/linkedin'

const providers = [
  { name: 'Google', icon: Google },
  { name: 'GitHub', icon: Github },
  { name: 'LinkedIn', icon: Linkedin },
]

export function OrDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-x-3 text-xs text-muted mt-5">
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-borderColor rtl:bg-linear-to-l" />
      {label}
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-borderColor rtl:bg-linear-to-r" />
    </div>
  )
}

/** Provider buttons, then an "or with email" divider leading into the form */
function SocialLogin({ action }: { action: 'Sign in' | 'Sign up' }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-6">
      <OrDivider
        label={t(action === 'Sign in' ? 'Or sign in with' : 'Or sign up with')}
      />
      <div className="grid grid-cols-3 gap-2">
        {providers.map(({ name, icon: Icon }) => (
          <button
            key={name}
            type="button"
            aria-label={t(`${action} with {{provider}}`, { provider: name })}
            title={name}
            // The provider SVGs ship at w-8 — shrink them to icon size here
            className="group btn btn-secondary [&_svg]:size-5 w-full!"
          >
            <Icon />
            <span className="hidden sm:inline">{name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SocialLogin
