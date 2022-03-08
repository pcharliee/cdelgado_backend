window.onload = isLoggedIn();
function isLoggedIn() {
  fetch('/api/session/current').then(function (response) {
    return response.json();
  })
  .then(function (json) {
    user = json.user;
    if (!!json.user) {
      alert('Already logged in. Lets see your cart');
      location.pathname = '../cart'
    }
  })
  .catch(function (error) {
    console.log('error', error)
    location.pathname = './'
  });
}


document.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let form = document.getElementById('loginForm');
  let data = new FormData(form);
  let user = {
    email: data.get('email'),
    password: data.get('password')
  };
  fetch('/api/session/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-type': 'application/json' }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    if (json.error) return alert(json.error);
    
//     location.pathname = '../ecommerce';
    location.pathname = '../cart';
  })
  .catch(function (error) {
    console.log('entra en el error', error)
  });
});
