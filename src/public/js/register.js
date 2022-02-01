let facebookButton = document.getElementById('facebook-btn');
let processButton = document.getElementById('process-info');

processButton.addEventListener('click', () => {
  location.pathname = '/process'
});

facebookButton.addEventListener('click', () => {
  console.log('location', location)
  location = `${location.origin}/auth/facebook`
});

document.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let form = document.getElementById('registerForm');
  let data = new FormData(form);
  let user = {
    name: data.get('name'),
    last_name: data.get('last_name'),
    email: data.get('email'),
    username: data.get('username'),
    password: data.get('password')
  }
  fetch('/register-user', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-type': 'application/json' }
  })
  .then(function (response) {
    if (response.status == 200) {
      location.replace = '/ecommerce';
    }
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  })
  .catch(function (error) {
    alert(error);
  })
});
