import { axiosAuth } from '@/api/axiosClientInstance';
import { Cart, CheckOut, GiveReview, paramsResto } from '@/entities/resto';

export const getRestoRecommended = async (token: string) => {
  const res = await axiosAuth.get('/resto/recommended', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCart = async (token: string) => {
  const res = await axiosAuth.get('/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateCart = async (
  token: string,
  id: number,
  quantity: number
) => {
  const res = await axiosAuth.put(
    `/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteCart = async (token: string, id: number) => {
  const res = await axiosAuth.delete(`/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const deleteEntireCart = async (token: string) => {
  const res = await axiosAuth.delete(`/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addToCart = async (token: string, item: Cart) => {
  return axiosAuth.post('/cart', item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToCheckout = async (token: string, item: CheckOut) => {
  return axiosAuth.post('/order/checkout', item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllResto = async ({ params }: { params: paramsResto }) => {
  const res = await axiosAuth.get('/resto', {
    params,
  });
  return res.data;
};

export const getRestobyId = async (id: string) => {
  const res = await axiosAuth.get(`/resto/${id}`);
  return res.data;
};

export const getRestoNearby = async (token: string) => {
  const res = await axiosAuth.get('/resto/nearby', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getRestoBestSeller = async (token: string, pageParam: number) => {
  const res = await axiosAuth.get('/resto/best-seller', {
    params: {
      page: pageParam,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getSearchResto = async (name: string) => {
  try {
    const res = await axiosAuth.get(`/resto/search`, {
      params: { q: name },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (
  pageNum: number,
  status: string,
  token: string
) => {
  try {
    const res = await axiosAuth.get(`/order/my-order`, {
      params: { page: pageNum, status: status },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addReview = async (token: string, item: GiveReview) => {
  try {
    const res = await axiosAuth.post('/review', item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
