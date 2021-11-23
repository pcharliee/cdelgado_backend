document.addEventListener('submit', bookRegister);
let showBooks = document.querySelector('#show-books');
let addBook = document.querySelector('#add-book');

if(!!showBooks) showBooks.addEventListener('click', getBooks);
if(!!addBook) addBook.addEventListener('click', () => {
  location.href = '/'
});

function getBooks(e) {
  let currentLocation = window.location.href;
  fetch('/api/products')
    .then(result => {
      return result.json();
    })
    .then(json => {
      location.href = `${currentLocation}products/`
    })
}

function bookRegister(e) {
  e.preventDefault();
  let form = document.getElementById('bookForm');
  let data = new FormData(form);
  
  let book = {
    title: data.get('title'),
    author: data.get('author'),
    thumbnail: data.get('thumbnail'),
    price: data.get('price'),
  }

  fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(result => {
    return result.json()
  })
  .then(json => {
    console.log(json);
    location.href = '/'
  })
}