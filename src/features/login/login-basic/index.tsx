import CheckBox from '#/components/checkbox'
import Input from '#/components/input'
import Github from '../../../assets/media/github'
import Google from '../../../assets/media/google'
import Linkedin from '../../../assets/media/linkedin'
import { useTranslation } from 'react-i18next'
import { GlassBlob1, GlassBlob2 } from '../../../assets'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { showObjectToast } from '#/helper/toast-helper'

interface LoginFormValues {
  email: string
  password: string
  rememberMe: boolean
}

const LoginBasic = () => {
  const { t } = useTranslation()
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as LoginFormValues,

    onSubmit: async ({ value }) => {
      showObjectToast('Login From Submitted', value)
    },
  })
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <img
        src={GlassBlob1}
        className="fixed top-14 ltr:lg:left-137.5 rtl:lg:right-137.5 -z-10 size-130"
      />

      <img
        src={GlassBlob2}
        className="fixed bottom-12 ltr:lg:left-212.5 rtl:lg:right-212.5 -z-10 size-130"
      />
      <div className="card w-132.5! p-10!">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            {t('Welcome back')}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('Sign in to your account to continue')}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-y-1.5">
            <Field
              name="email"
              validators={{
                onSubmit: ({ value }) =>
                  !value
                    ? 'Email is required'
                    : !/^\S+@\S+\.\S+$/.test(value)
                      ? 'Enter a valid email'
                      : undefined,
              }}
              children={(field) => {
                return (
                  <Input
                    label={t('Email')}
                    placeholder="example@gmail.com"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={
                      field.state.meta.isTouched
                        ? field.state.meta.errors.join(', ')
                        : undefined
                    }
                  />
                )
              }}
            />
          </div>

          <div className="flex flex-col gap-y-1.5">
            <Field
              name="password"
              children={(field) => {
                return (
                  <>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-foreground"
                      >
                        {t('Password')}
                      </label>
                      <Link
                        to="/forgotPassword-basic"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        {t('Forgot password?')}
                      </Link>
                    </div>
                    <div className="relative w-full">
                      <Input
                        placeholder="••••••••"
                        id={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        type="password"
                      />
                    </div>
                  </>
                )
              }}
            />
          </div>

          <Field
            name="rememberMe"
            children={(field) => (
              <label className="flex items-center gap-x-2 text-sm text-muted">
                <CheckBox
                  checked={field.state.value}
                  onChange={() => field.handleChange(!field.state.value)}
                />
                {t('Remember me')}
              </label>
            )}
          />

          <button type="submit" className="btn btn-primary mt-2 w-full!">
            {t('Sign in')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {t("Don't have an account?")}{' '}
          <Link
            to="/register-basic"
            className="font-medium text-primary hover:underline"
          >
            {t('Sign up')}
          </Link>
        </p>
        <div className="mt-6 relative">
          <div className="flex items-center gap-x-3">
            <div className="h-px flex-1 bg-borderColor" />
            <p className="text-xs text-muted">{t('OR')}</p>
            <div className="h-px flex-1 bg-borderColor" />
          </div>
          <div className="flex items-center justify-center gap-x-4 mt-1">
            <button>
              <Github />
            </button>
            <button>
              <Google />
            </button>
            <button>
              <Linkedin />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginBasic
