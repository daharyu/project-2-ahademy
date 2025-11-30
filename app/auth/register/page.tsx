/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthUser } from '@/entities/auth';
import { RegisterUser } from '@/services/users.service';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
      .string()
      .trim()
      .regex(/^08[1-9][0-9]{7,10}$/, {
        message: 'Phone number must start with "08" and have 10-13 digits',
      })
      .refine((val) => val.length >= 10 && val.length <= 13, {
        message: 'Phone number must have 10-13 digits',
      }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const router = useRouter();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitError(null);

    // Validate with Zod
    const validationResult = registerSchema.safeParse(form);
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
      const { name, email, phone, password } = validationResult.data;

      const registerData: AuthUser = {
        name,
        email,
        phone,
        password,
      };
      const result = await RegisterUser(registerData);
      if (result) {
        setSuccessMessage('Registration successful! ');
        setSubmitError(null);
        sessionStorage.setItem('user', JSON.stringify(result.data));
        router.push('/');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setSubmitError(err.message || 'Registration failed');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form className='flex flex-col gap-4 md:gap-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <Input
              type='text'
              placeholder='Name'
              name='name'
              value={form.name}
              onChange={handleInputChange}
            />
            {formErrors.name && (
              <p className='text-primary-100 text-sm leading-7 tracking-tight'>
                {formErrors.name}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <Input
              type='email'
              placeholder='Email'
              name='email'
              value={form.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <p className='text-primary-100 text-sm leading-7 tracking-tight'>
                {formErrors.email}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <Input
              type='text'
              placeholder='Number Phone'
              name='phone'
              value={form.phone}
              onChange={handleInputChange}
            />
            {formErrors.phone && (
              <p className='text-primary-100 text-sm leading-7 tracking-tight'>
                {formErrors.phone}
              </p>
            )}
          </div>
          <div className='relative flex flex-col gap-1'>
            <Input
              type={`${showPassword ? 'text' : 'password'}`}
              placeholder='Password'
              name='password'
              value={form.password}
              onChange={handleInputChange}
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
          <div className='relative flex flex-col gap-1'>
            <Input
              type={`${showConfirmPassword ? 'text' : 'password'}`}
              placeholder='Confirm Password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleInputChange}
            />
            {formErrors.confirmPassword && (
              <p className='text-primary-100 text-sm leading-7 tracking-tight'>
                {formErrors.confirmPassword}
              </p>
            )}
            <Button
              variant='ghost'
              className='absolute top-7 right-2 h-fit w-fit -translate-y-1/2'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type='button'
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={16} />
              ) : (
                <EyeIcon size={16} />
              )}
            </Button>
          </div>

          {submitError || successMessage ? (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 text-center text-sm font-medium ${
                successMessage ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {successMessage || submitError}
            </motion.p>
          ) : null}

          <Button
            className='bg-primary-100 text-md flex h-12 items-center justify-center gap-2 rounded-[100px] p-2 leading-[30px] font-bold tracking-tight'
            type='submit'
          >
            Register
          </Button>
        </form>
      </motion.div>
    </>
  );
};

export default RegisterPage;
