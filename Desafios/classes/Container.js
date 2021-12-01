import fs from 'fs';
export default class Container {
  constructor(file) {
    this.file = file;
  };

  setItemIndex(currentFile) {
    let newIndex = currentFile.length+1;
    currentFile.forEach(item => {
      if (item.id == currentFile.length+1) newIndex = item.id+1;
    });
    return newIndex;
  };

  async saveProduct(newObject) {
    let self = this;
    try {
      let data = await fs.promises.readFile('./files/contenedor.json', 'utf-8')
      let products = JSON.parse(data);
      let existingItem = products.some(item => item.title == newObject.title);
      if (existingItem) 
        return { status: 'error', message: 'Item already exists' };

      const objectToSave = Object.assign({}, newObject, {
        id: self.setItemIndex(products)
      });
      products.push(objectToSave);
      try {
        await fs.promises.writeFile('./files/contenedor.json', JSON.stringify(products, null, 2));
        return { status: 'success', message: 'Product successfully added'};
      } catch (error) {
        return { status: 'error', message: 'Try again later'};
      }
    } catch (error) {
      await fs.promises.writeFile(
        './files/contenedor.json',
        `[${JSON.stringify({ ...newObject, id: 1 }, null, 2)}]`
      );
      return { status: 'success', message: 'File and product successfully saved!'};
    }
  };

  async getById(id) {
    try {
      let data = await fs.promises.readFile('./files/contenedor.json', 'utf-8');
      const product = JSON.parse(data).find(prod => prod.id == id);
      if (!product) throw new Error();
      return { status: 'success', payload: product };
    } catch (error) {
      return { status: 'error', message: `No product with ID: ${id}` };
    };
  };

  async getAll() {
    try {
      let data = await fs.promises.readFile('./files/contenedor.json', 'utf-8');
      let products = JSON.parse(data);
      return { status: 'success', payload: products };
    } catch (error) {
      console.log('error', error)
      return { status: 'error', payload: 'File is empty'};
    }
  };

  async deleteById(id) {
    let self = this;
    console.log('id', id)
    try {
      let data = await fs.promises.readFile('./files/contenedor.json', 'utf-8');
      if (!data) return { status: 'error', message: 'File is empty' };
      const products = JSON.parse(data);

      const existingProduct = products.find(prod => prod.id == id);
      if (!existingProduct) throw new Error();

      const remainingProducts = products.filter(prod => prod.id != id);
      try {
        await fs.promises.writeFile(
          './files/contenedor.json',
          JSON.stringify(remainingProducts, null, 2)
        );
        return { status: 'success', message: 'Product removed' };
      } catch (error) {
        return { status: 'error', message: 'Something went wrong' };
      }
    }
    catch (error) {
      return { status: 'error', message: `No product with ID: ${id}`};
    }
  };

  async updateById(id, updatedProduct) {
    try {
      let data = await fs.promises.readFile('./files/contenedor.json', 'utf-8');
      if (!data) return { status: 'error', message: 'File is empty' };
      
      const products = JSON.parse(data);
      const existingProduct = products.find(prod => prod.id == id);
      if (!existingProduct) throw new Error();

      const updatedProducts = products.map(prod => {
        if (prod.id == id)
          prod = Object.assign({ ...updatedProduct, id: prod.id });
        return prod;
      });

      try {
        await fs.promises.writeFile(
          './files/contenedor.json',
          JSON.stringify(updatedProducts, null, 2)
        );
        return { status: 'success', message: 'Product updated' };
      } catch (error) {
        return { status: 'error', message: 'Something went wrong' };
      }
    } catch (error) {
      console.log('error', error)
      return { status: 'error', message: `No product with ID: ${id}`};
    }
  };

  deleteAll() {
    fs.promises.truncate(this.file, 0)
      .then(function() {
        console.log('Success: File is now empty');
      })
      .catch(function (error) {
        console.log('error:', error)
      });
  };  
};