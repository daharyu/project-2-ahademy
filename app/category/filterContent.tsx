import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Star, StarOff } from 'lucide-react';

interface FilterContentProps {
  // Price Handlers
  priceMin: number;
  setPriceMin: (value: number) => void;
  priceMax: number;
  setPriceMax: (value: number) => void;

  // Rating Handlers
  selectedRating: number;
  setSelectedRating: (value: number) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  selectedRating,
  setSelectedRating,
}) => {
  const handleRatingChange = (newRating: number) => {
    const ratingToSet = selectedRating === newRating ? 0 : newRating;
    setSelectedRating(ratingToSet);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void
  ) => {
    const value = parseInt(e.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  return (
    <>
      <h4 className='text-lg leading-8 font-extrabold tracking-tight'>
        Distance
      </h4>

      <div className='flex items-center gap-2'>
        <Checkbox
          id='nearby'
          className='data-[state=checked]:bg-primary-100 size-5 rounded-sm'
        />
        <label
          htmlFor='nearby'
          className='text-md leading-[30px] tracking-tight'
        >
          Nearby
        </label>
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          id='1km'
          className='data-[state=checked]:bg-primary-100 size-5 rounded-sm'
        />
        <label htmlFor='1km' className='text-md leading-[30px] tracking-tight'>
          Within 1 km
        </label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox
          id='2km'
          className='data-[state=checked]:bg-primary-100 size-5 rounded-sm'
        />
        <label htmlFor='2km' className='text-md leading-[30px] tracking-tight'>
          Within 2 km
        </label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox
          id='3km'
          className='data-[state=checked]:bg-primary-100 size-5 rounded-sm'
        />
        <label htmlFor='3km' className='text-md leading-[30px] tracking-tight'>
          Within 3 km
        </label>
      </div>

      <hr className='border-neutral-300' />

      {/* Price */}
      <h4 className='text-lg leading-8 font-extrabold tracking-tight'>Price</h4>

      {/* Minimum Price Input */}
      <div className='relative h-fit'>
        <Input
          type='number'
          placeholder='Minimum Price'
          value={priceMin || ''}
          onChange={(e) => handlePriceChange(e, setPriceMin)}
          className='md:text-md indent-10 text-sm leading-7 font-extrabold md:leading-[30px]'
        />
        <p className='text-md absolute top-1/2 left-2 flex size-[38px] -translate-y-1/2 items-center justify-center rounded-[4px] bg-neutral-100 p-2 leading-[30px] font-bold tracking-tight'>
          Rp
        </p>
      </div>
      {/* Maximum Price Input */}
      <div className='relative h-fit'>
        <Input
          type='number'
          placeholder='Maximum Price'
          value={priceMax || ''}
          onChange={(e) => handlePriceChange(e, setPriceMax)}
          className='md:text-md indent-10 text-sm leading-7 font-extrabold md:leading-[30px]'
        />
        <p className='text-md absolute top-1/2 left-2 flex size-[38px] -translate-y-1/2 items-center justify-center rounded-[4px] bg-neutral-100 p-2 leading-[30px] font-bold tracking-tight'>
          Rp
        </p>
      </div>

      <hr className='border-neutral-300' />

      {/* Rating */}
      <h4 className='text-lg leading-8 font-extrabold tracking-tight'>
        Rating
      </h4>
      {[5, 4, 3, 2, 1].map((item) => (
        <div
          className='flex cursor-pointer items-center gap-2'
          key={item}
          onClick={() => handleRatingChange(item)}
        >
          <Checkbox
            id={`rating-${item}`}
            checked={selectedRating === item}
            onCheckedChange={() => handleRatingChange(item)}
            className='data-[state=checked]:bg-primary-100 size-5 rounded-sm'
          />
          <Star size={20} fill='orange' color='transparent' />

          <label
            htmlFor={`rating-${item}`}
            className='text-md leading-[30px] tracking-tight'
          >
            {item}
          </label>
        </div>
      ))}
    </>
  );
};

export default FilterContent;
