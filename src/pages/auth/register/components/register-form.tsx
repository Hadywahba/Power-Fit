import { Link } from "react-router-dom";
import { useTranslations } from "use-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/constants/routes/routes.constant";

import { useRegisterStore } from "@/lib/store/register.store";
import {
  createRegisterSchema,
  type RegisterFields,
} from "@/lib/schemes/auth/register.schema";

// Default Values
const defaultValues: RegisterFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  rePassword: "",
};

export default function RegisterStepOne() {
  const t = useTranslations();

  const { data, setStepData, nextStep } = useRegisterStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<RegisterFields>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: { ...defaultValues, ...data },
    mode: "onTouched",
  });

  function handleNext(incoming: RegisterFields) {
    setStepData(incoming);
    nextStep();
  }

  return (
    <section className="mx-auto mt-5 w-full md:w-[70%]">
      <form
        onSubmit={handleSubmit(handleNext)}
        className="space-y-4 border-y-2 border-zinc-200 py-8 dark:border-zinc-600"
      >
        {/* First Name */}
        <Input
          {...register("firstName")}
          id="firstName"
          type="text"
          aria-label={t("first-name")}
          error={errors.firstName?.message}
          placeholder={t("first-name")}
        />

        {/* Last Name */}
        <Input
          {...register("lastName")}
          id="lastName"
          type="text"
          aria-label={t("last-name")}
          error={errors.lastName?.message}
          placeholder={t("last-name")}
        />

        {/* Email */}
        <Input
          {...register("email")}
          id="email"
          type="email"
          aria-label={t("email")}
          error={errors.email?.message}
          placeholder={t("email")}
        />

        {/* Password */}
        <Input
          {...register("password")}
          id="password"
          type="password"
          aria-label={t("password")}
          error={errors.password?.message}
          placeholder={t("password")}
        />

        {/* Confirm Password */}
        <Input
          {...register("rePassword")}
          id="rePassword"
          type="password"
          aria-label={t("confirm-password")}
          error={errors.rePassword?.message}
          placeholder={t("confirm-password")}
        />

        {/* Next Step */}
        <Button
          type="submit"
          disabled={!isValid && isSubmitted}
          className="w-full"
        >
          {t("register")}
        </Button>
      </form>

      {/* Navigate to Login */}
      <div className="mt-3 flex justify-center text-sm">
        <span>
          {t("already-have-account")}
          <Link
            to={ROUTES.auth.login}
            className="ms-1 font-semibold underline text-main"
          >
            {t("login")}
          </Link>
        </span>
      </div>
    </section>
  );
}
