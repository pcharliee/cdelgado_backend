import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser, loading } from './context/UserContext.js';
import React from 'react';
import Nav from './components/organisms/nav/nav.js';
import Login from './components/organisms/login/login.js';
import Products from './components/templates/products/products.js';
import Cart from './components/templates/cart/cart.js';
import Chat from './components/templates/chat/chat.js';
import MainPage from './components/templates/main_page/main_page.js';
import AddProduct from './components/templates/add_product/add_product.js';
import axios from 'axios';

function App() {
  const [ products, setProducts ] = React.useState([]);

  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = function () {
    axios('http://cdelgado-backend.herokuapp.com/api/products')
      .then(function (response) {
        return response.data;
      })
      .then(function (allProducts) {
        setProducts(allProducts);
      });
  };
  const onSendMessage = function (data) {
    let config = {
      method: 'post',
      url: `http://cdelgado-backend.herokuapp.com/api/chat`,
      data: data,
    };
   return axios(config)
      .then(function (response) {
        console.log('response', response.data);
      })
  };


  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
        <Nav />
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/products' element={<Products products={products} getProducts={getProducts} />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/chat' element={<Chat onSendMessage={onSendMessage}/>} />
          <Route exact path='/add-product' element={<AddProduct />} />
        </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
