import type { AuthSession } from "@/lib/types/auth";
import type { RegisterBody } from "@/lib/types/register";
import { apiRequest } from "@/lib/utils/api/api-request";

export const registerApi = (body: RegisterBody) =>
  apiRequest<AuthSession>({
    endpoint: "/auth/signup",
    method: "POST",
    body,
  });
