import './register_form.css';
import React from 'react';
import Button from '../../atoms/button/button.js';
import Loading from '../../atoms/loading/loading.js';
import { useUser } from '../../../context/UserContext.js';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm(props) {
  const { registerUser, loading } = useUser();
  const navigate = useNavigate();
  const [ formInfo, setFormInfo ] = React.useState({
    name: '',
    last_name: '',
    email: '',
    avatar: '',
    password: '',
  });

  const updateForm = function (fieldInfo) {
    let field = fieldInfo.target.name;
    let value = fieldInfo.target.files ? fieldInfo.target.files[0] : fieldInfo.target.value;
    const updatedForm = Object.assign({}, formInfo, {
      [field]: value
    });
    setFormInfo(updatedForm);
  };

  const onRegisterUserSuccess = function () {
    navigate('/login');
  }
  const submitForm = function () {
    Object.keys(formInfo).forEach(function (key) {
      if (formInfo[key] == '') return alert(`Field ${key} cannot be empty`);
    })
    return registerUser(formInfo)
      .then(onRegisterUserSuccess)
  };

  const renderRegisterForm = function () {
    return (
      <form
        name="registerForm"
        encType="multipart/form-data"
        onChange={(e) => updateForm(e)}>
      <h1>Register form</h1>
      <label htmlFor="name">Name</label>
      <input type="text" className='name' name="name" required />
      <label htmlFor="last_name">Last Name</label>
      <input type="text" name="last_name" required />
      <label htmlFor="email">Email</label>
      <input type="text" name="email" required />
      <label htmlFor="username">Username</label>
      <input type="text" name="username" required />
      <label htmlFor="avatar">Avatar</label>
      <input type="file" accept="image/*" name="avatar" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />
      <Button onClick={submitForm} text='Register' />
    </form>
    );
  }

  const renderGoToLogin = function () {
    return (
      <Link to='/login'>
        <Button text='Already registered'/>
      </Link>
    );
  };

  const renderLoading = function () {
    if (!loading) return;
    return <Loading />
  };

  return (
    <div className='register-form-container'>
      {renderRegisterForm()}
      {renderGoToLogin()}
      {renderLoading()}
    </div>
  );
};

export default RegisterForm;
