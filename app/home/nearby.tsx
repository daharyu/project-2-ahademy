/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CustomCard from '@/components/customCard';
import { Spinner } from '@/components/ui/spinner';
import { UserData } from '@/entities/auth';
import { useLoginUser } from '@/hooks/checkLoginUser';
import { getRestoNearby } from '@/services/resto.service';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import Image from 'next/image';

const NearbySection = () => {
  const user: UserData | null = useLoginUser();
  const { data, isLoading } = useQuery({
    queryKey: ['nearbyResto'],
    enabled: !!user,
    queryFn: () => getRestoNearby(user!.token),
  });

  const recData = data?.data;

  if (isLoading)
    return (
      <section className='flex flex-col gap-4 px-4 py-6 md:m-5 md:gap-8'>
        <div className='flex justify-between'>
          <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
            Nearby
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
  if (!recData)
    return (
      <section className='flex flex-col gap-4 px-4 py-6 md:m-5 md:gap-8'>
        <div className='flex justify-between'>
          <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
            Nearby
          </h2>
          <span className='text-md text-primary-100 leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
            See All
          </span>
        </div>
        <div className='flex h-[200px] items-center justify-center'>
          <p className='text-display-xs md:text-display-md leading-[text-display-xs-height] text-gray-400 md:leading-[text-display-md-height]'>
            Data not found
          </p>
        </div>
      </section>
    );
  return (
    <>
      <section className='flex flex-col gap-4 px-4 py-6 md:m-5 md:gap-8'>
        <div className='flex justify-between'>
          <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
            Nearby
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
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default NearbySection;
