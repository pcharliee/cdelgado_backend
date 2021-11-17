document.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let data = {
    title: document.querySelector('input[name="title"]').value,
    author: document.querySelector('input[name="author"]').value,
    thumbnail: document.querySelector('input[name="thumbnail"]').value,
    price: document.querySelector('input[name="price"]').value,
  }
  fetch('http://localhost:9090/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  });
});