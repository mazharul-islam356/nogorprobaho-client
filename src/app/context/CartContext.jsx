"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (item) => {
    const exists = cart.find(
      (p) =>
        p.productId === item.productId &&
        p.variant?.name === item.variant?.name,
    );

    if (exists) {
      toast.error("This variant is already in your cart!");
      return;
    }

    setCart((prev) => [...prev, item]);
    toast.success("Product added to cart!");
  };

  // Remove item
  const removeFromCart = (productId, variantName) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.variant?.name === variantName),
      ),
    );
    toast.success("Product removed from cart");
  };

  // Update quantity
  const updateQuantity = (productId, variantName, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variant?.name === variantName
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared!");
  };

  // Cart summary
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);
