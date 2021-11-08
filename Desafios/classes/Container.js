const fs = require('fs');

class Container {
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

  save(newObject) {
    let self = this;
    fs.promises.readFile(this.file, 'utf-8')
      .catch(function (error) {
        console.log(`File did not exist. Creating ${self.file}`);
        fs.promises.open(self.file, 'w');
      })
      .then(function (result) {
        if (!result) {
          return fs.promises.appendFile(self.file, `[${JSON.stringify({...newObject, id: 1}, null, 2)}]`);
        };
        const currentFile = JSON.parse(result);
        let existingItem = currentFile.some(item => item.title == newObject.title);
        if (existingItem) return Promise.reject('Item already exists');
        
        const objectToSave = Object.assign({}, newObject, {
          id: self.setItemIndex(currentFile)
        });
        currentFile.push(objectToSave);
        fs.promises.writeFile(self.file, JSON.stringify(currentFile, null, 2));
      })
      .catch(function (error) {
        console.log('Error:', error);
      })
  };

  async getById(id) {
    try {
      let data = await fs.promises.readFile(this.file, 'utf-8');
      const product = JSON.parse(data).find(item => item.id == id);
      if (!product) throw new Error();
      return { status: 'Success', payload: product };
    } catch (error) {
      return { status: 'Error', payload: error };
    };
  };

  async getAll() {
    try {
      let data = await fs.promises.readFile(this.file, 'utf-8');
      let products = JSON.parse(data);
      return { status: 'Success', payload: products };
    } catch (error) {
      return { status: 'Error', payload: 'File is empty'};
    }
  };

  deleteById(id) {
    let self = this;
    fs.promises.readFile(this.file, 'utf-8')
      .then(function(result) {
        if (!result) return Promise.reject('The file is empty');
        const currentFile = JSON.parse(result);
        const items = currentFile.filter(item => item.id != id);
        if (items.length == currentFile.length)
          return Promise.reject(`No item found with ID:${id}`);

        fs.promises.writeFile(self.file, JSON.stringify(items, null, 2));
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  };

  deleteAll() {
    fs.promises.truncate(this.file, 0)
      .then(function() {
        console.log('Success: File is now empty');
      })
      .catch(function (error) {
        console.log('Error:', error)
      });
  };  
};

// const initialObject = {
//   title: 1984,
//   author: 'George Orwell',
//   thumbnail: 'https://www.planetadelibros.com.uy/usuaris/libros/fotos/48/m_libros/portada_1984_george-orwell_202103221202.jpg',
//   year: 1949,
// };

// const Productos = new Container('contenedor.json');
// Productos.save(initialObject);
// Productos.save({
//   title: 'Origen',
//   author: 'Dan Brown',
//   thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_901094-MLU46249032847_062021-O.jpg',
//   year: 2017
// });
// Productos.save({
//   title: 'Kafka on the shore',
//   author: 'Haruki Murakami',
//   thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_751170-MLU42496456855_072020-O.jpg',
//   year: 2002
// });
// Productos.save(initialObject);
// Productos.getAll();
// Productos.getById(3);
// Productos.getById(2);
// Productos.deleteById(4);
// Productos.deleteAll();

module.exports = Container;