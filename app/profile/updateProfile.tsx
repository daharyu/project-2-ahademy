/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CustomCard from '@/components/customCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfileData, UpdateProfile as Profile } from '@/entities/auth';
import { useGetProfile, useUpdateProfile } from '@/hooks/updateUserMutation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import meImg from '@/public/images/me.png';

type UpdatePayload = Profile | FormData;

const UpdateProfile = () => {
  const router = useRouter();
  const { data: profileResponse, isLoading } = useGetProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();

  // Extract user data safely
  const user: UserProfileData | undefined = profileResponse?.data;

  const [showDialog, setShowDialog] = useState(false);

  // FIX 1: Form state now only tracks text inputs (and avatar URL display)
  const [form, setForm] = useState<Partial<Profile>>({
    name: '',
    phone: '',
    email: '',
    avatar: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'avatar' && files && files.length > 0) {
      setAvatarFile(files[0]);
      // Optional: Update the form state with the file name for display (if needed)
      // setForm({ ...form, avatar: files[0].name });
    } else {
      // Handle text input change
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    let finalPayload: UpdatePayload;
    if (avatarFile) {
      const formData = new FormData();
      if (form.name?.trim()) formData.append('name', form.name.trim());
      if (form.phone?.trim()) formData.append('phone', form.phone.trim());
      if (form.email?.trim()) formData.append('email', form.email.trim());

      formData.append('avatar', avatarFile);

      finalPayload = formData;
    } else {
      const jsonPayload: Partial<Profile> = {};

      if (form.name?.trim()) jsonPayload.name = form.name.trim();
      if (form.phone?.trim()) jsonPayload.phone = form.phone.trim();
      if (form.email?.trim()) jsonPayload.email = form.email.trim();

      // Only include avatar if it was manually set (e.g., to clear it or if it's a URL)
      if (form.avatar?.trim()) jsonPayload.avatar = form.avatar.trim();

      if (Object.keys(jsonPayload).length === 0) {
        setMessage({ type: 'error', text: 'No changes to save' });
        setLoading(false);
        return;
      }
      finalPayload = jsonPayload as Profile;
    }

    try {
      await updateProfile(finalPayload as any);

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setShowDialog(false);
      const userJson =
        localStorage.getItem('user') || sessionStorage.getItem('user');

      if (userJson) {
        const storedUser = JSON.parse(userJson);

        if (form.name?.trim()) storedUser.name = form.name.trim();
        if (form.phone?.trim()) storedUser.phone = form.phone.trim();
        if (form.email?.trim()) storedUser.email = form.email.trim();

        const updatedUserString = JSON.stringify(storedUser);

        if (localStorage.getItem('user')) {
          localStorage.setItem('user', updatedUserString);
        } else if (sessionStorage.getItem('user')) {
          sessionStorage.setItem('user', updatedUserString);
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        err?.error ||
        err?.data?.message ||
        'Failed to update profile';
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
      setAvatarFile(null);
    }
  };
  return (
    <>
      <div className='flex w-full flex-col gap-4 md:w-[524px] md:gap-6'>
        <h3 className='text-display-xs md:text-display-md leading-[text-display-xs-height] font-extrabold md:leading-[text-display-md-height]'>
          Profile
        </h3>
        <CustomCard className='flex w-full flex-col gap-6 p-4 md:p-5'>
          {/* Profile Display */}
          <div className='flex w-full flex-col gap-2 md:gap-3'>
            <Image
              src={user?.avatar || meImg}
              width={64}
              height={64}
              alt='profile2'
              className={`size-16 rounded-full object-cover`}
            />

            <div className='flex justify-between'>
              <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                Name
              </p>
              <p className='md:text-md text-sm leading-7 font-bold md:leading-[30px] md:tracking-tighter'>
                {user?.name}
              </p>
            </div>
            <div className='flex justify-between'>
              <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                Email
              </p>
              <p className='md:text-md text-sm leading-7 font-bold md:leading-[30px] md:tracking-tighter'>
                {user?.email}
              </p>
            </div>
            <div className='flex justify-between'>
              <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                Phone
              </p>
              <p className='md:text-md text-sm leading-7 font-bold md:leading-[30px] md:tracking-tighter'>
                {user?.phone}
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

      {/* Overlay */}
      {showDialog && (
        <div className='fixed top-0 left-0 z-50 h-screen w-screen bg-black/50'>
          <div className='fixed top-1/2 left-1/2 z-100 w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-2 md:w-[524px] md:p-5'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Text Inputs */}
              <Input
                type='text'
                name='name'
                value={form.name || ''}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                placeholder='Name'
              />

              <Input
                type='text'
                name='phone'
                value={form.phone || ''}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                placeholder='Phone'
              />
              <Input
                type='email'
                name='email'
                value={form.email || ''}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                placeholder='Email'
              />

              {/* File Input */}
              <label className='block text-sm font-medium text-gray-700'>
                {avatarFile
                  ? `Selected file: ${avatarFile.name}`
                  : 'Upload Avatar'}
              </label>
              <Input
                type='file'
                name='avatar'
                // NOTE: 'value' prop should not be set on file inputs
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                placeholder='Image'
                accept='image/*'
              />

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
            <Button
              onClick={() => setShowDialog(false)}
              className='mt-2 w-full bg-gray-200 text-gray-800 hover:bg-gray-300'
            >
              Cancel
            </Button>

            {message && (
              <div
                className={`mt-3 text-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
