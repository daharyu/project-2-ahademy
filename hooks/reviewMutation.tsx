import { UserData } from '@/entities/auth';
import { GiveReview } from '@/entities/resto';
import { addReview } from '@/services/resto.service';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useLoginUser } from './checkLoginUser';

export const useAddReview = () => {
  const queryClient = useQueryClient();
  const user: UserData | null = useLoginUser();

  return useMutation({
    mutationFn: (items: GiveReview) => addReview(user!.token, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['myOrder'] });
    },
    onError: (error) => {
      console.error('Failed to add item:', error);
    },
  });
};
