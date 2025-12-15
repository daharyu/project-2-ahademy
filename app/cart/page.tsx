'use client';
import CustomCard from '@/components/customCard';
import FooterSection from '@/components/footer';
import HeaderSection from '@/components/header';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { UserData } from '@/entities/auth';
import { getCart as getCartApi } from '@/entities/resto';
import {
  useDeleteToCartMutation,
  useUpdateToCartMutation,
} from '@/hooks/cartMutation';
import { useLoginUser } from '@/hooks/checkLoginUser';
import imgStore from '@/public/images/store.svg';
import { getCart } from '@/services/resto.service';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { formatRupiah } from '../[id]/neededHook';
import Link from 'next/link';

const CartPage = () => {
  const parsedUser: UserData | null = useLoginUser();
  const { mutateAsync: updateCart } = useUpdateToCartMutation();
  const { mutateAsync: deleteCart } = useDeleteToCartMutation();

  const { data, isLoading } = useQuery({
    queryKey: ['cart', parsedUser?.token],
    queryFn: () => {
      return getCart(parsedUser?.token as string);
    },
  });
  const cart: getCartApi[] = data?.data.cart || [];

  const handleUpdate = async (id: number, quantity: number) => {
    if (quantity < 1) deleteCart({ id });
    else {
      try {
        updateCart({ id, quantity });
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
      <section className='mx-auto my-5 flex w-full flex-col gap-4 md:w-[800px] md:gap-8'>
        <h1 className='text-display-lg md:text-display-2xl leading-[text-display-lg-height] font-bold md:leading-[text-display-2xl-height]'>
          My Cart
        </h1>

        {cart.length === 0 && (
          <div className='flex h-[100px] items-center justify-center'>
            <p className='text-md text-primary-100 leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
              Cart is empty
            </p>
          </div>
        )}

        {cart.map((item, index: number) => (
          <CustomCard
            key={index}
            className='flex flex-col gap-3 p-4 md:gap-5 md:p-5'
          >
            <div className='flex items-center gap-1 md:gap-2'>
              <Image src={imgStore} width={32} height={32} alt='store' />
              <h4 className='text-md leading-[30px] font-bold tracking-tight md:text-lg md:leading-8 md:tracking-tighter'>
                {item.restaurant.name}
              </h4>
              <ChevronRight size={24} />
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
                  <Button
                    variant='outline'
                    className='flex size-9 items-center justify-center rounded-full p-2 md:size-10'
                    onClick={() =>
                      handleUpdate(Number(menu.id), Number(menu.quantity) - 1)
                    }
                  >
                    <Minus size={24} />
                  </Button>
                  <span className='text-md leading-[30px] font-semibold md:text-lg md:leading-[30px]'>
                    {menu.quantity}
                  </span>
                  <Button
                    className='bg-primary-100 flex size-9 items-center justify-center rounded-full p-2 md:size-10'
                    onClick={() =>
                      handleUpdate(Number(menu.id), Number(menu.quantity) + 1)
                    }
                  >
                    <Plus size={24} />
                  </Button>
                </motion.div>
              </div>
            ))}

            <hr className='border-dashed border-neutral-300' />

            <div className='flex flex-col justify-between gap-3 md:flex-row'>
              <div className='flex flex-col'>
                <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                  Total
                </p>
                <p className='text-md leading-[30px] font-extrabold tracking-tight md:text-lg md:leading-8'>
                  {formatRupiah(item.subtotal)}
                </p>
              </div>

              {/* Button */}
              <Link href='/checkout'>
                <Button className='bg-primary-100 md:text-md h-10 w-full text-sm leading-7 font-bold text-white md:h-11 md:w-60 md:leading-[30px]'>
                  Checkout
                </Button>
              </Link>
            </div>
          </CustomCard>
        ))}
      </section>

      <FooterSection />
    </>
  );
};

export default CartPage;
