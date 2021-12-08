let loginButton = document.getElementById('login-btn');
loginButton.addEventListener('click', adminLogin);

function isLoggedIn() {
  console.log('aver', JSON.parse(localStorage.getItem('LoggedIn')))
  return JSON.parse(localStorage.getItem('LoggedIn'))
}

function login(e) {
  localStorage.setItem('LoggedIn', true);
  document.getElementById('submit-btn').removeAttribute("disabled")
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ isAdmin: true }),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(function (response) {
    e.target.innerHTML = 'logout';
    return response;
  })
}

function logout(e) {
  localStorage.setItem('LoggedIn', false);
  document.getElementById('submit-btn').setAttribute("disabled", true)

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ isAdmin: false }),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(function (response) {
    e.target.innerHTML = 'login';
    return response;
  })
}

function adminLogin(e) {
  if (!isLoggedIn()) login(e);
  else logout(e);
}