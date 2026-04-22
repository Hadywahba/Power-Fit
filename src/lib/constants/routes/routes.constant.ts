export const ROUTES = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    forgetPassword: 'auth/forget-password',
    kyc: 'auth/kyc',
  },
  app: {
    root: '/',
    home: '/',
    about: '/about',
    classes: '/classes',
    healthy: '/healthy',
    kyc: '/kyc',
    profile: '/profile',
  },
} as const;

export type AppRoutes = typeof ROUTES;
