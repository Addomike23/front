import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import VerifyOTP from './components/auth/VerifyOTP'
import Home from './components/pages/Home/Home'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ShoppingCart from './components/pages/cart/ShoppingCart'
import PrivacyPolicy from './components/pages/privacyPolicy/PrivacyPolicy'
import TermsAndConditions from './components/pages/terms/TermsAndConditions'
import CookiePolicy from './components/pages/cookie-policy/CookiePolicy'
import CookiePolicyPage from './components/pages/cookie-policy/CookiePolicyPage'
import Fag from './components/pages/fag/Fag'
import TrackOrder from './components/pages/trackOrder/TrackOrder'
import Services from './components/pages/services/Services'
import ShippingAddressForm from './components/pages/shippingAddress/ShippingAddressForm'
import ProductListingPage from './components/pages/productListpage/ProductListingPage'
import ProductDetailsPage from './components/pages/productDetails/ProductDetailsPage'





const App = () => {


  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<ShoppingCart />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-condition' element={<TermsAndConditions />} />
        <Route path='/cookie-policy' element={<CookiePolicyPage />} />
        <Route path="/faq" element={<Fag />} />
        <Route path='/service' element={<Services />} />
        <Route path='/product' element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* protected route */}
        <Route element={<ProtectedRoute />} >
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path='/shipping-form' element={<ShippingAddressForm />} />

        </Route>
      </Routes>
      <CookiePolicy />
    </div>
  )
}

export default App
