let products
  , carts
  , chats
  , users;
let persistence = 'mongo';

switch (persistence) {
  case 'fileSystem':
    const { default: ProductFileSystem } = await import('./products/product_file_system.js');
    const { default: CartFileSystem }    = await import('./carts/cart_file_system.js');
    products = new ProductFileSystem();
    carts = new CartFileSystem();
    break;
  case 'mongo':
    const { default: ProductMongo } = await import('./products/product_mongo.js');
    const { default: CartMongo }    = await import('./carts/cart_mongo.js');
    const { default: ChatMongo }    = await import('./chats/chat_mongo.js');
    const { default: UserMongo }    = await import('./users/users_mongo.js');
    products = new ProductMongo();
    carts = new CartMongo();
    chats = new ChatMongo();
    users = new UserMongo();
    break;
  case 'firebase': 
    const { default: ProductFirebase } = await import('./products/product_firebase.js');
    const { default: CartFirebase }    = await import('./carts/cart_firebase.js');
    products = new ProductFirebase();
    carts = new CartFirebase();
  default:
    break;
}

export { products, carts, chats, users };