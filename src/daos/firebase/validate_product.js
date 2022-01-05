export default function validateNewProduct (product, doc) {
  return Promise.resolve()
    .then(function () {
      let errors = {};

      if (!product.title) {
        errors['product.title'] = 'MISSING';
      }

      if (!product.author) {
        errors['product.author'] = 'MISSING';
      }

      if(!product.price) {
        errors['product.price'] = 'MISSING';
      }

      if(!product.code) {
        errors['product.code'] = 'MISSING';
      }

      if(!product.stock) {
        errors['product.stock'] = 'MISSING';
      }

      if (Object.keys(errors).length != 0) return Promise.reject(errors);
    })
    .then(function () {
      return product;
    });
};