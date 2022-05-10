// import './login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';
import Button from '../../atoms/button/button.js';
import Loading from '../../atoms/loading/loading.js';

function LoginForm(props) {
  const navigate = useNavigate();
  const { loginUser, currentUser, loading } = useUser();
  const [ formInfo, setFormInfo ] = React.useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    if (currentUser) navigate('/products');
  }, [currentUser]);

  const updateForm = function (fieldInfo) {
    let field = fieldInfo.target.name;
    let value = fieldInfo.target.value;
    const updatedForm = Object.assign({}, formInfo, {
      [field]: value
    });
    setFormInfo(updatedForm);
  };

  const submitForm = function () {
    Object.keys(formInfo).forEach(function (key) {
      if (formInfo[key] == '') return alert(`Field ${key} cannot be empty`);
    })
    return handleLogin(formInfo);
  };

  const onLoginSuccess = function () {
    navigate('/products');
  }

  const handleLogin = function (data) {
    loginUser(data)
      .then(onLoginSuccess);
  };

  const registerRedirect = function () {
    navigate('/')
  };

  const renderLoginForm = function () {
    return (
      <form
        name="registerForm"
        onChange={(e) => updateForm(e)}>
      <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />
      <Button onClick={submitForm} text='Login' />
    </form>
    );
  }

  const renderLoading = function () {
    if (!loading) return;
    return <Loading />
  }

  return (
    <div className='register-form-container'>
      {renderLoginForm()}
      <Button text='Register' onClick={registerRedirect}/>
      {renderLoading()}
    </div>
  )
}

export default LoginForm;
