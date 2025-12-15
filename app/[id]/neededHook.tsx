import { Cart } from '@/entities/resto';
import { useLoginUser } from '@/hooks/checkLoginUser';
import { addToCart } from '@/services/resto.service';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const formatRupiah = (amount: number | string) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(Number(amount))
    .replace('Rp', 'Rp'); // already includes "Rp", but you can customize
};

export const formatDateID = (isoString: string): string => {
  const date = new Date(isoString);

  return (
    date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) +
    ', ' +
    date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  );
};

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
