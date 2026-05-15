import type { ProfilePictureResponse } from '@/lib/types/profile-picture';
import { apiRequest } from '@/lib/utils/api/api-request';

export const profilePictureApi = (body: FormData) =>
  apiRequest<ProfilePictureResponse>({
    endpoint: 'auth/upload-photo',
    method: 'PUT',
    body,
  });
