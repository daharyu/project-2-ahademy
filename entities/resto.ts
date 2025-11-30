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
  };
};

export type Cart = {
  restaurantId: number | string;
  menuId: number | string;
  quantity: number | string;
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
