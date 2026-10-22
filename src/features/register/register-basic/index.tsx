import AuthLayout from '#/features/auth/components/auth-layout'
import RegisterForm from '../components/register-form'

function RegisterBasic() {
  return (
    <AuthLayout>
      <RegisterForm variant="basic" />
    </AuthLayout>
  )
}

export default RegisterBasic
