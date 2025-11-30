import { axiosAuth } from '@/api/axiosClientInstance';
import { axiosInstance } from '@/api/axiosInstance';
import { Cart } from '@/entities/resto';

export const getRestoRecommended = async (token: string) => {
  const res = await axiosInstance.get('/restoRecommend', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCart = async (token: string) => {
  const res = await axiosInstance.get('/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addToCart = async (token: string, items: Cart[]) => {
  return axiosAuth.post(
    '/api/cart', // → becomes /api/cart → correct
    { items },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllResto = async (pageParam: number) => {
  const res = await axiosInstance.get('/resto', {
    params: {
      page: pageParam,
    },
  });
  return res.data;
};

export const getRestobyId = async (id: string) => {
  const res = await axiosInstance.get(`/${id}`);
  return res.data;
};
