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
import { Apple, Chrome, Facebook } from 'lucide-react';

// Default Values
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
    <section className="flex max-h-screen flex-col items-center justify-center p-2 text-white">
      <div className="mb-8 text-center">
        <p className="mb-1 text-sm text-gray-400">{t('hey-there')},</p>
        <h1 className="text-4xl font-black tracking-wider uppercase">
          {t('welcome-back')}!
        </h1>
      </div>
     <div className="w-full max-w-96 rounded-xl border border-gray-300 p-8 shadow-2xl backdrop-blur-md md:p-10">
        <h2 className=" text-center text-2xl font-bold">{t('login')}</h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4  py-4"
        >
          {/* Email */}
          <Input
            {...register('email')}
            id="email"
            type="email"
            label={t('email')}
            error={errors.email?.message}
            placeholder={t('email-placeholder')}
            className="h-12 rounded-full border-gray-300 bg-transparent pl-12 focus-visible:border-orange-600 focus-visible:ring-orange-600"
          />

          {/* Password */}
          <Input
            {...register('password')}
            id="password"
            type="password"
            label={t('password')}
            error={errors.password?.message}
            placeholder={t('password-placeholder')}
            className="h-12 rounded-full border-gray-300 bg-transparent pl-12 focus-visible:border-orange-600 focus-visible:ring-orange-600"
          />

          {/* Forget Password */}
          <div className="flex justify-end">
            <Link
              to={ROUTES.auth.forgetPassword}
              className="text-main text-sm font-semibold hover:underline"
            >
              {t('forgot-your-password')}
            </Link>
          </div>
          {/* devider */}
         <div className="relative flex items-center justify-center">
  <span className="relative px-3 text-xs text-gray-500 italic
    before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:-translate-x-full before:h-1 before:w-25 before:bg-gray-500
    after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:translate-x-full after:h-1 after:w-25 after:bg-gray-500
  ">
    {t('or')}
  </span>
</div>

          {/* Social Icons Placeholder */}
          <div className="flex justify-center gap-5 pb-2">
            <div className="flex h-9 w-28 cursor-pointer items-center justify-around rounded-full   transition-colors ">
              <div className="h-6 w-6 flex items-center justify-center rounded-full  opacity-70 bg-zinc-800">
                <Facebook size={16} className="text-gray-100" />
             
        </div>
                <div className="h-6 w-6 flex items-center justify-center rounded-full  opacity-70 bg-zinc-800">
                  <Chrome size={16} className="text-gray-100" />
                </div>
                <div className="h-6 w-6 flex items-center justify-center rounded-full  opacity-70 bg-zinc-800">
                  <Apple size={16} className="text-gray-100" />
                </div>
            </div>
          </div>
          {/* Submit */}
          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending || (!isValid && isSubmitted)}
            serverError={loginServerError?.message}
            className="w-full"
          >
            {t('login')}
          </Button>
        </form>
          <div className="mt-3 flex justify-center text-sm">
        <span>
          {t('dont-have-account')}
          <Link
            to={ROUTES.auth.register}
            className="text-main ms-1 font-semibold underline"
          >
            {t('register')}
          </Link>
        </span>
      </div>
      </div>
      {/* Navigate to Register */}

    </section>
          // <SmartCoachChat />

          

  );
}
