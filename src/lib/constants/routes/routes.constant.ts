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
    healthyDetails:`healthyDetails/:id`,
    profile: '/profile',
  },
} as const;

export type AppRoutes = typeof ROUTES;
