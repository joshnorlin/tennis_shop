import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'

import AboutPage from './interfaces/AboutPage';
import CheckoutPage from './interfaces/CheckoutPage';
import ContactUsPage from './interfaces/ContactUsPage';
import HomePage from './interfaces/HomePage';
import ProductsPage from './interfaces/ProductsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import TermsAndConditionsPage from './interfaces/TermsAndConditionsPage';
import PrivacyPolicyPage from './interfaces/PrivacyPolicyPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
)
