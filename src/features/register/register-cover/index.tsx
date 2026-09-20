import React from 'react'
import {
  Avatar4,
  Avatar5,
  Avatar6,
  GlassBlob1,
  GlassBlob2,
  RegisterCoverPNG,
} from '../../../assets'
import Github from '../../../assets/media/github'
import Google from '../../../assets/media/google'
import Linkedin from '../../../assets/media/linkedin'
import { Link } from '@tanstack/react-router'
import CheckBox from '#/components/checkbox'
import Input from '#/components/input'
import { Check } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import { showObjectToast } from '#/helper/toast-helper'

interface RegisterForm {
  fist_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
  agreement: boolean
}

const RegisterCover = () => {
  const { t } = useTranslation()
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      fist_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      agreement: false,
    } as RegisterForm,
    onSubmit: async ({ value }) => {
      showObjectToast('Register From Submitted', value)
    },
  })
  return (
    <div className="flex items-center w-full h-screen relative">
      <img
        src={GlassBlob1}
        className="fixed top-10 rtl:md:right-70 rtl:lg:right-110 ltr:md:left-70 ltr:lg:left-110 -z-10 size-130"
      />

      <img
        src={GlassBlob2}
        className="fixed bottom-10 rtl:right-30 ltr:left-30 -z-10 size-130"
      />
      <div className="flex w-full items-center justify-center lg:w-[55%] z-10 ">
        <div className="card  p-10! w-132.5!  sm:p-10">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-foreground">
              {t('Create your account')}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {t('Start your free trial — no credit card required')}
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
            <div className="flex gap-x-3">
              <Field
                name="fist_name"
                children={(field) => (
                  <Input
                    label={t('First name')}
                    placeholder="Hamed"
                    id={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    type="text"
                  />
                )}
              />

              <Field
                name="last_name"
                children={(field) => (
                  <Input
                    label={t('Last name')}
                    placeholder="Fazeli"
                    id={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    type="text"
                  />
                )}
              />
            </div>

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
              children={(field) => (
                <div className="flex flex-col gap-y-1.5">
                  <Input
                    label={t('Email')}
                    placeholder="example@gmail.com"
                    id={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={
                      field.state.meta.isTouched
                        ? field.state.meta.errors.join(', ')
                        : undefined
                    }
                  />
                </div>
              )}
            />

            <Field
              name="password"
              validators={{
                onSubmit: ({ value }) =>
                  !value ? 'Password is required' : undefined,
              }}
              children={(field) => (
                <Input
                  label={t('Password')}
                  placeholder="••••••••"
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  type="password"
                />
              )}
            />

            <Field
              name="confirm_password"
              validators={{
                onSubmit: ({ value }) =>
                  !value ? 'Password is required' : undefined,
              }}
              children={(field) => (
                <Input
                  label={t('Confirm password')}
                  placeholder="••••••••"
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  type="password"
                />
              )}
            />

            <Field
              name="agreement"
              children={(field) => (
                <label
                  onClick={() => field.handleChange(!field.state.value)}
                  className="flex items-start gap-x-2 text-sm text-muted"
                >
                  <CheckBox
                    checked={field.state.value}
                    onChange={() => field.handleChange(!field.state.value)}
                  />
                  <span className="cursor-pointer">
                    {t('I agree to the Terms of Service and Privacy Policy')}
                  </span>
                </label>
              )}
            />

            <button
              type="submit"
              className="btn btn-primary mt-2 w-full!"
              disabled={false}
            >
              {t('Create account')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {t('Already have an account?')}{' '}
            <Link
              to="/login-cover"
              className="font-medium text-primary hover:underline"
            >
              {t('Sign in')}
            </Link>
          </p>

          <div className="mt-6">
            <div className="flex items-center gap-x-3">
              <div className="h-px flex-1 bg-borderColor" />
              <p className="text-xs text-muted">{t('OR')}</p>
              <div className="h-px flex-1 bg-borderColor" />
            </div>

            <div className="mt-4 flex items-center justify-center gap-x-3">
              <button type="button" aria-label="Sign up with GitHub">
                <Github />
              </button>
              <button type="button" aria-label="Sign up with Google">
                <Google />
              </button>
              <button type="button" aria-label="Sign up with LinkedIn">
                <Linkedin />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex relative h-screen w-[45%] items-center justify-center overflow-hidden p-10">
        <img
          src={RegisterCoverPNG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* subtle dark overlay so the glass card has enough contrast against varied cover images */}
        <div className="hidden dark:block absolute inset-0 bg-black/20" />

        <div className="hidden dark:block absolute inset-0 bg-black/20" />

        <div className="card relative z-10 w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-foreground">
            {t('Get started in minutes')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t(
              'Everything you need to launch your workflow — no credit card, no setup calls, just sign up and go.',
            )}
          </p>

          <ul className="mt-6 flex flex-col gap-y-3">
            {[
              'Unlimited projects on every plan',
              'Invite your whole team for free',
              'Cancel anytime, no questions asked',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-x-2.5 text-sm text-foreground"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check size={13} strokeWidth={3} />
                </span>
                {t(item)}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-x-4 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">
              <img
                src={Avatar4}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
              <img
                src={Avatar5}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
              <img
                src={Avatar6}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
            </div>
            <p className="text-xs text-muted">
              {t('Joined by')}{' '}
              <span className="font-semibold text-foreground">4,000+</span>{' '}
              {t('teams this year')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCover
