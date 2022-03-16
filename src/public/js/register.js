let facebookButton = document.getElementById('facebook-btn');
facebookButton.addEventListener('click', () => {
  console.log('location', location.origin)
  location = `${location.origin}/auth/facebook`
});

document.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let form = document.getElementById('registerForm');
  let data = new FormData(form);
  fetch('/api/session/register', {
    method: 'POST',
    body: data,
  })
  .then(function (response) {
    if (response.status == 200) {
      location.pathname = '/login';
    }
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  })
  .catch(function (error) {
    console.log(error);
  });
});
