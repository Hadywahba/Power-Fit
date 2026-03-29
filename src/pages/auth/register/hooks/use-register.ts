import { useAuth } from "@/hooks/shared/use-auth";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import type { RegisterBody } from "@/lib/types/register";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslations } from "use-intl";
import { registerApi } from "../api/register-api";

export function useRegister() {
  // Translations
  const t = useTranslations();
  // Navigation
  const navigate = useNavigate();
  // Hooks
  const { login: saveToken } = useAuth();

  // Mutation
  const {
    mutate: onRegister,
    isPending,
    error: registerServerError,
  } = useMutation({
    mutationFn: async (Values: RegisterBody) => await registerApi(Values),

    onSuccess: (data) => {
      saveToken(data.token);
      toast.success(t("successful-register"));
      navigate(ROUTES.app.home);
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { onRegister, isPending, registerServerError };
}
