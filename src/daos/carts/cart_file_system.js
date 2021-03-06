import fs from 'fs';
import __dirname from '../../utils.js';
import FileContainer from '../../containers/File_container.js';
const fileName = 'carts.json';
const filePath = `${__dirname}/files/${fileName}`;

export default class CartFileSystem extends FileContainer {
  constructor() {
    super(fileName);
  };

   /* 
    Functionality that removes duplicated objects from an array.
    The second parameter is a function that indicates the key it
    will be used for checking for duplicates.
   */
  removeDuplicated(cart, key) {
    return [...new Map(
      cart.products.map(c => [key(c), c])
      ).values()
    ];
  };

  productValidation(currentCartItems, newProduct) {
    let toBeAdded = newProduct;
    currentCartItems.forEach(function (item) {
      if (item.id == newProduct.id) {
        toBeAdded = Object.assign(item, item.quantity = item.quantity + 1)
      }
      return item;
    })
    return toBeAdded;
  }

  async createCart(cartId, productId) {
    try {
      let newCart;
      let data = await fs.promises.readFile(filePath, 'utf-8');
      if (!data) throw new Error();

      let existingCarts = JSON.parse(data);

      // Products
      let productsData = await fs.promises.readFile(`${__dirname}/files/products.json`, 'utf-8');
      if (!productsData) return { status: 'error', message: 'There are no items in Products file' };
      let products = JSON.parse(productsData);

      let productToAdd = products.find(function (product) {
        delete product.stock;
        product.quantity = 1;
        return product.id == productId
      })

      if (!cartId && !productId) {
        newCart = {
          id: this.setItemIndex(existingCarts),
          created_at: new Date().toISOString(),
          products: [] 
        }
      } else {
        newCart = {
          id: cartId,
          created_at: new Date().toISOString(),
          products: productToAdd ? [ productToAdd ] : []
        }
      }

      existingCarts.push(newCart);

      try {
        await fs.promises.writeFile(filePath, JSON.stringify(existingCarts, null, 2));
        return { status: 'success', message: newCart.id.toString() };
      } catch (error) {
        return { status: 'error', message: 'Unexpected error ocurred', error };
      }

    } catch (error) {
      try { 
        console.log('Oops the file was empty,', error)
        let newCart = {
          id: 1,
          created_at: new Date().toISOString(),
          products: []
        }
        await fs.promises.writeFile(filePath, `[${JSON.stringify(newCart, null, 2)}]`);
        return { status: 'success', message: `Adding new cart to empty file` };
      } catch (error) {
        return { status: 'error', message: 'Something went wrong while creating the cart' };
      }
    }
  }

  async saveToCart(cartId, productId) {
    try {
      // Carts
      let data = await fs.promises.readFile(filePath, 'utf-8');
      if (!data) throw new Error('File was empty');
      let existingCarts = JSON.parse(data);

      let selectedCart = existingCarts.find(function (cart) {
        return cart.id == cartId
      })

      if (!selectedCart) return this.createCart(cartId, productId);

      // Products
      let productsData = await fs.promises.readFile(`${__dirname}/files/products.json`, 'utf-8');
      let products = JSON.parse(productsData);
      let productToAdd = products.find(function (product) {
        delete product.stock;
        product.quantity = 1;
        return product.id == productId
      })

      if (!productToAdd) return { status: 'error', message: 'No item found for such ID' }

      selectedCart
        .products
        .push(this.productValidation(selectedCart.products, productToAdd));

      selectedCart.products = this.removeDuplicated(selectedCart, function (_) {
        return _.id;
      })
      
      const updatedCarts = existingCarts.map(function (cart) {
        if (cart.id == cartId)
          cart = Object.assign({ ...selectedCart, updated_at: new Date().toISOString() });
        return cart;
      });

      try {
        await fs.promises.writeFile(filePath, JSON.stringify(updatedCarts, null, 2));
        return { status: 'success', message: `Item added to cart ${cartId}` };

      } catch (error) {
        return { status: 'error', message: 'Something went wrong when adding item', error };
      }

    } catch (error) {
      try {
        return this.createCart();
      } catch (error) {
        return { status: 'error', message: 'Something went wrong' };
      }
    }
  }

  async deleteCartItem(cartId, productId) {
    try {
      let data = await fs.promises.readFile(filePath, 'utf-8');
      if (!data) throw new Error('File was empty');
      let existingCarts = JSON.parse(data);
      
      let selectedCart = existingCarts.find(function (cart) {
        return cart.id == cartId
      });
      
      if (!selectedCart)
        return { status: 'error', message: 'Cart doesn\'t exist' };
      if (!selectedCart.products.length)
        return { status: 'error', message: 'Unable to delete. Cart is empty' };
      
      const filteredProducts = selectedCart.products.filter(function (product) {
        return product.id != productId
      });

      selectedCart.products = filteredProducts;
      
      const updatedCarts = existingCarts.map(function (cart) {
        if (cart.id == selectedCart.id)
          cart = { ...selectedCart, updated_at: new Date().toISOString() };

        return cart;
      });

      try {
        await fs.promises.writeFile(filePath, JSON.stringify(updatedCarts, null, 2));
        return { status: 'success', message: `Product removed from cart ${cartId}` };
      } catch (error) {
        return { status: 'error', message: 'Something went wrong' };
      }
    }
    catch (error) {
      return { status: 'error', message: `No product with ID: ${id}` };
    }
  };
};
