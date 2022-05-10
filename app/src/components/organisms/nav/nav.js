import './nav.css';
import Button from '../../atoms/button/button.js'
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';

function Nav(props) {
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) navigate('/');
    if (currentUser) navigate('/products');
  }, [currentUser]);

  const onLogoutClick = function () {
    logout()
      .then(function () {
        navigate('/login');
      });
  };

  const renderRoutes = function () {
    switch (currentUser.role) {
      case 'admin': return renderAdminRoutes();
      case 'user':  return renderNormalRoutes();
    }
  };

  const renderNormalRoutes = function () {
    return [
      { text: 'Products', url: '/products' },
      { text: 'Cart',     url: '/cart'},
      { text: 'Chat',     url: '/chat' },
    ];
  };

  const renderAdminRoutes = function () {
    return[
      { text: 'Add Products', url: '/add-product' },
      { text: 'Products',     url: '/products' },
      { text: 'Chat',         url: '/chat' },
    ];
  };

  const renderButtons = function () {
    if (!currentUser) return;
    return renderRoutes().map(function (route, index) {
      return (
        <Button
          text={route.text}
          key={index}
          onClick={() => navigate(route.url)} />
      )
    });
  };
  
  const renderLogoutButton = function () {
    if (!currentUser) return;
    return (
      <Button text='Logout' onClick={onLogoutClick} />
    )
  };

  const renderUserThumbnail = function () {
    if (!currentUser) return;
    return (
      <img className='user-thumbnail' src={currentUser.avatar}></img>
    )
  }

  return (
    <div className='nav-container'>
      <h1>CD-BOOKS</h1>
      {renderUserThumbnail()}
      <div className='nav-routes'>
        {renderButtons()}
        {renderLogoutButton()}
      </div>
    </div>
  );
}

export default Nav;
