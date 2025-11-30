'use client';
import { getRestobyId } from '@/services/resto.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

// Custom hook must start with "use" (React convention + lint rule)
export const useRestoDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['resto', id],
    queryFn: () => {
      if (!id) throw new Error('Restaurant ID is missing');
      return getRestobyId(id as string);
    },
    enabled: !!id, // Only run query if id exists
  });

  const resto = data?.data;

  return {
    resto,
    isLoading,
    isError,
    error,
  };
};
