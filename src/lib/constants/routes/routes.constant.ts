export const ROUTES = {
  auth: {
    login: '/login',
    register: '/register',
    forgetPassword: '/forget-password',
    kyc: '/kyc',
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
