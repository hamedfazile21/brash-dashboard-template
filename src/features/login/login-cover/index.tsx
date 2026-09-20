import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import {
  Avatar1,
  Avatar2,
  Avatar3,
  GlassBlob,
  GlassBlob1,
  GlassBlob2,
  LoginCoverPNG,
} from '../../../assets'
import Input from '#/components/input'
import CheckBox from '#/components/checkbox'
import Github from '../../../assets/media/github'
import Google from '../../../assets/media/google'
import Linkedin from '../../../assets/media/linkedin'
import { useTranslation } from 'react-i18next'
import { showObjectToast } from '#/helper/toast-helper'

interface LoginFormValues {
  email: string
  password: string
  rememberMe: boolean
}

const LoginCover = () => {
  const { t } = useTranslation()
  const [check, setCheck] = useState<boolean>(false)
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
    <div className="w-full h-screen flex items-center justify-between relative">
      {/* <img
        src={GlassBlob1}
        className="hidden md:block fixed top-14 right-30 -z-10 size-130"
      /> */}

      <img
        src={GlassBlob}
        className="fixed bottom-22 rtl:right-20 ltr:left-20 -z-10 size-120"
      />
      {/* <img
        src={GlassBlob2}
        className="hidden md:block fixed bottom-12 right-50 -z-10 size-130"
      /> */}

      <div className="flex w-full items-center justify-center lg:w-1/2 z-10 ">
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
            </div>

            <div className="flex flex-col gap-y-1.5">
              <Field
                name="password"
                validators={{
                  onSubmit: ({ value }) =>
                    !value ? 'Password is required' : undefined,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        {t('Password')}
                      </label>
                      <a
                        href="/forgot-password"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        {t('Forgot password?')}
                      </a>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="••••••••"
                      type="password"
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
            <a
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              {t('Sign up')}
            </a>
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
      <div className="hidden lg:flex relative h-screen w-[45%] items-center justify-center overflow-hidden p-10">
        <img
          src={LoginCoverPNG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* subtle dark overlay so the glass card has enough contrast against varied cover images */}
        <div className="hidden dark:block absolute inset-0 bg-black/20" />

        <div className="hidden dark:block absolute inset-0 bg-black/20" />

        <div className="card relative z-10 w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-foreground">
            {t('Manage everything, in one place')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t(
              'Track projects, collaborate with your team, and stay on top of what matters — all from a single dashboard built for speed.',
            )}
          </p>

          <div className="mt-6 flex items-center gap-x-4 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">
              <img
                src={Avatar1}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
              <img
                src={Avatar2}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
              <img
                src={Avatar3}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
            </div>
            <p className="text-xs text-muted">
              {t('Trusted by')}{' '}
              <span className="font-semibold text-foreground">4,000+</span>{' '}
              {t('teams worldwide')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginCover
