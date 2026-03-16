export const ROUTES = {
  auth: {
    root: "/auth",
    login: "login",
    register: "register",
    forgetPassword: "forget-password",
  },
  app: {
    root: "/",
    home: "/",
    about: "about",
    classes: "classes",
    healthy: "healthy",
    profile: "profile",
  },
} as const;

export type AppRoutes = typeof ROUTES;
