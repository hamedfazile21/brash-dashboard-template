import { KeyRound, ShieldCheck } from 'lucide-react'
import AuthCoverLayout from '#/features/auth/components/auth-cover-layout'
import type { AuthCoverContent } from '#/features/auth/components/auth-cover-layout'
import { ResetPasswordPNG } from '../../../assets'
import ResetPasswordForm from '../components/reset-password-form'

const cover: AuthCoverContent = {
  image: ResetPasswordPNG,
  icon: KeyRound,
  title: 'Almost there — secure your account',
  description:
    "Pick a password you haven't used before. We'll sign you out of every other device once it's updated.",
  points: [
    'At least 8 characters',
    'A mix of letters, numbers and symbols works best',
    "You'll be signed out everywhere else",
  ],
  badge: { icon: ShieldCheck, label: 'End-to-end encrypted' },
}

function ResetCover() {
  return (
    <AuthCoverLayout cover={cover}>
      <ResetPasswordForm variant="cover" />
    </AuthCoverLayout>
  )
}

export default ResetCover
