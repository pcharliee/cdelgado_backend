import './card.css';
import Button from '../../atoms/button/button.js'

function Card(props) {
  
  const onAddToCart = function () {
    props.handleAddToCart(props.product.id);
  };

  const onDeleteProduct = function () {
    props.handleDeleteProduct(props.product.id);
  };

  const renderAddToCartButton = function () {
    return (
       <Button
         onClick={onAddToCart}
         text='Add to cart'>
       </Button>
    );
  };

  const renderAddOrDeleteButton = function () {
    if (!props.isAdmin) return renderAddToCartButton();
    return (
      <Button
        onClick={onDeleteProduct}
        text='Delete'>
      </Button>
    );
  };

  return (
    <div className='card-container'>
      <div className='card-body'>
        <img src={props.product.thumbnail} alt={props.product.title}/>
        <div className='card-details-container'>
          <p>{props.product.title}</p>
          <p>{props.product.author}</p>
          <p>$ {props.product.price.toLocaleString()}</p>
        </div>
          {renderAddOrDeleteButton()}
      </div>
    </div>
  );
}

export default Card;
