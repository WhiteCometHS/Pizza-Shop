import React from 'react';

import { Header } from './components';
import { Home, Cart } from './pages';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Shop() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/cart" element={<Cart />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default Shop;
