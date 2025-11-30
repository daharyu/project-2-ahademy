'use client';
import { Review } from '@/entities/resto';
import { Star } from 'lucide-react';
import { useRestoDetail } from './getData';
import CustomCard from '@/components/customCard';
import Image from 'next/image';
import imgMe from '@/public/images/me.svg';
import { formatDateID } from './neededHook';

const ReviewSection = () => {
  const { resto } = useRestoDetail();
  const reviews: Review[] = resto?.reviews;
  return (
    <>
      <section className='mx-auto flex flex-col gap-4 pb-6 md:w-[1200px] md:gap-8'>
        <div className='flex flex-col gap-2 md:gap-3'>
          <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
            Review
          </h2>
          {/* Stars */}
          <div className='flex items-center gap-1'>
            <Star
              size={20}
              className='size-6 md:size-[34px]'
              fill='orange'
              color='orange'
            />
            <p className='text-md leading-[30px] font-extrabold md:text-xl md:leading-[34px]'>
              {resto.star} ({resto.totalReviews} Ulasan)
            </p>
          </div>
        </div>

        {/* Container */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5'>
          {reviews?.map((review, index) => (
            <CustomCard key={index} className='flex flex-col gap-4 p-4'>
              {/* Profile */}
              <div className='flex gap-3'>
                <Image
                  src={imgMe}
                  width={50}
                  height={50}
                  alt='profile'
                  className='size-[58px] rounded-full md:size-16'
                />
                <div className='flex flex-col'>
                  <h6 className='text-md leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
                    {review.user.name}
                  </h6>
                  <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
                    {formatDateID(review.createdAt)}
                  </p>
                </div>
              </div>

              {/* Star and Comment */}
              <div className='flex flex-col gap-2'>
                <div className='flex gap-0.5'>
                  {Array.from({ length: Number(review.star) }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={24}
                        fill='orange'
                        color='transparent'
                      />
                    )
                  )}
                </div>
                <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
                  {review.comment}
                </p>
              </div>
            </CustomCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default ReviewSection;
