import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profilePictureApi } from '../apis/upload-profile-picture.api';
import { toast } from 'sonner';
export function useUploadProfile() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await profilePictureApi(data);
      return response;
    },

    onSuccess: (data) => {
      console.log(data);
      toast.success('success');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError:(err)=>{
         console.log(err);
    }
  });

  return {
    uploadProfile: mutate,
    isPending,
    error,
  };
}
