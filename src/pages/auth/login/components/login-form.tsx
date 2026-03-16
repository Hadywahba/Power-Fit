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
    <section className="mx-auto mt-5 w-full md:w-[70%]">
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
        />

        {/* Password */}
        <Input
          {...register("password")}
          id="password"
          type="password"
          label={t("password")}
          error={errors.password?.message}
          placeholder={t("password-placeholder")}
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
