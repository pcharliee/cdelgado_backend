import './products.css';
import React from 'react';
import Card from '../../molecules/card/card.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';

function Products(props) {
  const { currentUser, addToCart, deleteProduct } = useUser();
  React.useEffect(() => {
    props.getProducts();
  }, [])

  const onAddToCart = function (productId) {
    return addToCart(productId);
  };

  const onDeleteProduct = function (productId) {
    return deleteProduct(productId)
      .then(props.getProducts);
  };

  const renderCards = function () {
    return props.products.map(function (product) {
      return (
        <Card
          handleDeleteProduct={onDeleteProduct}
          handleAddToCart={onAddToCart}
          isAdmin={currentUser?.role == 'admin'}
          product={product}
          key={product.id}>
        </Card>
      );
    });
  }

  return (
    <div className="cards-container">
      {renderCards()}
    </div>
  )
}

export default Products;
