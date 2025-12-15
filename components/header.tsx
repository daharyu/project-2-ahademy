'use client';
import { UserData } from '@/entities/auth';
import { useLoginUser } from '@/hooks/checkLoginUser';
import { useGetProfile } from '@/hooks/updateUserMutation';
import OutImage from '@/public/images/arrow-circle-broken-left.svg';
import bagImg from '@/public/images/Bag.svg';
import normalIcon from '@/public/images/Logo.svg';
import meImg from '@/public/images/me.png';
import whiteIcon from '@/public/images/whiteLogo.svg';
import { getCart } from '@/services/resto.service';
import { useQuery } from '@tanstack/react-query';
import { FileText } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface HeaderSectionProps {
  isHomePage?: boolean; // true = transparent on top, false = always solid
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ isHomePage = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const paddingY = useTransform(scrollY, [0, 100], [24, 12], { clamp: true });
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: getProfile, isLoading: loadingProfile } = useGetProfile();
  const router = useRouter();
  const background = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );
  const parsedUser: UserData | null = useLoginUser();
  const user = getProfile?.data || null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setShowDropdown(!showDropdown);
  };

  // Ini intinya buat kasih tahu kalau program dijalankan di browser kalau ga dapet issue tapi malah jadi hydration
  // if (typeof window === 'undefined') return null;
  const { data, isLoading } = useQuery({
    queryKey: ['cart', parsedUser?.token],
    queryFn: () => getCart(parsedUser!.token),
    enabled: !!parsedUser?.token,
  });
  if (isLoading) return null;
  const cart = data?.data || [];
  return (
    <>
      <motion.header
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          background,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        className={`fixed top-0 z-50 flex h-16 w-[398px] items-center justify-between border-b px-4 transition-all duration-300 md:h-20 md:w-[1440px] md:px-[120px] ${isScrolled || !isHomePage ? 'border-gray-200/70 shadow-sm' : 'border-transparent'} }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Logo */}
        <Link href='/'>
          <div className='my-2 flex items-center gap-4 md:my-5'>
            <Image
              src={isScrolled || !isHomePage ? normalIcon : whiteIcon}
              width={50}
              height={50}
              alt='logo'
              className='size-[40px] md:size-[42px]'
            />
            <h3
              className={`md:blockmd:text-display-md hidden text-2xl leading-8 font-extrabold ${isScrolled || !isHomePage ? 'text-neutral-950' : 'text-white'}`}
            >
              Foody
            </h3>
          </div>
        </Link>
        {!parsedUser ? (
          <div className='hidden justify-end gap-4 md:flex'>
            <Link href='/auth'>
              <Button
                variant='outline'
                className={`text-md flex h-12 w-[163px] items-center justify-center rounded-[100px] border-2 border-neutral-300 bg-transparent leading-[30px] font-bold tracking-tight backdrop-blur-lg ${isScrolled || !isHomePage ? 'text-neutral-950' : 'text-white'}`}
              >
                Sign In
              </Button>
            </Link>
            <Link href='/auth'>
              <Button
                className={`text-md flex h-12 w-[163px] items-center justify-center rounded-[100px] bg-white leading-[30px] font-bold tracking-tight text-neutral-950 ${isScrolled || !isHomePage ? 'bg-neutral-950 text-white' : 'text-neutral-950'}`}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <div className='flex items-center justify-end gap-4 md:gap-6'>
            <div
              className='relative'
              onClick={() => {
                router.push('/cart');
              }}
            >
              <Image
                src={bagImg}
                width={50}
                height={50}
                alt='bag'
                className={`size-7 md:size-8 ${isScrolled || !isHomePage ? '' : 'invert'}`}
              />
              {cart.summary.totalItems > 0 && (
                <div className='bg-primary-100 absolute top-0 -right-2 flex size-5 items-center justify-center rounded-full text-xs leading-6 font-bold tracking-tight text-white'>
                  {cart.summary.totalItems}
                </div>
              )}
            </div>
            <div
              className='flex cursor-pointer items-center gap-4'
              onClick={handleClick}
            >
              <Image
                src={user?.avatar || meImg}
                width={50}
                height={50}
                alt='bag'
                className={`size-10 rounded-full object-cover md:size-12`}
              />
              <p
                className={`hidden text-lg leading-8 font-semibold tracking-tight md:block ${isScrolled || !isHomePage ? '' : 'text-white'}`}
              >
                {user?.name}
              </p>
            </div>
          </div>
        )}
        <motion.div
          className='fixed top-16 right-5 z-50 flex w-[197px] flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg shadow-[#CBCACA40] md:top-20 md:right-24'
          initial={{ opacity: 0, y: -100, x: 50, scale: 0.3 }}
          animate={
            showDropdown
              ? {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.1, ease: 'easeInOut' },
                }
              : {
                  opacity: 0,
                  y: -100,
                  x: 50,
                  scale: 0.3,
                  transition: { duration: 0.1, ease: 'easeInOut' },
                }
          }
        >
          <div
            className='flex cursor-pointer gap-2'
            onClick={() => router.push('/profile')}
          >
            <Image
              src={user?.avatar || meImg}
              width={36}
              height={36}
              alt='bag'
              className={`rounded-full`}
            />

            <p className={`text-md leading-[30px] font-bold tracking-tight`}>
              {user?.name}
            </p>
          </div>

          {/* HR */}
          <hr className='w-full border-neutral-200' />

          {/* Order */}
          <Link href='/profile'>
            <div className='flex cursor-pointer gap-2'>
              <FileText size={20} />
              <p className='text-sm leading-7 font-medium'>My Order</p>
            </div>
          </Link>
          {/* Logout */}
          <div className='flex cursor-pointer gap-2' onClick={handleLogout}>
            <Image src={OutImage} width={20} height={20} alt='out' />
            <p className='text-sm leading-7 font-medium'>Log Out</p>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
};

export default HeaderSection;
