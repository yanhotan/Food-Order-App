import React, { createContext, useState,useContext} from 'react';

// Create a Cart Context
export const CartContext = createContext();

// Create a Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    let updatedCartItems;
    if (existingItem) {
      // Update the quantity of the existing item
      updatedCartItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item to the cart
      updatedCartItems = [...cartItems, { ...product, quantity }];
    }

    setCartItems(updatedCartItems);
  };

  const updateQuantity = (id, quantityChange) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + quantityChange, 1) } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);