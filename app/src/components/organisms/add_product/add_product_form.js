// import './register_form.css';
import React from 'react';
import Button from '../../atoms/button/button.js';

function AddProductForm(props) {
  const [ formInfo, setFormInfo ] = React.useState({
    title: '',
    price: '',
    stock: '',
    thumbnail: '',
    author: '',
  });

  const updateForm = function (fieldInfo) {
    let field = fieldInfo.target.name;
    let value = fieldInfo.target.files ? fieldInfo.target.files[0] : fieldInfo.target.value;
    const updatedForm = Object.assign({}, formInfo, {
      [field]: value
    });
    setFormInfo(updatedForm);
  };
  
  const onSubmitFormSuccess = function () {
    alert('Product added');
  };

  const submitForm = function () {
    Object.keys(formInfo).forEach(function (key) {
      if (formInfo[key] == '') return alert(`Field ${key} cannot be empty`);
    })
    props.submitForm(formInfo)
      .then(onSubmitFormSuccess)
  };

  const renderAddProduct = function () {
    return (
      <form
        name="addProductForm"
        encType="multipart/form-data"
        onChange={(e) => updateForm(e)}>
        <h1>Add Product</h1>
        <label htmlFor="title">Title</label>
        <input type="text" className='title' name="title" required />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" required />
        <label htmlFor="price">Price</label>
        <input type="text" name="price" required />
        <label htmlFor="stock">Stock</label>
        <input type="text" name="stock" required />
        <label htmlFor="thumbnail">Thumbnail</label>
        <input type="file" accept="image/*" name="thumbnail" required />
        <Button onClick={submitForm} text='Add' />
      </form>
    );
  }

  return (
    <div className='register-form-container'>
      {renderAddProduct()}
    </div>
  );
}

export default AddProductForm;
