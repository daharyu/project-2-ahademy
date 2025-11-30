import Image from 'next/image';
import AuthNavigation from './authNavigation';

const AuthPage = () => {
  return (
    <>
      <section className='flex'>
        {/* Left */}
        <Image
          src='/images/initLeft.svg'
          width={500}
          height={500}
          alt='logo'
          className='hidden h-[1024px] w-1/2 md:block'
        />
        {/* Right */}
        <div className='w-ful flex h-screen md:w-1/2'>
          <div className='mx-auto my-auto flex w-[345px] flex-col gap-4 md:w-[374px] md:gap-5'>
            {/* Logo */}
            <div className='flex items-center gap-3 md:gap-[15px]'>
              <Image
                src='/images/logo.svg'
                width={50}
                height={50}
                alt='logo'
                className='size-[32px] md:size-[42px]'
              />
              <h3 className='md:text-display-md text-2xl leading-8 font-extrabold'>
                Foody
              </h3>
            </div>

            {/* Description */}
            <div className='flex flex-col gap-1'>
              <h4 className='text-display-xs md:text-display-sm leading-(--text-display-xs-height) font-extrabold md:leading-[--text-text-display-sm-height]'>
                Welcome Back
              </h4>
              <p className='md:text-md text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'>
                Good to see you again! Let’s eat
              </p>
            </div>
            <AuthNavigation />
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
