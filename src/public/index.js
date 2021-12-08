let sendButton = document.getElementById('send-message');

sendButton.addEventListener('click', sendMessage);

function sendMessage(e) {
  e.preventDefault();
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;
  if (!email || !message) {
    return alert('Make sure your email and text are written')
  }
  let obj = {
    email: email,
    message: message,
  }
  fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (response) {
    console.log("response chat", response)
    return response.json();
  });
};

document.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let form = document.getElementById('bookForm')
  let data = new FormData(form);
  fetch('/api/products', {
    method: 'POST',
    body: data
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  });
});
