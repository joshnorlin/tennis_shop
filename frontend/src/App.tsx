import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './interfaces/HomePage';
import ProductsPage from './interfaces/ProductsPage';
import ContactUsPage from './interfaces/ContactUsPage';
import AboutPage from './interfaces/AboutPage';
import PrivacyPolicyPage from './interfaces/PrivacyPolicyPage';
import CheckoutPage from './interfaces/CheckoutPage';
import LoginPage from './interfaces/LoginPage';
import RegisterPage from './interfaces/RegisterPage';

function Layout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}