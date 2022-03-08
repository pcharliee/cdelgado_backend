window.onload = isLoggedIn();
let checkoutButton = document.getElementById('checkout');
let products = [];
let user = {};
function isLoggedIn() {
  fetch('/api/session/current').then(function (response) {
    return response.json();
  })
  .then(function (json) {
    user = json.user;
    let items = json.user.cart.map(function (item) {
      products.push(item);
      return `<li>${item.author} - ${item.title} - ${item.price}</li>`
    });
    
    document.getElementById('cart-container').innerHTML= items.join('');
  })
  .catch(function (error) {
    console.log('error', error)
    location.pathname = './'
  });
}

checkoutButton.addEventListener('click', checkout);

function checkout() {
  let order = {
    name: user.name,
    last_name: user.last_name,
    products: products
  };

  fetch('/api/products/checkout', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-type': 'application/json' }
  }).then(function (response) {
    alert('Thank you. Your order will arrive in 20 minutes');
    location.pathname = '../ecommerce'
    return response.json();
  })
};
