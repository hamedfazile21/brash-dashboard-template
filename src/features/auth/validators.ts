import type { TFunction } from 'i18next'

export const MIN_PASSWORD_LENGTH = 8

export function validateEmail(t: TFunction, value: string) {
  if (!value.trim()) return t('Email is required')
  if (!/^\S+@\S+\.\S+$/.test(value)) return t('Enter a valid email')
  return undefined
}

export function validateNewPassword(t: TFunction, value: string) {
  if (!value) return t('Password is required')
  if (value.length < MIN_PASSWORD_LENGTH) {
    return t('Must be at least {{count}} characters', {
      count: MIN_PASSWORD_LENGTH,
    })
  }
  return undefined
}

export function validateConfirmPassword(
  t: TFunction,
  value: string,
  password: string,
) {
  if (!value) return t('Confirm your password')
  if (value !== password) return t('Passwords do not match')
  return undefined
}

/** Shows a field's errors only once the user has interacted with it */
export function fieldError(meta: { isTouched: boolean; errors: unknown[] }) {
  return meta.isTouched && meta.errors.length > 0
    ? meta.errors.filter(Boolean).join(', ')
    : undefined
}
