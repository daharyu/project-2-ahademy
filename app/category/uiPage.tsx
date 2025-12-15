// CategoryUi.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CustomCard from '@/components/customCard';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { getAllResto } from '@/services/resto.service'; // Assuming this is correct
import { useInfiniteQuery } from '@tanstack/react-query';
import { ListFilter, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import FilterContent from './filterContent';

const CategoryUi = () => {
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const filters = useMemo(
    () => ({
      priceMin: priceMin || undefined,
      priceMax: priceMax || undefined,
      rating: selectedRating || undefined,
    }),
    [priceMin, priceMax, selectedRating]
  );

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    // IMPORTANT: When 'filters' changes, the query refetches from page 1
    queryKey: ['restoFilter', filters],
    queryFn: ({ pageParam = 1 }) => {
      console.log('TanStack Query received:', { pageParam, filters });
      return getAllResto({
        params: {
          page: pageParam,
          ...filters,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination || {};
      if (!page || !totalPages) return undefined;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  const recData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.restaurants) ?? [];
  }, [data]);

  if (isError) {
    return (
      <div className='mx-auto mt-20 text-center'>
        <p className='text-display-xs text-red-500'>
          Error loading restaurants.
        </p>
      </div>
    );
  }

  // Props object to pass to FilterContent
  const filterProps = {
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    selectedRating,
    setSelectedRating,
  };

  return (
    <>
      <section className='mx-auto mt-20 flex max-w-[361px] flex-col gap-4 pb-6 md:mt-[128px] md:max-w-[1200px] md:gap-8'>
        <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
          All Restaurant
        </h2>

        <div className='flex flex-col gap-4 md:flex-row md:gap-10'>
          {/* Left - Filter Sidebar */}
          <aside className='flex w-full flex-col gap-6 md:w-[266px]'>
            {/* Mobile Filter Sheet */}
            <CustomCard className='flex w-full flex-col gap-2.5 rounded-[12px] md:hidden'>
              <Sheet>
                <SheetTrigger className='md:hidden'>
                  <div className='flex flex-row justify-between'>
                    <h4 className='md:text-md text-sm leading-7 font-extrabold md:hidden md:leading-[30px]'>
                      Filter
                    </h4>
                    <ListFilter size={20} />
                  </div>
                </SheetTrigger>
                <SheetContent
                  side='left'
                  className='flex-col gap-2.5 p-4 md:hidden'
                >
                  <SheetTitle className='hidden'></SheetTitle>
                  <h4 className='text-md leading-[30px] font-extrabold'>
                    Filter
                  </h4>
                  {/* PASS PROPS TO MOBILE SHEET */}
                  <FilterContent {...filterProps} />
                </SheetContent>
              </Sheet>
            </CustomCard>

            {/* PC Filter Sidebar */}
            <CustomCard className='hidden w-full flex-col gap-2.5 rounded-[12px] p-5 md:flex'>
              <h4 className='text-md leading-[30px] font-extrabold'>Filter</h4>
              {/* PASS PROPS TO DESKTOP SIDEBAR */}
              <FilterContent {...filterProps} />
            </CustomCard>
          </aside>

          {/* Right - Restaurant Grid */}
          <div className='grid w-full grid-cols-1 gap-5 md:w-4/5 md:grid-cols-2'>
            {isLoading && (
              <div className='col-span-1 flex h-[200px] items-center justify-center md:col-span-2'>
                <p className='text-display-xs md:text-display-md leading-[text-display-xs-height] text-gray-400 md:leading-[text-display-md-height]'>
                  Loading Initial Restaurants...
                </p>
              </div>
            )}

            {!isLoading && recData.length === 0 && (
              <div className='col-span-1 flex h-[200px] items-center justify-center md:col-span-2'>
                <p className='text-display-xs md:text-display-md leading-[text-display-xs-height] text-gray-400 md:leading-[text-display-md-height]'>
                  No restaurants found with the current filters.
                </p>
              </div>
            )}

            {recData.map((item: any) => (
              <CustomCard
                key={item.id}
                className='flex gap-2 p-3 md:gap-3 md:p-4'
                href={`/${item.id}`}
              >
                <Image
                  src={item.logo}
                  width={100}
                  height={100}
                  alt={item.name}
                  className='size-[90px] rounded-xl object-cover md:size-[120px]'
                />

                {/* Description */}
                <div className='my-auto flex flex-col gap-0.5'>
                  <h6 className='text-md leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
                    {item.name}
                  </h6>
                  <div className='flex items-center gap-1'>
                    <Star fill='orange' color='orange' size={24} />
                    <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tight'>
                      {item.star}
                    </p>
                  </div>
                  <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tight'>
                    {item.place}
                  </p>
                </div>
              </CustomCard>
            ))}

            {/* Load More Button (Infinite Query Implementation) */}
            {hasNextPage && (
              <div className='col-span-1 mt-4 flex justify-center md:col-span-2'>
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className='bg-primary-100 md:text-md h-10 w-48 text-sm leading-7 font-bold text-white disabled:opacity-70 md:h-11 md:leading-[30px]'
                >
                  {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </Button>
              </div>
            )}

            {/* Show message when all pages are loaded */}
            {!hasNextPage && recData.length > 0 && (
              <div className='col-span-1 mt-4 text-center text-sm text-gray-500 md:col-span-2'>
                You&apos;ve reached the end of the list.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryUi;
