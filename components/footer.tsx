import Image from 'next/image';
import Logo from '@/public/images/Logo.svg';
import React from 'react';
import { categoryData } from '@/app/constants/categoryData';

const FooterSection = () => {
  return (
    <>
      <footer className='mb:mt-10 mt-5 flex w-full flex-col gap-6 border-t border-neutral-300 bg-neutral-950 px-4 py-10 text-white md:flex-row md:justify-between md:px-[120px] md:py-20'>
        {/* Left / Up */}
        <div className='flex flex-col gap-4 md:w-1/3 md:gap-10'>
          {/* Logo / Description */}
          <div className='flex flex-col gap-[22px]'>
            <div className='flex items-center gap-4'>
              <Image src={Logo} width={42} height={42} alt='logo' />
              <h2 className='text-display-md mleading-[text-display-md-height] font-extrabold'>
                Foody
              </h2>
            </div>
            <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
              Enjoy homemade flavors & chef’s signature dishes, freshly prepared
              every day. Order online or visit our nearest branch.
            </p>
          </div>

          {/* Social Media */}
          <div className='flex w-[196px] flex-col gap-5'>
            <p className='text-md text-center text-left leading-[30px] font-bold tracking-tight md:tracking-normal'>
              Follow on Social Media
            </p>
            {/* Social Media */}
            <div className='flex gap-3'>
              {[1, 2, 3, 4].map((item) => (
                <div
                  className='flex size-10 items-center justify-center rounded-full border border-neutral-300'
                  key={item}
                >
                  <Image
                    src={`/images/sosmed${item}.svg`}
                    width={20}
                    height={20}
                    alt={`sosmed${item}`}
                    className='h-[20px] w-[20px] invert'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right / Down */}
        <div className='flex w-full gap-4 md:w-1/2 md:justify-between'>
          <div className='flex w-1/2 flex-col gap-4 md:gap-5'>
            <h6 className='md:text-md text-sm leading-7 font-extrabold tracking-tight md:leading-[30px]'>
              Explore
            </h6>

            {categoryData.map((item) => (
              <p
                className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'
                key={item}
              >
                {item}
              </p>
            ))}
          </div>

          <div className='flex w-1/2 flex-col gap-4 md:gap-5'>
            <h6 className='md:text-md text-sm leading-7 font-extrabold tracking-tight md:leading-[30px]'>
              Help
            </h6>
            <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
              How to Order
            </p>
            <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
              Payment Methods
            </p>
            <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
              Track My Order
            </p>
            <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
              FAQ
            </p>
            <p className='md:text-md text-sm leading-7 tracking-tight md:leading-[30px]'>
              Contact Us
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
