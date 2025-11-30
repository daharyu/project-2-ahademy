'use client';
import CustomCard from '@/components/customCard';
import { Button } from '@/components/ui/button';
import { Cart, Food } from '@/entities/resto';
import imgBag from '@/public/images/Bag.svg';
import { addToCart } from '@/services/resto.service';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useRestoDetail } from './getData';
import { formatRupiah } from './neededHook';
import { i } from 'motion/react-client';

const MenuSection = () => {
  const user =
    localStorage.getItem('user') || sessionStorage.getItem('user') || null;
  const parsedUser = user ? JSON.parse(user) : null;
  const router = useRouter();
  const { resto } = useRestoDetail();
  const [menuType, setMenuType] = useState('all');
  const menu = resto?.menus;

  const [tempCart, setTempCart] = useState<Cart[]>([]);
  useEffect(() => console.log(tempCart), [tempCart]);
  const [total, setTotal] = useState(0);
  const filteredMenu = useMemo(() => {
    if (menuType === 'all') return menu;
    return menu?.filter((m: Food) => m.type === menuType);
  }, [menu, menuType]);

  const handleAddToCart = async () => {
    if (!parsedUser?.token || tempCart.length === 0) {
      router.push('/auth');
      return;
    }

    try {
      const result = await addToCart(parsedUser.token, tempCart);
      setTempCart([]);
      setTotal(0);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className='mx-auto flex flex-col gap-4 pb-6 md:w-[1200px] md:gap-8'>
        <h2 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
          Menu
        </h2>

        {/* type */}
        <div className='flex gap-2 md:gap-3'>
          <Button
            variant='outline'
            className={`md:text-md h-10 py-2 text-sm leading-7 font-bold tracking-tight md:h-[46px] md:leading-[30px] ${menuType === 'all' && 'border-primary-100 text-primary-100 bg-[#FFECEC]'}`}
            onClick={() => setMenuType('all')}
          >
            All Menu
          </Button>
          <Button
            variant='outline'
            className={`md:text-md h-10 py-2 text-sm leading-7 font-bold tracking-tight md:h-[46px] md:leading-[30px] ${menuType === 'main' && 'border-primary-100 text-primary-100 bg-[#FFECEC]'}`}
            onClick={() => setMenuType('main')}
          >
            Main
          </Button>
          <Button
            variant='outline'
            className={`md:text-md h-10 py-2 text-sm leading-7 font-bold tracking-tight md:h-[46px] md:leading-[30px] ${menuType === 'side' && 'border-primary-100 text-primary-100 bg-[#FFECEC]'}`}
            onClick={() => setMenuType('side')}
          >
            Side
          </Button>
          <Button
            variant='outline'
            className={`md:text-md h-10 py-2 text-sm leading-7 font-bold tracking-tight md:h-[46px] md:leading-[30px] ${menuType === 'dessert' && 'border-primary-100 text-primary-100 bg-[#FFECEC]'}`}
            onClick={() => setMenuType('dessert')}
          >
            Dessert
          </Button>
          <Button
            variant='outline'
            className={`md:text-md h-10 py-2 text-sm leading-7 font-bold tracking-tight md:h-[46px] md:leading-[30px] ${menuType === 'drink' && 'border-primary-100 text-primary-100 bg-[#FFECEC]'}`}
            onClick={() => setMenuType('drink')}
          >
            Drink
          </Button>
        </div>

        {/* Container */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
          {filteredMenu.map((item: Food, index: number) => {
            const cartEntry = tempCart.find(
              (i) => i.restaurantId === resto.id && i.menuId === item.id
            );
            const quantity = cartEntry ? Number(cartEntry.quantity) : 0;

            const addToCart = () => {
              if (!parsedUser) return router.push('/auth');

              // Update cart
              setTempCart((prev) => {
                const existing = prev.find(
                  (i) => i.restaurantId === resto.id && i.menuId === item.id
                );

                if (existing) {
                  return prev.map((i) =>
                    i.menuId === item.id && i.restaurantId === resto.id
                      ? {
                          ...i,
                          quantity: (Number(i.quantity) + 1).toString(),
                        }
                      : i
                  );
                }

                return [
                  ...prev,
                  { restaurantId: resto.id, menuId: item.id, quantity: '1' },
                ];
              });

              // Update total — only once, outside updater
              setTotal((prev) => prev + item.price);
            };

            const removeFromCart = () => {
              setTempCart((prev) => {
                return prev.reduce<Cart[]>((acc, c) => {
                  if (c.restaurantId === resto.id && c.menuId === item.id) {
                    const newQty = Number(c.quantity) - 1;
                    if (newQty > 0) {
                      acc.push({ ...c, quantity: newQty.toString() });
                    }
                    // if newQty <= 0 → we simply don't push it back → removed
                  } else {
                    acc.push(c);
                  }
                  return acc;
                }, []);
              });

              setTotal((t) => t - item.price); // exactly once
            };

            return (
              <CustomCard
                key={item.id || index}
                className='flex flex-col gap-4'
              >
                {item.image === 'string' ? (
                  <div className='flex size-[173px] items-center justify-center rounded-t-2xl bg-gray-600 text-white md:size-[285px]'>
                    <p className='md:text-md text-sm leading-7 md:leading-[30px]'>
                      Image not found
                    </p>
                  </div>
                ) : (
                  <Image
                    src={item.image}
                    width={500}
                    height={500}
                    alt={item.foodName}
                    className='size-[173px] rounded-t-2xl object-cover md:size-[285px]'
                  />
                )}

                <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
                  <div className='flex flex-col'>
                    <h6 className='md:text-md text-sm leading-7 font-medium md:leading-[30px]'>
                      {item.foodName}
                    </h6>
                    <p className='text-md leading-[30px] font-extrabold md:text-lg md:leading-8 md:tracking-tight'>
                      {formatRupiah(item.price)}
                    </p>
                  </div>

                  {/* Button */}
                  {quantity > 0 ? (
                    <motion.div
                      className='flex items-center gap-4'
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <Button
                        variant='outline'
                        onClick={removeFromCart}
                        className='flex size-9 items-center justify-center rounded-full p-2 md:size-10'
                      >
                        <Minus size={24} />
                      </Button>
                      <span className='text-md leading-[30px] font-semibold md:text-lg md:leading-[30px]'>
                        {quantity}
                      </span>
                      <Button
                        onClick={addToCart}
                        className='bg-primary-100 flex size-9 items-center justify-center rounded-full p-2 md:size-10'
                      >
                        <Plus size={24} />
                      </Button>
                    </motion.div>
                  ) : (
                    <Button
                      onClick={addToCart}
                      className='bg-primary-100 md:text-md h-9 w-full text-sm leading-7 font-bold text-white md:h-10 md:w-20 md:leading-[30px]'
                    >
                      Add
                    </Button>
                  )}
                </div>
              </CustomCard>
            );
          })}
        </div>
      </section>

      {/* Total */}
      {tempCart.length > 0 && (
        <motion.div
          className='fixed bottom-0 flex h-16 w-[393px] items-center justify-between bg-white px-4 shadow-2xl shadow-[#CBCACA40] md:h-20 md:w-[1440px] md:px-[120px]'
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Item */}
          <div className='flex flex-col gap-0.5'>
            <div className='flex gap-1 md:gap-2'>
              <Image
                src={imgBag}
                width={1}
                height={1}
                alt='bagCart'
                className='size-5 md:size-6'
              />
              <p className='md:text-md text-sm leading-7 md:leading-[30px]'>
                {tempCart.length} items
              </p>
            </div>
            <p className='text-md leading-[30px] font-extrabold md:text-lg md:leading-[34px]'>
              {formatRupiah(total)}
            </p>
          </div>

          {/* Button */}
          <Button
            className='bg-primary-100 md:text-md h-10 w-40 text-sm leading-7 font-bold text-white md:h-11 md:w-[230px] md:leading-[30px]'
            onClick={handleAddToCart}
          >
            Checkout
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default MenuSection;
