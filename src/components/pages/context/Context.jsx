// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'
const CartContext = createContext();
import axios from 'axios'


// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const BASE_URL = "https://myke-bern.onrender.com";

  // const LOCAL_HOST = "http://localhost:5000";
  const [product, setProduct] = useState([])
const [isLoggedIn, setLoggedIn] = useState(false);

useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/status`, { withCredentials: true });
      setLoggedIn(res.data.loggedIn);
    } catch {
      setLoggedIn(false);
    }
  };

  checkLogin();
}, []);


  const login = () => setLoggedIn(true);

  const logout = () => {
    Cookies.remove("Authorization");
    setLoggedIn(false);
  };
    

    // fetch products from backend
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/products`, {
                withCredentials: true,
            })
            setProduct(res.data.products)
           
        } catch (error) {
        

        }

    }

    useEffect(() => {
        fetchProduct();
    }, [])



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
    <CartContext.Provider value={{login,logout,isLoggedIn,product,BASE_URL, totalPrice,totalQuantity , cartItems, addToCart, removeFromCart, increaseItemQuantity, clearCart, decreaseItemQuantity, }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
