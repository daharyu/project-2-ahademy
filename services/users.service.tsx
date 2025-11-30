/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/api/axiosInstance';
import { UpdateProfile } from '@/entities/auth';

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export const LoginUser = async (props: LoginUser) => {
  try {
    const formData = new FormData();
    formData.append('email', props.email);
    formData.append('password', props.password);
    const response = await axiosInstance.post('/login', formData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const RegisterUser = async (props: RegisterUser) => {
  try {
    const formData = new FormData();
    formData.append('name', props.name);
    formData.append('email', props.email);
    formData.append('phone', props.phone);
    formData.append('password', props.password);
    const response = await axiosInstance.post('/register', formData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUser = async (props: UpdateProfile) => {
  try {
    const userJson =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!userJson) throw new Error('User not logged in');

    const user = JSON.parse(userJson);
    const token = user?.token;

    if (!token) throw new Error('No token found');

    const payload: any = {};
    if (props.name) payload.name = props.name;
    if (props.phone) payload.phone = props.phone;
    if (props.currentPassword) payload.currentPassword = props.currentPassword;
    if (props.newPassword) payload.newPassword = props.newPassword;

    const response = await axiosInstance.put('/updateProfile', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Update profile failed:',
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};
