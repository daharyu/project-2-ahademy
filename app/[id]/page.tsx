'use client';
import FooterSection from '@/components/footer';
import HeaderSection from '@/components/header';
import { Spinner } from '@/components/ui/spinner';
import { useRestoDetail } from './getData';
import DisplayPicture from './displayPicture';
import Image from 'next/image';
import { Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MenuSection from './menu';
import ReviewSection from './review';

const DetailPage = () => {
  const { resto, isLoading } = useRestoDetail();
  if (isLoading)
    return (
      <div className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center'>
        <Spinner className='size-[20px] md:size-[40px]' />
      </div>
    );

  return (
    <>
      <HeaderSection isHomePage={false} />
      {/* it makes the header showable */}
      <div
        className={`flex h-16 w-[398px] items-center justify-between border-b bg-white px-4 transition-all duration-300 md:h-20 md:w-[1440px] md:px-[120px]`}
      ></div>
      <section className='my-5 px-4 md:px-[120px]'>
        <div className='md:gap-4xl flex flex-col gap-4'>
          <DisplayPicture />
          <div className='flex w-full items-center justify-between gap-4'>
            {/* Logo */}
            <Image
              src={resto.logo}
              width={1}
              height={1}
              alt='line'
              className='size-[90px] w-fit rounded-full md:size-[120px]'
            />

            {/* Info */}
            <div className='flex w-full flex-col gap-0.5 md:gap-1'>
              <h5 className='text-md md:text-display-md md:leading[text-display-md-height] leading-[30px] font-extrabold'>
                {resto.name}
              </h5>
              <div className='flex items-center gap-0.5 md:gap-1'>
                <Star fill='orange' color='orange' size={24} />
                <p className='text-sm leading-7 font-medium md:text-lg md:leading-8 md:tracking-tight'>
                  {resto.star}
                </p>
              </div>
              <h6 className='text-sm leading-7 tracking-tight md:text-lg md:leading-8 md:tracking-normal'>
                {resto.place}
              </h6>
            </div>

            {/* Button */}
            <Button variant='outline' className='md:w-11xl size-11'>
              <Share2 size={24} className='size-5 md:size-6' strokeWidth={2} />
              <p className='text-md hidden leading-[30px] font-bold tracking-tight md:block'>
                Share
              </p>
            </Button>
          </div>
        </div>
      </section>
      {/* Horizontal Line */}
      <hr className='mx-auto my-10 w-full border-neutral-300 md:w-[1200px]' />

      {/* Menu */}
      <MenuSection />

      {/* Horizontal Line */}
      <hr className='mx-auto my-10 w-full border-neutral-300 md:w-[1200px]' />

      {/* Review */}
      <ReviewSection />
      <FooterSection />
    </>
  );
};

export default DetailPage;
