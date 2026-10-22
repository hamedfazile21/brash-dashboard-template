import AuthLayout from '#/features/auth/components/auth-layout'
import ForgotPasswordForm from '../components/forgot-password-form'

function ForgotPasswordBasic() {
  return (
    <AuthLayout>
      <ForgotPasswordForm variant="basic" />
    </AuthLayout>
  )
}

export default ForgotPasswordBasic
