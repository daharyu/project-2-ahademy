/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useRestoDetail } from './getData';

const DisplayPicture = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { resto } = useRestoDetail();

  return (
    <>
      {/* Show Image PC */}
      <div className='hidden gap-5 md:flex'>
        {/* Left - Main Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='h-fit w-1/2'
        >
          {resto.images[0] === 'string' ? (
            <div className='flex h-[470px] w-[651px] items-center justify-center rounded-2xl bg-gray-600'>
              <p className='text-2xl text-white'>No Image</p>
            </div>
          ) : (
            <Image
              src={resto?.images[0]}
              width={651}
              height={470}
              alt={resto?.images[0]}
              className='h-[470px] w-[651px] rounded-2xl object-none'
            />
          )}
        </motion.div>

        {/* Right Column */}
        <div className='flex h-fit w-1/2 flex-col gap-5'>
          {/* Top Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className='h-1/2'
          >
            {resto.images[0] === 'string' ? (
              <div className='flex h-[302px] w-[529px] items-center justify-center rounded-2xl bg-gray-600'>
                <p className='text-2xl text-white'>No Image</p>
              </div>
            ) : (
              <Image
                src={resto?.images[0]}
                width={529}
                height={302}
                alt={resto?.images[0]}
                className='h-[302px] w-[529px] rounded-2xl object-none'
              />
            )}
          </motion.div>

          {/* Bottom Row - Two small ones */}
          <div className='flex h-1/2 gap-5'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
              className='w-fit'
            >
              {resto.images[1] === 'string' ? (
                <div className='flex h-[148px] w-[255px] items-center justify-center rounded-2xl bg-gray-600'>
                  <p className='text-2xl text-white'>No Image</p>
                </div>
              ) : (
                <Image
                  src={resto?.images[1]}
                  width={255}
                  height={148}
                  alt={resto?.images[1]}
                  className='h-[148px] w-[255px] rounded-2xl object-none'
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
              className='w-fit'
            >
              {resto.images[2] === 'string' ? (
                <div className='flex h-[148px] w-[255px] items-center justify-center rounded-2xl bg-gray-600'>
                  <p className='text-2xl text-white'>No Image</p>
                </div>
              ) : (
                <Image
                  src={resto?.images[2]}
                  width={255}
                  height={148}
                  alt={resto?.images[2]}
                  className='h-[148px] w-[255px] rounded-2xl object-none'
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Show Image Mobile */}
      <div className='flex w-full flex-col gap-3 overflow-hidden md:hidden'>
        <div className='relative h-[260px] w-full overflow-hidden rounded-2xl'>
          <motion.div
            className='flex h-full'
            animate={{
              x: `-${selectedImage * 100}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            {resto?.images.map((image: string, index: number) => (
              <div key={index} className='h-full w-full shrink-0'>
                <Image
                  src={image}
                  width={361}
                  height={260}
                  alt={`Restaurant image ${index + 1}`}
                  className='h-full w-full rounded-2xl object-cover'
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator - unchanged style */}
        <div className='mx-auto flex gap-1'>
          {resto?.images.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`size-2 rounded-full transition-colors ${
                selectedImage === index ? 'bg-primary-100' : 'bg-[#D9D9D9]'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayPicture;
