import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(product) {
      const exists = this.cartItems.find((item) => item.id === product.id);
      if (!exists) {
        this.cartItems.push({ ...product, quantity: 1 });
      } else {
        exists.quantity += 1;
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },
  },
});
