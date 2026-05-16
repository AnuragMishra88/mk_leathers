// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './Pages/Homepage/Homepage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Homepage with 30‑day countdown */}
          <Route path="/" element={<Homepage />} />
          
          {/* Leather product pages */}
          <Route path="/products" element={<div>Our Leather Collection Coming Soon</div>} />
          <Route path="/products/bags" element={<div>Heritage Leather Bags</div>} />
          <Route path="/products/jackets" element={<div>Artisan Leather Jackets</div>} />
          <Route path="/products/wallets" element={<div>Fine Leather Wallets</div>} />
          <Route path="/products/accessories" element={<div>Leather Accessories</div>} />
          
          {/* Company pages */}
          <Route path="/about" element={<div>About M&K Leathers</div>} />
          <Route path="/craftsmanship" element={<div>Our Craftsmanship</div>} />
          <Route path="/journal" element={<div>Leather Journal</div>} />
          <Route path="/contact" element={<div>Contact Us</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;