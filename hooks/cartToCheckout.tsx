import { CheckoutRestaurantsPayload, getCart } from '@/entities/resto';

export const transformFullCartToCheckOut = (
  fullCart: getCart[]
): CheckoutRestaurantsPayload => {
  const restaurantsForCheckout = fullCart.map((cartData) => ({
    restaurantId: Number(cartData.restaurant.id),
    items: cartData.items.map((item) => ({
      menuId: Number(item.menu.id),
      quantity: Number(item.quantity),
    })),
  }));

  return {
    restaurants:
      restaurantsForCheckout as CheckoutRestaurantsPayload['restaurants'],
  };
};
