export const ROUTES = {
  auth: {
    login: '/login',
    register: '/register',
    forgetPassword: '/forget-password',
  },
  app: {
    root: '/',
    home: '/',
    about: '/about',
    classes: '/classes',
    healthy: '/healthy',
    profile: '/profile',
    kyc: 'kyc',
  },
} as const;

export type AppRoutes = typeof ROUTES;
