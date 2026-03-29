import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'use-intl';
import { Link } from 'react-router-dom';
import {
  useLoginSchema,
  type LoginFields,
} from '@/lib/schemes/auth/login.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import { useLogin } from '../hooks/use-login';
import { AppleIcon, Facebook, Chrome } from 'lucide-react';

const defaultValues: LoginFields = {
  email: '',
  password: '',
};

export default function LoginForm() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { onLogin, isPending, loginServerError } = useLogin();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<LoginFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(useLoginSchema()),
  });

  // Handlers
  const handleLogin: SubmitHandler<LoginFields> = (data) => {
    onLogin(data);
  };

  return (
    <section className="flex max-h-screen flex-col items-center justify-center p-4 text-white">
      <div className="mb-8 text-center">
        <p className="mb-1 text-sm text-gray-400">{t('hey-there')},</p>
        <h1 className="text-4xl font-black tracking-wider uppercase">
          {t('welcome-back')}!
        </h1>
      </div>

      <div className="w-full max-w-[420px] rounded-[45px] border border-gray-300 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-md md:p-10">
        <h2 className="mb-8 text-center text-2xl font-bold">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="relative">
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder={t('email-placeholder')}
              className="h-12 rounded-full border-gray-300 bg-transparent pl-12 focus-visible:border-orange-600 focus-visible:ring-orange-600"
            />
            {errors.email && (
              <p className="mt-1 ml-4 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              {...register('password')}
              id="password"
              type="password"
              placeholder={t('password-placeholder')}
              className="h-12 rounded-full border-gray-300 bg-transparent pr-12 pl-12 focus-visible:border-orange-600 focus-visible:ring-orange-600"
            />
            {errors.password && (
              <p className="mt-1 ml-4 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forget Password */}
          <div className="flex justify-end pr-2">
            <Link
              to={ROUTES.auth.forgetPassword}
              className="text-xs font-bold tracking-tighter text-[#FF4D00] uppercase hover:underline"
            >
              {t('forgot-your-password')}
            </Link>
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="h-1 flex-1 bg-gray-300"></div>
            <span className="text-xs text-gray-500 italic">Or</span>
            <div className="h-1 flex-1 bg-gray-300"></div>
          </div>

          <div className="flex justify-center pb-2">
            <div className="flex h-9 w-32 cursor-pointer items-center justify-around rounded-full bg-zinc-800 ">
              <div className="h-4 w-4 rounded-sm opacity-70">
                <Facebook />
              </div>
              <div className="h-4 w-4 rounded-sm opacity-70">
                <Chrome />{' '}
              </div>
              <div className="h-4 w-4 rounded-sm opacity-70">
                <AppleIcon />{' '}
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending || (!isValid && isSubmitted)}
            className="h-12 w-full rounded-full bg-[#FF4D00] text-lg font-bold text-white shadow-lg transition-all hover:bg-[#e64500]"
          >
            {t('login')}
          </Button>

          {loginServerError && (
            <p className="text-center text-sm text-red-500">
              {loginServerError.message}
            </p>
          )}
        </form>

        {/* Navigate to Register */}
        <div className="mt-6 text-center text-[11px] font-medium">
          <span className="text-gray-400 uppercase">
            {t('dont-have-account')}
          </span>
          <Link
            to={ROUTES.auth.register}
            className="ms-1 font-bold text-[#FF4D00] uppercase hover:underline"
          >
            {t('register')}
          </Link>
        </div>
      </div>
    </section>
  );
}
