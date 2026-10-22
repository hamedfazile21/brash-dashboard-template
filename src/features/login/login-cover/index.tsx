import { LayoutDashboard, ShieldCheck } from 'lucide-react'
import AuthCoverLayout, {
  SocialProof,
} from '#/features/auth/components/auth-cover-layout'
import type { AuthCoverContent } from '#/features/auth/components/auth-cover-layout'
import { LoginCoverPNG } from '../../../assets'
import LoginForm from '../components/login-form'

const cover: AuthCoverContent = {
  image: LoginCoverPNG,
  icon: LayoutDashboard,
  title: 'Manage everything, in one place',
  description:
    'Track projects, collaborate with your team, and stay on top of what matters — all from a single dashboard built for speed.',
  badge: { icon: ShieldCheck, label: 'Secure sign-in' },
}

function LoginCover() {
  return (
    <AuthCoverLayout
      cover={cover}
      footer={<SocialProof label="teams trust Brash every day" />}
    >
      <LoginForm variant="cover" />
    </AuthCoverLayout>
  )
}

export default LoginCover
