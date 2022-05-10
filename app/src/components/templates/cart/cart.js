import './cart.css';
import React from 'react';
import Button from '../../atoms/button/button.js';
import Loading from '../../atoms/loading/loading.js';
import { useUser } from '../../../context/UserContext.js';
import { useNavigate } from 'react-router-dom';

function Cart(props) {
  const {
    currentUser,
    getUserCart,
    cartCheckout,
    loading,
    userCart,
    removeCartItem
  } = useUser();
  const [ products, setProducts ] = React.useState({});
  React.useEffect(() => {
    if (!getUserCart || !currentUser) return;
    updateUserCart();
  }, [ currentUser ]);

  const formatCart = function (cart) {
    return cart.reduce(function (total, obj) {
      let key = obj['title']
      if (!total[key]) total[key] = [];
      total[key].push(obj);
      return total;
    }, {});
  };

  const updateUserCart = function () {
    getUserCart()
      .then(function (response) {
      let formattedCart = formatCart(response)
      setProducts(formattedCart);
    });
  }

  const handleCheckout = function () {
    cartCheckout()
      .then(function () {
        setProducts({});
      });
  };

  const handleRemoveCartItem = function (productId) {
    removeCartItem(productId)
      .then(updateUserCart);
  };

  const renderEmptyCart = function () {
    if (loading) return;
    return (
      <h2>Cart is empty</h2>
    );
  };

  const renderLoading = function () {
    if (!loading) return;
    return <Loading />
  }

  const renderCartItems = function () {
    if (!currentUser || !Object.keys(products).length) return renderEmptyCart();
    return Object.keys(products).map(function (key, index) {
      let productQty = products[key].length;
      let product = products[key][0];
      let price = productQty > 1 ? product.price * products[key].length : product.price;
      return (
        <div className='cart-item' key={index}>
          <img className='thumbnail' src={product.thumbnail}></img>
          <p className='title'>
            {`(${productQty}) - ${product.title} - ${product.author}`}
          </p>
          <p>$ {price.toLocaleString()}</p>
          <Button
            text='Remove'
            onClick={() => { handleRemoveCartItem(product.id)}}>
          </Button>
        </div>
      );
    });
  }

  const renderCartTotal = function () {
    if (!Object.keys(products).length) return;
    let totalPrice = 0;
    Object.keys(products).forEach(function (key) {
      let items = products[key];
      items.forEach(function (item) {
        totalPrice += item.price;
      });
    });

    return (
      <div className='price-checkout-container'>
        <p>$ {totalPrice.toLocaleString()}</p>
        <Button text='Checkout cart' onClick={handleCheckout}></Button>
      </div>
    )
  };

  return (
    <React.Fragment>
      {renderLoading()}
      <div className="cart-container">
        {renderCartItems()}
      </div>
      {renderCartTotal()}
    </React.Fragment>
  );
}

export default Cart;
