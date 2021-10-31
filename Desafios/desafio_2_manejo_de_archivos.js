const fs = require('fs');

class Contenedor {
  constructor(file) {
    this.file = file;
  };
  
  save(newObject) {
    let self = this;
    fs.promises.readFile(this.file, 'utf-8')
      .then(function (result) {
        if (!result) {
          return fs.promises.appendFile(self.file, `[${JSON.stringify(newObject, null, 2)}]`);
        };
        const currentFile = JSON.parse(result);
        let existingItem = currentFile.some(item => item.title == newObject.title);
        if (existingItem) return Promise.reject('ITEM ALREADY EXISTS');

        const objectToSave = Object.assign({}, newObject, {
          id: currentFile.length+1
        });
        currentFile.push(objectToSave);
        fs.promises.writeFile(self.file, JSON.stringify(currentFile, null, 2));
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  };

  getById(id) {
    fs.promises.readFile(this.file, 'utf-8')
      .then(function(result) {
        if (!result) return Promise.reject('The file is empty');

        const currentFile = JSON.parse(result);
        let item = currentFile.find(item => item.id == id);
        if (!item) return Promise.reject(`No item found for id: ${id}`);

        console.log(`This is the item for ${id}:`, item);
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  };

  getAll() {
    fs.promises.readFile(this.file, 'utf-8')
      .then(function(result) {
        if (!result) return Promise.reject('The file is empty');
        const currentFile = JSON.parse(result);
        console.log(`File content`, currentFile)
      })
      .catch(function (error) {
        console.log('Error:', error)
      });
  };

  deleteById(id) {
    let self = this;
    fs.promises.readFile(this.file, 'utf-8')
      .then(function(result) {
        if (!result) return Promise.reject('The file is empty');
        const currentFile = JSON.parse(result);
        const items = currentFile.filter(item => item.id != id);
        const reformatedItems = items.map(function (item, index) {
          return {
            title:
            item.title,
            author: item.author,
            year: item.year,
            id: index+1
          };
        });
        fs.promises.writeFile(self.file, JSON.stringify(reformatedItems, null, 2));
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  };

  deleteAll() {
    fs.promises.truncate(this.file, 0)
      .then(function() {
        console.log('Success: File is now empty')
      })
      .catch(function (error) {
        console.log('Error:', error)
      });
  };  
};

const initialObject = {
  title: 1984,
  author: 'George Orwell',
  year: 1949,
  id: 1,
};

const Container = new Contenedor('contenedor.json');
Container.save(initialObject);
// Container.save({ title: 'Origen', author: 'Dan Brown', year: 2017 });
// Container.save(initialObject);
// Container.getById(3);
// Container.getById(2);
// Container.deleteById(1);
// Container.deleteAll();