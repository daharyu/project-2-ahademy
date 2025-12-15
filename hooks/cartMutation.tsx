import { Cart, CheckOut } from '@/entities/resto';
import {
  addToCart,
  addToCheckout,
  deleteCart,
  deleteEntireCart,
  updateCart,
} from '@/services/resto.service';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useLoginUser } from './checkLoginUser';
import { UserData } from '@/entities/auth';

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  const user = useLoginUser();

  return useMutation({
    mutationFn: (item: Cart) => addToCart(user!.token, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to add item:', error);
    },
  });
};

export const useUpdateToCartMutation = () => {
  const queryClient = useQueryClient();
  const user: UserData | null = useLoginUser();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCart(user!.token, id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to add item:', error);
    },
  });
};

export const useDeleteToCartMutation = () => {
  const queryClient = useQueryClient();
  const user: UserData | null = useLoginUser();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteCart(user!.token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to add item:', error);
    },
  });
};
export const useDeleteEntireCartMutation = () => {
  const queryClient = useQueryClient();
  const user: UserData | null = useLoginUser();

  return useMutation({
    mutationFn: () => deleteEntireCart(user!.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to add item:', error);
    },
  });
};

export const useAddtoCheckout = () => {
  const queryClient = useQueryClient();
  const user: UserData | null = useLoginUser();

  return useMutation({
    mutationFn: (items: CheckOut) => addToCheckout(user!.token, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['myOrder'] });
    },
    onError: (error) => {
      console.error('Failed to add item:', error);
    },
  });
};
