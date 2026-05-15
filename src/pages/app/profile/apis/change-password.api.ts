import type { ProfilePictureResponse } from '@/lib/types/profile-picture';
import { apiRequest } from '@/lib/utils/api/api-request';

export const changePasswordApi = (body: FormData) =>
  apiRequest<ProfilePictureResponse>({
    endpoint: 'auth/change-password',
    method: 'PATCH',
    body,
  });
