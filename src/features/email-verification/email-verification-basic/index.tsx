import AuthLayout from '#/features/auth/components/auth-layout'
import EmailVerificationForm from '../components/email-verification-form'

function EmailVerificationBasic() {
  return (
    <AuthLayout>
      <EmailVerificationForm variant="basic" />
    </AuthLayout>
  )
}

export default EmailVerificationBasic
