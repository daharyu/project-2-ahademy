export type Food = {
  id: string;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

export type Review = {
  id: string;
  star: string;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

export type Cart = {
  restaurantId: number | string;
  menuId: number | string;
  quantity: number;
};

export type getCart = {
  restaurant: {
    id: string | number;
    name: string;
    logo: string;
  };
  items: [
    {
      id: string | number;
      menu: {
        id: string | number;
        foodName: string;
        price: string | number;
        type: string;
        image: string;
      };
      quantity: string | number;
      itemTotal: string | number;
    },
  ];
  subtotal: string | number;
};

type CheckOutItem = {
  menuId: number;
  quantity: number;
};

type CheckOutRestaurant = {
  restaurantId: number;
  items: CheckOutItem[];
};

export type CheckOut = {
  restaurants?: CheckOutRestaurant[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes?: string;
};

export type CheckoutRestaurantsPayload = {
  restaurants: CheckOutRestaurant[];
};

export type paramsResto = {
  priceMin?: number | string | null;
  priceMax?: number | string | null;
  rating?: number | string | null;
  page: number | string;
};

export interface FilterContentProps {
  priceMin: number;
  setPriceMin: (value: number) => void;
  priceMax: number;
  setPriceMax: (value: number) => void;
  selectedRating: number;
  setSelectedRating: (value: number) => void;
}

export type OrderRes = {
  id: number;
  transactionId: string;
  status: string;
  paymentMethod: string;
  deliveryAddress: string;
  phone: string;
  pricing: {
    subtotal: number;
    serviceFee: number;
    deliveryFee: number;
    totalPrice: number;
  };
  restaurants: [
    {
      restaurant: {
        id: number;
        name: string;
        logo: string;
      };
      items: [
        {
          menuId: number;
          menuName: string;
          price: number;
          image: string;
          quantity: number;
          itemTotal: number;
        },
      ];
      subtotal: number;
    },
  ];
  createdAt: string;
  updatedAt: string;
};

export type GiveReview = {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
  menuIds: number[];
};
