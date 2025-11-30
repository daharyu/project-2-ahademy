/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CustomCard from '@/components/customCard';
import FooterSection from '@/components/footer';
import HeaderSection from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OutImage from '@/public/images/arrow-circle-broken-left.svg';
import meImg from '@/public/images/me.svg';
import { UpdateUser } from '@/services/users.service';
import { FileText, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    router.push('/');
  };

  const router = useRouter();
  const user =
    localStorage.getItem('user') || sessionStorage.getItem('user') || null;
  if (!user) router.push('/');
  const parsedUser = user ? JSON.parse(user) : null;
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    console.log('parsedUser', parsedUser);
  });

  const [form, setForm] = useState({
    name: parsedUser?.user.name || '',
    phone: parsedUser?.user.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // Validation
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    if (form.newPassword && !form.currentPassword) {
      setMessage({
        type: 'error',
        text: 'Current password is required to change password',
      });
      setLoading(false);
      return;
    }

    // Build payload
    const payload: any = {};
    if (form.name.trim()) payload.name = form.name.trim();
    if (form.phone.trim()) payload.phone = form.phone.trim();
    if (form.currentPassword) payload.currentPassword = form.currentPassword;
    if (form.newPassword) payload.newPassword = form.newPassword;

    if (Object.keys(payload).length === 0) {
      setMessage({ type: 'error', text: 'No changes to save' });
      setLoading(false);
      return;
    }

    try {
      await UpdateUser(payload);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setForm((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      // Update localStorage with new name/phone
      const userJson =
        localStorage.getItem('user') || sessionStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        if (payload.name) user.name = payload.name;
        if (payload.phone) user.phone = payload.phone;

        localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err?.message || err?.error || 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <HeaderSection isHomePage={false} />
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
          <div
            className='flex cursor-pointer gap-2'
            onClick={() => router.push('/profile')}
          >
            <Image
              src={meImg}
              width={36}
              height={36}
              alt='bag'
              className={`rounded-full`}
            />

            <p className={`text-md leading-[30px] font-bold tracking-tight`}>
              {parsedUser.user.name}
            </p>
          </div>

          {/* HR */}
          <hr className='w-full border-neutral-200' />

          {/* Delivery Address */}
          <div className='flex cursor-pointer gap-2'>
            <MapPin size={20} />
            <p className='text-sm leading-7 font-medium'>Delivery Address</p>
          </div>
          {/* Order */}
          <div className='flex cursor-pointer gap-2'>
            <FileText size={20} />
            <p className='text-sm leading-7 font-medium'>My Order</p>
          </div>
          {/* Logout */}
          <div className='flex cursor-pointer gap-2' onClick={handleLogout}>
            <Image src={OutImage} width={20} height={20} alt='out' />
            <p className='text-sm leading-7 font-medium'>Log Out</p>
          </div>
        </motion.div>

        <div className='flex w-full flex-col gap-4 md:w-[524px] md:gap-6'>
          <h3 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
            Profile
          </h3>
          <CustomCard className='flex w-full flex-col gap-6 p-4 md:p-5'>
            {/* Profile */}
            <div className='flex w-full flex-col gap-2 md:gap-3'>
              <Image
                src={meImg}
                width={64}
                height={64}
                alt='profile2'
                className={`rounded-full`}
              />

              <div className='flex justify-between'>
                <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                  Name
                </p>
                <p className='md:text-md text-sm leading-7 font-bold md:leading-[30px] md:tracking-tighter'>
                  {parsedUser.user.name}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                  Email
                </p>
                <p className='md:text-md text-sm leading-7 font-bold md:leading-[30px] md:tracking-tighter'>
                  {parsedUser.user.email}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                  Name
                </p>
                <p className='md:text-md text-sm leading-7 font-bold md:leading-[30px] md:tracking-tighter'>
                  {parsedUser.user.phone}
                </p>
              </div>
            </div>
            <Button
              className='bg-primary-100 md:text-md h-10 w-full text-sm leading-7 font-bold text-white md:h-11 md:leading-[30px]'
              onClick={() => setShowDialog(true)}
            >
              Update Profile
            </Button>
          </CustomCard>
        </div>
      </section>

      {/* Overlay */}
      {showDialog && (
        <div className='fixed top-0 left-0 z-50 h-screen w-screen bg-black/50'>
          <div className='fixed top-1/2 left-1/2 z-100 w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-2 md:w-[524px] md:p-5'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <Input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Name'
                />
              </div>

              <div>
                <Input
                  type='text'
                  name='phone'
                  value={form.phone}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Phone'
                />
              </div>

              <div className='border-t border-gray-200 pt-4'>
                <p className='mb-4 text-sm text-gray-600'>Change password</p>

                <Input
                  type='password'
                  name='currentPassword'
                  value={form.currentPassword}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Current Password'
                />

                <Input
                  type='password'
                  name='newPassword'
                  value={form.newPassword}
                  onChange={handleChange}
                  className='mt-4 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='New Password'
                />

                <Input
                  type='password'
                  name='confirmPassword'
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className='mt-4 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Confirm New Password'
                />
              </div>

              <div className='pt-6'>
                <Button
                  type='submit'
                  disabled={loading}
                  className='bg-primary-100 md:text-md h-10 w-full text-sm leading-7 font-bold text-white disabled:opacity-70 md:h-11 md:leading-[30px]'
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <FooterSection />
    </>
  );
};

export default ProfilePage;
