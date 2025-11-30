import CustomCard from '@/components/customCard';
import Image from 'next/image';
import { categoryData } from '../constants/categoryData';

const CategorySection = () => {
  return (
    <>
      <section className='grid grid-cols-3 md:m-5 md:flex md:justify-between'>
        {categoryData.map((item, index: number) => (
          <div
            className='mx-auto flex w-[106px] flex-col gap-1 md:w-[161px] md:gap-[6px]'
            key={item}
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
    </>
  );
};

export default CategorySection;
