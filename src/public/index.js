let sendButton = document.getElementById('send-message');

let removeButton = document.querySelectorAll('.remove-item')
sendButton.addEventListener('click', sendMessage);

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

function removeProduct(e) {
  let id = e.target.value;
  fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);
    location.reload();
  });
}

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
