document.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let form = document.getElementById('loginForm');
  let data = new FormData(form);
  let user = {
    username: data.get('username'),
    password: data.get('password')
  }
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-type': 'application/json' }
  })
  .then(function (response) {
    console.log('response del login?', response)
    if (response.status == 200) {
      location.pathname = '../ecommerce';
    }
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  })
});
