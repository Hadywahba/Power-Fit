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
    exercises: '/exercises/:id',
    healthy: '/healthy',
    healthyDetails:`healthyDetails/:id`,
    kyc: '/kyc',
    profile: '/profile',
    chatbot: '/chatbot',
    privacyPolicy: '/privacy-policy',
    security: '/security',
    help: '/help',
  },
} as const;

export type AppRoutes = typeof ROUTES;
