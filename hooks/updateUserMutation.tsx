import { UpdateProfile, UserData, UserProfileData } from '@/entities/auth';
import { getUser, UpdateUser } from '@/services/users.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoginUser } from './checkLoginUser';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: UpdateProfile) => UpdateUser(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });
};

export const useGetProfile = () => {
  const user: UserData | null = useLoginUser();
  return useQuery({
    queryKey: ['user', 'profile'],
    enabled: !!user,
    queryFn: () => getUser(user!.token),
  });
};
