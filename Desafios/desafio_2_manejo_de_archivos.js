const fs = require('fs');

class Contenedor {
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
        console.log(`File did not exist. Creating ${self.file}`)
        fs.promises.open(self.file, 'w');
      })
      .then(function (result) {
        if (!result) {
          return fs.promises.appendFile(self.file, `[${JSON.stringify({...newObject, id: 1}, null, 2)}]`);
        };
        const currentFile = JSON.parse(result);
        let existingItem = currentFile.some(item => item.title == newObject.title);
        if (existingItem) return Promise.reject('Item already exists');

        // let newIndex = false;

        // currentFile.forEach(item => {
        //   if (item.id == currentFile.length+1) newIndex = item.id+1;
        //   // console.log('new', newIndex)
        // })
        // console.log('new', newIndex)
        

        
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

  getById(id) {
    fs.promises.readFile(this.file, 'utf-8')
      .then(function(result) {
        if (!result) return Promise.reject('The file is empty');

        const currentFile = JSON.parse(result);
        let item = currentFile.find(item => item.id == id);
        if (!item) return Promise.reject(`No item found for ID:${id}`);

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
};

const Container = new Contenedor('contenedor.json');
Container.save(initialObject);
// Container.save({ title: 'Origen', author: 'Dan Brown', year: 2017 });
// Container.save(initialObject);
// Container.getAll();
// Container.getById(3);
// Container.getById(2);
// Container.deleteById(4);
// Container.deleteAll();