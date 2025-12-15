'use client';
import FooterSection from '@/components/footer';
import HeaderSection from '@/components/header';
import { UserProfileData } from '@/entities/auth';
import { useGetProfile } from '@/hooks/updateUserMutation';
import OutImage from '@/public/images/arrow-circle-broken-left.svg';
import meImg from '@/public/images/me.png';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import router from 'next/router';
import { useState } from 'react';
import OrderPage from './orderProfile';
import UpdateProfile from './updateProfile';

const ProfilePage = () => {
  const { data: profileResponse, isLoading } = useGetProfile();
  const [menu, setMenu] = useState('profile');

  // Extract user data safely
  const user: UserProfileData | undefined = profileResponse?.data;

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return <div>Error loading user profile or user not found.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <HeaderSection isHomePage={false} />
      {/* ... (rest of your profile display sections, styles preserved) ... */}
      <div
        className={`flex h-16 w-[398px] items-center justify-between border-b bg-white px-4 transition-all duration-300 md:h-20 md:w-[1440px] md:px-[120px]`}
      ></div>
      <section className='my-5 flex gap-4 px-4 md:mb-60 md:gap-8 md:px-[120px]'>
        <motion.div
          className='hidden h-fit w-60 flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg shadow-[#CBCACA40] md:top-20 md:right-24 md:flex'
          initial={{ opacity: 0, y: -100, x: 50, scale: 0.3 }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          {/* ... Sidebar content ... */}
          <div
            className='flex cursor-pointer gap-2'
            onClick={() => setMenu('profile')}
          >
            <Image
              src={user?.avatar || meImg}
              width={36}
              height={36}
              alt='profile-avatar'
              className={`rounded-full object-cover`}
            />
            <p className={`text-md leading-[30px] font-bold tracking-tight`}>
              {user?.name}
            </p>
          </div>
          <hr className='w-full border-neutral-200' />
          <div
            className='flex cursor-pointer gap-2'
            onClick={() => setMenu('order')}
          >
            {menu === 'order' ? (
              <FileText size={20} color='red' />
            ) : (
              <FileText size={20} />
            )}
            <p
              className={`text-sm leading-7 font-medium ${menu === 'order' && 'text-primary-100'}`}
            >
              My Order
            </p>
          </div>
          <div className='flex cursor-pointer gap-2' onClick={handleLogout}>
            <Image src={OutImage} width={20} height={20} alt='out' />
            <p className='text-sm leading-7 font-medium'>Log Out</p>
          </div>
        </motion.div>

        {menu === 'profile' && <UpdateProfile />}
        {menu === 'order' && <OrderPage />}
      </section>

      <FooterSection />
    </>
  );
};

export default ProfilePage;
