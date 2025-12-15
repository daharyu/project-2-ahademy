import { getSearchResto } from '@/services/resto.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Debounce untuk delay input sebelum melakukan pencarian
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export const useSearchResto = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);

  const result = useQuery({
    queryKey: ['searchResto', debouncedQuery],
    enabled: !!debouncedQuery,
    queryFn: () => getSearchResto(debouncedQuery),
  });
  return {
    ...result,
    isSearching: result.isFetching && !!debouncedQuery, //Loading state when searching
  };
};
