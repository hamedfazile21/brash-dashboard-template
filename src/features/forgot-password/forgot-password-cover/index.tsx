import { Clock, Mail } from 'lucide-react'
import AuthCoverLayout from '#/features/auth/components/auth-cover-layout'
import type { AuthCoverContent } from '#/features/auth/components/auth-cover-layout'
import { ForgotPasswordSVG } from '../../../assets'
import ForgotPasswordForm from '../components/forgot-password-form'

const cover: AuthCoverContent = {
  image: ForgotPasswordSVG,
  icon: Mail,
  title: 'Account recovery, simplified',
  description:
    "We'll email you a secure link to reset your password — no security questions, no waiting on support.",
  points: [
    'Link expires after 15 minutes for your security',
    'Your account stays locked until you reset it',
    'Need help? Support responds within the hour',
  ],
  badge: { icon: Clock, label: 'Takes under a minute' },
}

function ForgotPasswordCover() {
  return (
    <AuthCoverLayout cover={cover}>
      <ForgotPasswordForm variant="cover" />
    </AuthCoverLayout>
  )
}

export default ForgotPasswordCover
