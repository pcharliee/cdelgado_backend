window.onload = isLoggedIn();
let sendButton = document.getElementById('send-message');
let logoutButton = document.getElementById('logout-button');
let removeButton = document.querySelectorAll('.remove-item');

function isLoggedIn() {
  fetch('/get-session').then(function (response) {
    return response.json();
  })
  .then(function (json) {
    if (!json.user) location.pathname = '/pages/login.html';

    document.getElementById('logged-user').textContent = `Hello ${json.user.name}`;
  })
}
sendButton.addEventListener('click', sendMessage);
logoutButton.addEventListener('click', logout);

function logout() {
  fetch('/logout').then(function (response) {
    return response.json();
  })
  .then(function (json) {
    alert('See you later');
    location.reload();
  });
};

/* CHAT */
function sendMessage(e) {
  e.preventDefault();
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;
  let name = document.getElementById('name').value;
  let lastName = document.getElementById('last-name').value;
  if (!email || !message) {
    return alert('Make sure your email and text are written');
  };
  let obj = {
    sender: {
      id: email,
      author: email,
      name: name,
      lastName: lastName
    },
    message: message,
  };
  fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (response) {
    return response.json();
  });
};
