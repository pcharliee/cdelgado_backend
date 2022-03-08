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
    const { default: ProductMongo } = await import('../services/product_mongo.js');
    const { default: CartMongo }    = await import('../services/cart_mongo.js');
    const { default: ChatMongo }    = await import('../services/chat_mongo.js');
    const { default: UserMongo }    = await import('../services/users_mongo.js');
    products = new ProductMongo();
    carts = new CartMongo();
    chats = new ChatMongo();
    users = new UserMongo();
    break;
  default:
    break;
}

export { products, carts, chats, users };
