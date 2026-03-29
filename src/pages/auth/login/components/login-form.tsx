import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "use-intl";
import { Link } from "react-router-dom";
import {
  useLoginSchema,
  type LoginFields,
} from "@/lib/schemes/auth/login.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import { useLogin } from "../hooks/use-login";

// Default Values
const defaultValues: LoginFields = {
  email: "",
  password: "",
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
    mode: "onChange",
    resolver: zodResolver(useLoginSchema()),
  });

  // Handlers
  const handleLogin: SubmitHandler<LoginFields> = (data) => {
    onLogin(data);
  };

  return (
    <section className="flex flex-col items-center justify-center max-h-screen  text-white p-4">
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm mb-1">{t("Hey There")},</p>
        <h1 className="text-4xl font-black tracking-wider uppercase">{t("Welcome Back")}!</h1>
      </div>
      <div className="w-full max-w-[420px] backdrop-blur-md border border-white/10 rounded-[45px] p-8 md:p-10 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-4 border-y-2 border-zinc-200 py-8 dark:border-zinc-600"
      >
        {/* Email */}
        <Input
          {...register("email")}
          id="email"
          type="email"
          label={t("email")}
          error={errors.email?.message}
          placeholder={t("email-placeholder")}
          className="bg-transparent border-zinc-600 rounded-full pl-12 h-12 focus-visible:ring-orange-600 focus-visible:border-orange-600"
        />

        {/* Password */}
        <Input
          {...register("password")}
          id="password"
          type="password"
          label={t("password")}
          error={errors.password?.message}
          placeholder={t("password-placeholder")}
          className="bg-transparent border-zinc-600 rounded-full pl-12 h-12 focus-visible:ring-orange-600 focus-visible:border-orange-600"
        />

        {/* Forget Password */}
        <div className="flex justify-end">
          <Link
            to={ROUTES.auth.forgetPassword}
            className="text-sm font-semibold text-main hover:underline"
          >
            {t("forgot-your-password")}
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending || (!isValid && isSubmitted)}
          serverError={loginServerError?.message}
          className="w-full"
        >
          {t("login")}
        </Button>
      </form>
      </div>
      {/* Navigate to Register */}
      <div className="mt-3 flex justify-center text-sm">
        <span>
          {t("dont-have-account")}
          <Link
            to={ROUTES.auth.register}
            className="ms-1 font-semibold underline text-main"
          >
            {t("register")}
          </Link>
        </span>
      </div>
    </section>
  );
}
