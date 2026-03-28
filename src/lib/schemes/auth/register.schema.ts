import { PASSWORD_PATTERN } from "@/lib/constants/auth/auth.constant";
import { useTranslations } from "use-intl";
import z from "zod";



export function RegisterSchema() {

    const t = useTranslations();
  
  
  z.object({
    email: z.email({
      error: (iss) =>
        iss.input ? t("email-is-invalid") : t("email-is-required"),
    }),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        PASSWORD_PATTERN,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
    confirmPassword: z.string().nonempty("Please Confirm Your Password"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });
  
}

export type RegisterFields = z.infer<ReturnType<typeof RegisterSchema>>;
