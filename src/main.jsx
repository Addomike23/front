import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import { CartProvider } from './components/pages/context/Context.jsx';



createRoot(document.getElementById('root')).render(

 
    <CartProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </CartProvider>


)
