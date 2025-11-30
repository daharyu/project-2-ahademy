'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { AuthLogin } from '@/entities/auth';
import { LoginUser } from '@/services/users.service';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Validate with Zod
    const validationResult = loginSchema.safeParse(form);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      setFormErrors(
        Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0]])
        )
      );
      return;
    }

    try {
      const { email, password } = validationResult.data;

      const registerData: AuthLogin = {
        email,
        password,
      };
      const result = await LoginUser(registerData);
      if (result) {
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(result.data));
        } else {
          sessionStorage.setItem('user', JSON.stringify(result.data));
        }
        console.log('Response:', result.data);
        router.push('/');
      }
    } catch (err: any) {
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-5'>
          <div className='relative flex flex-col gap-1'>
            <Input
              type='email'
              onChange={handleInputChange}
              name='email'
              placeholder='Email'
            />
            {formErrors.email && (
              <p className='text-primary-100 text-sm leading-7 tracking-tight'>
                {formErrors.email}
              </p>
            )}
          </div>
          <div className='relative flex flex-col gap-1'>
            <Input
              type={`${showPassword ? 'text' : 'password'}`}
              onChange={handleInputChange}
              name='password'
              placeholder='Password'
            />
            {formErrors.password && (
              <p className='text-primary-100 text-sm leading-7 tracking-tight'>
                {formErrors.password}
              </p>
            )}
            <Button
              variant='ghost'
              className='absolute top-7 right-2 h-fit w-fit -translate-y-1/2'
              onClick={() => setShowPassword(!showPassword)}
              type='button'
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </Button>
          </div>
          <div className='flex gap-2'>
            <Checkbox
              id='remember'
              className='data-[state=checked]:bg-primary-100 my-auto size-5 rounded-md'
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <label
              htmlFor='remember'
              className='md:text-md my-auto text-sm leading-7 font-medium md:leading-[30px] md:tracking-tighter'
            >
              Remember me
            </label>
          </div>
          <Button
            className='bg-primary-100 text-md flex h-12 items-center justify-center gap-2 rounded-[100px] p-2 leading-[30px] font-bold tracking-tight'
            type='submit'
          >
            Login
          </Button>
        </form>
      </motion.div>
    </>
  );
};

export default LoginPage;
