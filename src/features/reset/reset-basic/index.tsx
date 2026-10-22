import AuthLayout from '#/features/auth/components/auth-layout'
import ResetPasswordForm from '../components/reset-password-form'

function ResetBasic() {
  return (
    <AuthLayout>
      <ResetPasswordForm variant="basic" />
    </AuthLayout>
  )
}

export default ResetBasic
