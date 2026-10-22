import AuthLayout from '#/features/auth/components/auth-layout'
import LoginForm from '../components/login-form'

function LoginBasic() {
  return (
    <AuthLayout>
      <LoginForm variant="basic" />
    </AuthLayout>
  )
}

export default LoginBasic
