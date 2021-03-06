window.onload = isLoggedIn();
let sendButton = document.getElementById('send-message');
let logoutButton = document.getElementById('logout-button');
let removeButton = document.querySelectorAll('.remove-item');

function isLoggedIn() {
  fetch('/api/session/current').then(function (response) {
    return response.json();
  })
  .then(function (json) {
    let user = json.user;
    document.getElementById('logged-user').innerHTML= `
      <p>Hello ${user.username}<p>
      <img class="user-avatar" src=${user.avatar}>
    `;
  })
  .catch(function (error) {
    console.log('error', error)
    location.pathname = './'
  });
}

sendButton.addEventListener('click', sendMessage);
logoutButton.addEventListener('click', logout);

function logout() {
  fetch('/api/session/logout').then(function (response) {
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
