/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CustomCard from '@/components/customCard';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getAllResto } from '@/services/resto.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';

const RecommendSection = () => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['allResto'],
    queryFn: ({ pageParam = 1 }) => getAllResto(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination || {};
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const recData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.restaurants) ?? [];
  }, [data]);

  if (isLoading)
    return (
      <section className='flex flex-col gap-4 px-4 py-6 md:m-5 md:gap-8'>
        <div className='flex justify-between'>
          <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
            Recommend
          </h2>
          <span className='text-md text-primary-100 leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
            See All
          </span>
        </div>
        <div className='flex h-[200px] items-center justify-center'>
          <Spinner className='size-[20px] md:size-[40px]' />
        </div>
      </section>
    );
  return (
    <>
      <section className='flex flex-col gap-4 px-4 py-6 md:m-5 md:gap-8'>
        <div className='flex justify-between'>
          <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
            Recommend
          </h2>
          <span className='text-md text-primary-100 leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
            See All
          </span>
        </div>

        {/* Container */}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {isLoading ? (
            <div className='flex h-[200px] items-center justify-center'>
              <p className='text-display-xs md:text-display-md leading-[text-display-xs-height] text-gray-400 md:leading-[text-display-md-height]'>
                Loading...
              </p>
            </div>
          ) : (
            recData.map((item: any) => (
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
                  className='size-[90px] rounded-xl md:size-[120px]'
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
            ))
          )}
        </div>
        {hasNextPage && (
          <div className='mt-12 flex justify-center'>
            <Button
              variant='outline'
              size='lg'
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className='text-md w-40 rounded-[100px] border-neutral-300 leading-[30px] font-bold tracking-tight'
            >
              {isFetchingNextPage ? 'Loading...' : 'Show More'}
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default RecommendSection;
