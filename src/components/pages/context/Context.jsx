// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const BASE_URL = "http://localhost:5000";


  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item._id === product._id);

      if (existing) {
        // alert user if product  already in cart
        toast.error(`${product.name} already in cart`)
        return [...prevItems]

      } else {
        // Add new product
        toast.success(`${product.name} added to cart`)
        return [...prevItems, { ...product, quantity: 1 }];

      }
    });
  };
  
  // increase item quantity
  const increaseItemQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  // decrease item quantity
  const decreaseItemQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item => item._id === id ? { ...item, quantity: item.quantity - 1 } : item).
        filter(item => item.quantity > 0)
    );
  }


  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // cart Totals
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // save cartItems at the local storage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  

  return (
    <CartContext.Provider value={{BASE_URL, totalPrice,totalQuantity , cartItems, addToCart, removeFromCart, increaseItemQuantity, clearCart, decreaseItemQuantity, }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
