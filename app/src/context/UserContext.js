import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ userCart, setUserCart ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (currentUser) return;
    loggedUser();
  }, [currentUser]);

  /******* USER LOGIC ********/
  const registerUser = function (form) {
    setLoading(function (prevState) { return !prevState; });
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('last_name', form.last_name);
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('avatar', form.avatar);
    formData.append('password', form.password);

    var config = {
      method: 'post',
      url: 'http://cdelgado-backend.herokuapp.com/api/session/register',
      data: formData,
    };

    return axios(config)
      .then(function (response) {
        setLoading(function (prevState) { return !prevState; });
      })
      .catch(function (error) {
        console.log('error', error);
      })

  };

  const logout = function () {
    return axios('http://cdelgado-backend.herokuapp.com/api/session/logout')
      .then(function (response) {
        console.log('logout', response.data);
        document.cookie = 'JWT_COOKIE=; Max-age=0';
        localStorage.removeItem('jwt');
        setCurrentUser(null);
      });
  };

  const loginUser = function (data) {
    var config = {
      method: 'post',
      url: 'http://cdelgado-backend.herokuapp.com/api/session/login',
      data: data,
    };
    setLoading(function (prevState) { return !prevState; });
    return axios(config)
      .then(function (response) {
        localStorage.setItem('jwt', response.data.payload)
        document.cookie = `JWT_COOKIE=${response.data.payload}; Path='/'`
        setLoading(function (prevState) { return !prevState; });
        loggedUser();
      })
      .catch(function (error) {
        setLoading(function (prevState) { return !prevState; });
        console.log('error', error);
      });
  };

  const loggedUser = function () {
    let token = localStorage.getItem('jwt');
    setLoading(function (prevState) { return !prevState; });
    return axios('http://cdelgado-backend.herokuapp.com/api/session/current', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(function (response) {
        setLoading(function (prevState) { return !prevState; });
        if (response.data.user) setCurrentUser(response.data.user);
      })
      .catch(function (error) {
        console.log('Logged error', error);
        setLoading(function (prevState) { return !prevState; });
      });
  }
  /******* USER LOGIC ********/

  /******* CART LOGIC ********/
  const getUserCart = function () {
    if (!currentUser) return;
    setLoading(function (prevState) { return !prevState; });
    return axios(`http://cdelgado-backend.herokuapp.com/api/carts/${currentUser.cart}/products`)
      .then(function (response) {
        setLoading(function (prevState) { return !prevState; });
        setUserCart(response.data.products);
        return response.data.products;
      });
  };

  const addToCart = function (productId) {
    let body = { id: productId };
    var config = {
      method: 'post',
      url: `http://cdelgado-backend.herokuapp.com/api/carts/${currentUser.cart}/products`,
      data: body,
    };
    return axios(config)
      .then(function (response) {
        alert(response.data.message);
      });
  };

  const removeCartItem = function (productId) {
    setLoading(function (prevState) { return !prevState; });
    var config = {
      method: 'delete',
      url: `http://cdelgado-backend.herokuapp.com/api/carts/${currentUser.cart}/products/${productId}`,
    };
    return axios(config)
      .then(function (response) {
        alert(response.data.message);
        setLoading(function (prevState) { return !prevState; });
      });
  };

  const cartCheckout = function () {
    setLoading(function (prevState) { return !prevState; });
    let body = {
      name: currentUser.name,
      last_name: currentUser.last_name,
      products: userCart,
      cartId: currentUser.cart,
    };

    var config = {
      method: 'post',
      url: `http://cdelgado-backend.herokuapp.com/api/products/checkout`,
      data: body,
    };
    return axios(config)
      .then(function (response) {
        setLoading(function (prevState) { return !prevState; });
        alert(response.data.message);
      });
  };
  /******* CART LOGIC ********/

  /******* ADMIN LOGIC ********/
  const deleteProduct = function (productId) {
    let token = localStorage.getItem('jwt');
    var config = {
      method: 'delete',
      url: `http://cdelgado-backend.herokuapp.com/api/products/${productId}`,
      headers: { 'Authorization': `Bearer ${token}` },
    };
    return axios(config)
      .then(function (response) {
        alert(response.data.message);
      })
  };
  /******* ADMIN LOGIC ********/
  return (
    <UserContext.Provider 
      value={{
        registerUser,
        loginUser,
        logout,
        currentUser,
        setCurrentUser,
        getUserCart,
        addToCart,
        removeCartItem,
        deleteProduct,
        cartCheckout,
        loading }}>
      {props.children}
    </UserContext.Provider>
  )
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) console.log('UserContext is not available here');
  return context;
};
