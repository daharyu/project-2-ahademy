'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LoginPage from './login/page';
import RegisterPage from './register/page';

const AuthNavigation = () => {
  const [menu, setMenu] = useState('login');
  return (
    <>
      {/* Button */}
      <div className='flex h-12 w-full items-center justify-between rounded-2xl bg-neutral-100 p-2 md:h-14'>
        <Button
          className={`${menu === 'login' ? 'bg-white font-bold text-neutral-950' : 'bg-transparent font-medium text-neutral-600'} md:rounded-[12px]' w-1/2 cursor-pointer rounded-xl px-2 py-3 text-sm leading-7 tracking-tight`}
          onClick={() => setMenu('login')}
        >
          Sign In
        </Button>
        <Button
          className={`${menu === 'register' ? 'bg-white font-bold text-neutral-950' : 'bg-transparent font-medium text-neutral-600'} md:rounded-[12px]' w-1/2 cursor-pointer rounded-xl px-2 py-3 text-sm leading-7 tracking-tight`}
          onClick={() => setMenu('register')}
        >
          Sign Up
        </Button>
      </div>

      {/* Form */}
      {menu === 'login' ? <LoginPage /> : <RegisterPage />}
    </>
  );
};

export default AuthNavigation;
