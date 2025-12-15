'use client';
import CustomCard from '@/components/customCard';
import { Input } from '@/components/ui/input';
import heroImage from '@/public/images/Hero.svg';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { categoryData } from '../constants/categoryData';
import BestSellerSection from './best-seller';
import NearbySection from './nearby';
import RecommendSection from './recomend';
import SearchSection from './searchResult';
import { useRouter } from 'next/navigation';

const CategorySection = () => {
  const [category, setCategory] = useState('rec');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleCategory = (index: number) => {
    if (index === 2 || index === 4 || index === 5) setCategory('rec');
    else if (index === 1) setCategory('nearby');
    else if (index === 3) setCategory('best');
    else if (index === 0) router.push('/category');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    if (query) {
      setCategory('search');
    } else {
      setCategory('rec');
    }
  };
  return (
    <>
      {/* Hero moved here */}
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
              onChange={handleChange}
            />
            <Search
              size={20}
              color='#535862'
              className='absolute top-1/2 left-4 -translate-y-1/2'
            />
          </div>
        </div>
      </section>

      <section className='grid grid-cols-3 md:m-5 md:flex md:justify-between'>
        {categoryData.map((item, index: number) => (
          <div
            className='mx-auto flex w-[106px] flex-col gap-1 md:w-[161px] md:gap-[6px]'
            key={item}
            onClick={() => handleCategory(index)}
          >
            <CustomCard className='flex h-[100px] w-full items-center justify-center'>
              <Image
                src={`/images/Category${index + 1}.svg`}
                width={100}
                height={100}
                alt='category'
                className='size-12 md:size-16'
              />
            </CustomCard>
            <p className='text-center text-sm leading-7 font-bold md:text-lg md:leading-8 md:tracking-tighter'>
              {item}
            </p>
          </div>
        ))}
      </section>
      {category === 'rec' && <RecommendSection />}
      {category === 'nearby' && <NearbySection />}
      {category === 'best' && <BestSellerSection />}
      {category === 'search' && <SearchSection restoName={search} />}
    </>
  );
};

export default CategorySection;
