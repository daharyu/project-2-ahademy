'use client';
import CustomCard from '@/components/customCard';
import FooterSection from '@/components/footer';
import HeaderSection from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { UserData } from '@/entities/auth';
import { CheckOut, getCart as getCartApi } from '@/entities/resto';
import {
  useAddtoCheckout,
  useDeleteEntireCartMutation,
  useDeleteToCartMutation,
} from '@/hooks/cartMutation';
import { transformFullCartToCheckOut } from '@/hooks/cartToCheckout';
import { useLoginUser } from '@/hooks/checkLoginUser';
import imgLocation from '@/public/images/Category2.svg';
import imgStore from '@/public/images/store.svg';
import { getCart } from '@/services/resto.service';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatRupiah } from '../[id]/neededHook';
import { bankData } from '../constants/bankData';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const parsedUser: UserData | null = useLoginUser();
  const { mutateAsync: addToCheckout } = useAddtoCheckout();
  const { mutateAsync: deleteCart } = useDeleteEntireCartMutation();
  const [note, setNote] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['cart', parsedUser?.token],
    queryFn: () => {
      return getCart(parsedUser?.token as string);
    },
  });
  const cart: getCartApi[] = data?.data.cart || [];
  const total = data?.data;

  const handleChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleValuePayment = (value: string) => {
    setPayment(value);
  };

  const handleCheckout = async (
    address: string,
    phone: string,
    payment: string,
    note?: string
  ) => {
    const { restaurants } = transformFullCartToCheckOut(cart);
    const finalCheckout: CheckOut = {
      restaurants: restaurants,
      deliveryAddress: address,
      phone: phone,
      paymentMethod: payment,
      notes: note || '',
    };
    if (!address || !note) {
      toast.warning('Please Fill Address and Note');
    } else {
      try {
        addToCheckout(finalCheckout);
        deleteCart();
      } catch (err) {
        console.error(err);
      }
    }
  };

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
      <section className='mx-auto my-5 flex w-full flex-col gap-4 md:w-[1000px] md:gap-6'>
        <h1 className='text-display-lg md:text-display-2xl leading-[text-display-lg-height] font-bold md:leading-[text-display-2xl-height]'>
          Checkout
        </h1>

        <div className='flex flex-col gap-4 md:flex-row md:gap-5'>
          {/* Left */}
          <div className='flex flex-col gap-4 md:w-4/5 md:gap-5'>
            <CustomCard className='flex flex-col gap-3 p-4 md:gap-5 md:p-5'>
              {/* Address */}
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <Image
                    src={imgLocation}
                    width={100}
                    height={100}
                    alt='store'
                    className='size-6 md:size-8'
                  />
                  <h6 className='text-md leading-[30px] font-extrabold md:text-lg md:leading-8'>
                    Delivery Address
                  </h6>
                </div>

                <Input
                  type='text'
                  onChange={handleChangeAddress}
                  placeholder='Delivery Address'
                  className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'
                />
                <Input
                  type='text'
                  onChange={handleChangeNote}
                  placeholder='Notes'
                  className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'
                />
                <span className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'>
                  {parsedUser?.user.phone}
                </span>
              </div>
            </CustomCard>
            {cart.map((item, index: number) => (
              <CustomCard
                key={index}
                className='flex flex-col gap-3 p-4 md:gap-5 md:p-5'
              >
                <div className='flex justify-between'>
                  <div className='flex items-center gap-1 md:gap-2'>
                    <Image src={imgStore} width={32} height={32} alt='store' />
                    <h4 className='text-md leading-[30px] font-bold tracking-tight md:text-lg md:leading-8 md:tracking-tighter'>
                      {item.restaurant.name}
                    </h4>
                  </div>

                  <Link href={`/${item.restaurant.id}`}>
                    <Button
                      variant={'outline'}
                      className='h-9 w-[106px] items-center justify-center rounded-full p-2 md:w-[120px]'
                    >
                      Add Item
                    </Button>
                  </Link>
                </div>

                {item.items.map((menu, i: number) => (
                  <div key={i} className='flex justify-between'>
                    <div className='flex gap-4'>
                      <Image
                        src={menu.menu.image}
                        width={100}
                        height={100}
                        alt={menu.menu.foodName}
                        className='size-16 rounded-xl md:size-20'
                      />
                      <div className='flex flex-col'>
                        <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                          {menu.menu.foodName}
                        </p>
                        <p className='text-md leading-[30px] font-extrabold tracking-tight md:text-lg md:leading-8'>
                          {formatRupiah(menu.menu.price)}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className='flex items-center gap-4'
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <span className='text-md leading-[30px] font-semibold md:text-lg md:leading-[30px]'>
                        x {menu.quantity}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </CustomCard>
            ))}
          </div>

          {/* Right */}
          <CustomCard className='flex flex-col gap-4 p-4 md:w-2/5 md:gap-5 md:p-5'>
            <h6 className='text-md leading-[30px] font-extrabold md:text-lg md:leading-8'>
              Payment Method
            </h6>
            <RadioGroup
              defaultValue='Bank Negara Indonesia'
              onValueChange={handleValuePayment}
            >
              {bankData.map((item, index: number) => (
                // This is so that the key is unique if i can delete it i will not use this div :'3
                <div key={index} className='flex flex-col gap-4 md:gap-5'>
                  {/* Contain */}
                  <div className='flex items-center justify-between'>
                    {/* Bank */}
                    <div className='flex items-center gap-2'>
                      <span className='flex size-10 items-center justify-center rounded-xl border border-neutral-300'>
                        <Image
                          src={`/images/${item.image}`}
                          width={100}
                          height={100}
                          alt={item.name}
                          className='size-[30px]'
                        />
                      </span>{' '}
                      <label className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'>
                        {item.name}
                      </label>
                    </div>
                    <RadioGroupItem
                      value={item.name}
                      id={item.name}
                      className='md:text-md data-[state=checked]:bg-primary-100 size-6 text-sm leading-7 font-medium md:leading-[30px]'
                    />
                  </div>
                  {index === 3 ? (
                    <hr className='border-dashed border-neutral-200' />
                  ) : (
                    <hr className='border-neutral-200' />
                  )}
                </div>
              ))}
            </RadioGroup>

            {/* Summary */}
            <h6 className='text-md leading-[30px] font-extrabold md:text-lg md:leading-8'>
              Payment Summaries
            </h6>
            {/* Price */}
            <div className='flex justify-between'>
              <label className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'>
                Price ({total.summary.totalItems} items)
              </label>
              <span className='md:text-md text-sm leading-7 font-bold md:leading-[30px]'>
                {formatRupiah(total.summary.totalPrice)}
              </span>
            </div>
            {/* Delivery */}
            <div className='flex justify-between'>
              <label className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'>
                Delivery Fee
              </label>
              <span className='md:text-md text-sm leading-7 font-bold md:leading-[30px]'>
                {formatRupiah(10000)}
              </span>
            </div>
            {/* Service */}
            <div className='flex justify-between'>
              <label className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'>
                Service Fee
              </label>
              <span className='md:text-md text-sm leading-7 font-bold md:leading-[30px]'>
                {formatRupiah(1000)}
              </span>
            </div>
            {/* Total */}
            <div className='flex justify-between'>
              <label className='text-md leading-[30px] font-medium md:text-lg md:leading-8'>
                Total
              </label>
              <span className='text-md leading-[30px] font-bold md:text-lg md:leading-8'>
                {formatRupiah(total.summary.totalPrice + 11000)}
              </span>
            </div>
            {/* Button */}

            <Button
              className='bg-primary-100 md:text-md h-10 w-full text-sm leading-7 font-bold text-white md:h-11 md:leading-[30px]'
              onClick={() =>
                handleCheckout(address, parsedUser!.user.phone, payment, note)
              }
            >
              Buy
            </Button>
          </CustomCard>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default CheckoutPage;
