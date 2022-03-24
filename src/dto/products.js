export default class ProductsDto {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.author = product.author;
    this.price = product.price;
    this.thumbnail = product.thumbnail;
  };
};
