import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthLayout from '@/components/layout/auth/auth-layout';
import AppLayout from '@/components/layout/app/app-layout';
import NotFound from '@/components/shared/not-found';
import ProtectedRoute from '@/components/shared/protected-route';
import GuestRoute from '@/components/shared/guest-route';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import Loading from '@/components/shared/loading';
import KycPage from '@/pages/auth/kyc/page';
import HomePage from '@/pages/app/home/page';
import ExercisesPage from '@/pages/app/exercises/page';

// ─── Auth Pages ───
const LoginPage = lazy(() => import('@/pages/auth/login/page'));
const RegisterPage = lazy(() => import('@/pages/auth/register/page'));
const ForgetPasswordPage = lazy(
  () => import('@/pages/auth/forget-password/page'),
);

// ─── App Pages ───
const AboutPage = lazy(() => import('@/pages/app/about/page'));
const ClassesPage = lazy(() => import('@/pages/app/classes/page'));
const HealthyPage = lazy(() => import('@/pages/app/healthy/page'));
const HealthyDetailsPage = lazy(
  () => import('@/pages/app/healthy-details/page'),
);
const ProfilePage = lazy(() => import('@/pages/app/profile/page'));
const ChatbotPage = lazy(() => import('@/pages/app/chatbot/page'));
const PrivacyPolicyPage = lazy(() => import('@/pages/app/privacy-policy/page'));
const SecurityPage = lazy(() => import('@/pages/app/security/page'));
const HelpPage = lazy(() => import('@/pages/app/help/page'));

// ─── Suspense Wrapper ───
const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<Loading />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  // ─── Auth Layout — guests only ───
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.auth.login, element: withSuspense(<LoginPage />) },
          {
            path: ROUTES.auth.register,
            element: withSuspense(<RegisterPage />),
          },
          { path: ROUTES.auth.kyc, element: withSuspense(<KycPage />) },
          {
            path: ROUTES.auth.forgetPassword,
            element: withSuspense(<ForgetPasswordPage />),
          },
        ],
      },
    ],
  },

  // ─── App Layout ───
  {
    path: ROUTES.app.root,
    element: <AppLayout />,
    children: [
      // public
      { index: true, element: <HomePage /> },
      { path: ROUTES.app.about, element: withSuspense(<AboutPage />) },

      // protected
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.app.classes, element: withSuspense(<ClassesPage />) },
          {
            path: ROUTES.app.exercises,
            element: withSuspense(<ExercisesPage />),
          },
          { path: ROUTES.app.healthy, element: withSuspense(<HealthyPage />) },
          {
            path: ROUTES.app.healthyDetails,
            element: withSuspense(<HealthyDetailsPage />),
          },
          { path: ROUTES.app.profile, element: withSuspense(<ProfilePage />) },
          { path: ROUTES.app.chatbot, element: withSuspense(<ChatbotPage />) },
          { path: ROUTES.app.privacyPolicy, element: withSuspense(<PrivacyPolicyPage />) },
          { path: ROUTES.app.security, element: withSuspense(<SecurityPage />) },
          { path: ROUTES.app.help, element: withSuspense(<HelpPage />) },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
