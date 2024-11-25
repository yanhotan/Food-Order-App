import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkoutCart = () => {
    if (cartItems.length > 0) {
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        status: 'Pending',
      };
      setOrderHistory((prev) => [order, ...prev]);
      clearCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderHistory,
        addToCart,
        clearCart,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
