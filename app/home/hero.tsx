import { Input } from '@/components/ui/input';
import heroImage from '@/public/images/Hero.svg';
import { Search } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <>
      <section className='relative h-fit w-full'>
        <Image
          src={heroImage}
          width={1440}
          height={1024}
          alt='hero'
          className='h-[648px] w-full object-none md:h-fit'
        />
        {/* Gradient */}
        <div className='absolute top-0 z-10 h-full w-full bg-black/80' />

        <div className='absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 md:gap-10'>
          {/* Title */}
          <div className='flex flex-col items-center justify-center gap-1 text-center text-white md:gap-2'>
            <h1 className='md:text-display-2xl text-display-lg leading-[text-display-lg-height] font-extrabold md:leading-[text-display-2xl-height]'>
              Explore Culinary Experiences
            </h1>
            <p className='md:text-display-xs text-lg leading-8 font-bold md:leading-[text-display-xs-height]'>
              Search and refine your choice to discover the perfect restaurant.
            </p>
          </div>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Search restaurants, food and drink'
              className='md:text-md h-12 w-[350px] rounded-full! bg-white px-4 py-2 indent-6 text-sm md:h-14 md:w-[604px] md:px-6'
            />
            <Search
              size={20}
              color='#535862'
              className='absolute top-1/2 left-4 -translate-y-1/2'
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
