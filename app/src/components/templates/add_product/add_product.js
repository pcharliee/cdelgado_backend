import React from 'react';
import AddProductForm from '../../organisms/add_product/add_product_form.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';
import Loading from '../../atoms/loading/loading.js';
import axios from 'axios';

function AddProduct(props) {
  const { loading } = useUser();
  const handleAddProductFormSubmit = function (form) {
    const jwt = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('author', form.author);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('thumbnail', form.thumbnail);

    var config = {
      method: 'post',
      url: 'http://cdelgado-backend.herokuapp.com/api/products',
      headers: { 'Authorization': `Bearer ${jwt}` },
      data: formData,
    };

    return axios(config)
      .then(function (response) {
        alert('Product added');
        console.log('response', response.data)
      })
      .catch(function (error) {
        console.log('error', error);
      })
  };

  const renderLoading = function () {
    if (!loading) return;
    return <Loading />
  }

  return (
    <React.Fragment>
      {renderLoading()}
      <AddProductForm submitForm={handleAddProductFormSubmit}/>
    </React.Fragment>
  )
}

export default AddProduct;
