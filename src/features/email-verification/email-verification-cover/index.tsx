import { Clock, ShieldCheck } from 'lucide-react'
import AuthCoverLayout from '#/features/auth/components/auth-cover-layout'
import type { AuthCoverContent } from '#/features/auth/components/auth-cover-layout'
import { EmailValidationSVG } from '../../../assets'
import EmailVerificationForm from '../components/email-verification-form'

const cover: AuthCoverContent = {
  image: EmailValidationSVG,
  icon: ShieldCheck,
  title: 'One quick step to secure your account',
  description:
    'Verifying your email helps us keep your account safe and makes sure you never miss an important update.',
  points: [
    'Takes less than 30 seconds',
    'Code expires in 10 minutes',
    "Didn't get it? You can resend anytime",
  ],
  badge: { icon: Clock, label: 'Code expires in 10 minutes' },
}

function EmailVerificationCover() {
  return (
    <AuthCoverLayout cover={cover}>
      <EmailVerificationForm variant="cover" />
    </AuthCoverLayout>
  )
}

export default EmailVerificationCover
