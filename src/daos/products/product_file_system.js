import fs from 'fs';
import __dirname from '../../utils.js';
import FileContainer from '../../containers/File_container.js';
const fileName = 'products.json';
const filePath = `${__dirname}/files/${fileName}`;

export default class ProductFileSystem extends FileContainer {
  constructor() {
    super(fileName);
  };

  async saveOne(newObject) {
    let self = this;
    try {
      let data = await fs.promises.readFile(filePath, 'utf-8')
      let products = JSON.parse(data);
      let existingItem = products.find(item => item.title == newObject.title);
      if (existingItem) 
        return this.updateById(existingItem.id, existingItem);

      const objectToSave = Object.assign({}, newObject, {
        id: self.setItemIndex(products),
        code: `F-${Math.random()}`
      });
      products.push(objectToSave);
      try {
        await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));
        return { status: 'success', message: 'Product successfully added' };
      } catch (error) {
        return { status: 'error', message: 'Try again later' };
      }
    } catch (error) {
      await fs.promises.writeFile( filePath, `[${JSON.stringify({ ...newObject, id: 1 }, null, 2)}]` );
      return { status: 'success', message: 'File and product successfully saved!' };
    }
  };

  async updateById(id, updatedProduct) {
    try {
      let data = await fs.promises.readFile(filePath, 'utf-8');
      if (!data) return { status: 'error', message: 'File is empty' };
      
      const products = JSON.parse(data);
      const existingProduct = products.find(prod => prod.id == id);
      if (!existingProduct)
        return { status: 'error', message: `No product with ID: ${id}` };

      const updatedProducts = products.map(prod => {
        if (prod.id == id)
          prod = Object.assign({
            ...updatedProduct,
            stock: parseInt(prod.stock) +1,
            id: prod.id,
            created_at: prod.created_at,
            updated_at: new Date().toISOString()
          });
        return prod;
      });

      try {
        await fs.promises.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));
        return { status: 'success', message: 'Product updated' };
      } catch (error) {
        return { status: 'error', message: 'Something went wrong' };
      }
    } catch (error) {
      return { status: 'error', message: `No product with ID: ${id}` };
    }
  };
};