import { Rocket, Sparkles } from 'lucide-react'
import AuthCoverLayout, {
  SocialProof,
} from '#/features/auth/components/auth-cover-layout'
import type { AuthCoverContent } from '#/features/auth/components/auth-cover-layout'
import { RegisterCoverPNG } from '../../../assets'
import RegisterForm from '../components/register-form'

const cover: AuthCoverContent = {
  image: RegisterCoverPNG,
  icon: Rocket,
  title: 'Get started in minutes',
  description:
    'Everything you need to launch your workflow — no credit card, no setup calls, just sign up and go.',
  points: [
    'Unlimited projects on every plan',
    'Invite your whole team for free',
    'Cancel anytime, no questions asked',
  ],
  badge: { icon: Sparkles, label: 'Free 14-day trial' },
}

function RegisterCover() {
  return (
    <AuthCoverLayout
      cover={cover}
      footer={<SocialProof label="teams joined this year" />}
    >
      <RegisterForm variant="cover" />
    </AuthCoverLayout>
  )
}

export default RegisterCover
