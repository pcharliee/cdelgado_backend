import fs from 'fs';
import config from '../config.js';

export default class FileContainer {
  constructor(file) {
    this.url = `${config.fileSystem.baseUrl}${file}`
  };
  
  setItemIndex(currentFile) {
    let newIndex = currentFile.length+1;
    currentFile.forEach(item => {
      if (item.id == currentFile.length+1) newIndex = item.id+1;
    });
    return newIndex;
  };

  getAll = async function () {
    try {
      let data = await fs.promises.readFile(this.url, 'utf-8');
      let products = JSON.parse(data);
      return { status: 'success', payload: products };
    } catch (error) {
      return { status: 'error', message: `Something wrong happened: ${error}` }
    }
  }

  getById = async function (objectId) {
    try {
      let data = await fs.promises.readFile(this.url, 'utf-8');
      let object = JSON.parse(data).find(obj => obj.id == objectId);
      if (!object)
        return { status: 'error', message: `Nothing found for ID: ${objectId}` };

      return { status: 'success', payload: object };
    } catch (error) {
      return { status: 'error', message: `Something wrong happened: ${error}` }
    }
  }

  deleteById = async function (objectId) {
    try {
      let data = await fs.promises.readFile(this.url, 'utf-8');
      if (!data) throw new Error('File was empty');
      let existing = JSON.parse(data);
      
      let toBeDeleted = existing.find(function (object) {
        return object.id == objectId
      });
      
      if (!toBeDeleted) return { status: 'error', message: 'Cart doesnt exist'};
      
      const filteredObjects = existing.filter(function (object) {
        return object.id != objectId;
      });

      try {
        await fs.promises.writeFile(
          this.url,
          JSON.stringify(filteredObjects, null, 2)
        );
        return { status: 'success', message: `Successfully removed` };
      } catch (error) {
        return { status: 'error', message: 'Something went wrong' };
      }
    }
    catch (error) {
      return { status: 'error', message: `Nothing found with ID: ${id}` };
    }
  }

  async deleteAll() {
    try {
      await fs.promises.truncate(this.url, 0);
      return { status: 'success', message: 'File deleted successfully' };
    } catch (error) {
      return { status: 'error', message: 'Could not delete file' };
    }
  }
};