/**
 * Every auth page exists in a "basic" (centered card) and a "cover" (split
 * with artwork) version. Each version links to its own siblings, so moving
 * between pages keeps the same look.
 */
export type AuthVariant = 'basic' | 'cover'

export const authLinks = {
  basic: {
    login: '/login-basic',
    register: '/register-basic',
    forgotPassword: '/forgotPassword-basic',
    reset: '/reset-basic',
    verifyEmail: '/emailVerification-basic',
  },
  cover: {
    login: '/login-cover',
    register: '/register-cover',
    forgotPassword: '/forgotPassword-cover',
    reset: '/reset-cover',
    verifyEmail: '/emailVerification-cover',
  },
} as const
