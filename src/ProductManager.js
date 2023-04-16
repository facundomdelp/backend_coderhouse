const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = './products.json';
    this.products = [];
    ProductManager.createCollectionFolder();
  }

  static createCollectionFolder = async () => {
    await fs.promises.mkdir('./collection', { recursive: true });
  };

  static getCollection = async (path) => {
    try {
      return JSON.parse(await fs.promises.readFile(path, 'utf-8'));
    } catch (err) {
      console.log(err);
    }
  };

  static updateCollection = async (path, products) => {
    try {
      await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    } catch (err) {
      console.log(err);
    }
  };

  addProduct = async ({ title, description, code, price, stock, category, thumbnails }) => {
    if (this.products.find((product) => product.code === code)) return console.log(`${title} - ${code} Not valid - Repeated code`);
    const params = [title, description, code, price, stock, category, thumbnails];
    if (params.includes(undefined)) return console.log(`${params[0]} - ${params[2]} Not Valid - Enter all the fields`);
    this.products.push({
      id: this.products[this.products.length - 1] ? this.products[this.products.length - 1].id + 1 : 1,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    });
    await ProductManager.updateCollection(this.path, this.products);
  };

  getProducts = async () => {
    const collectionData = await ProductManager.getCollection(this.path);
    console.log(collectionData);
    return collectionData;
  };

  getProductById = async (id) => {
    const collectionData = await ProductManager.getCollection(this.path);
    const product = collectionData.find((product) => product.id === id);
    if (!product) return `${id} Not Found`;
    console.log(product);
    return product;
  };

  updateProduct = async ({ id, title, description, code, price, stock, category, thumbnails }) => {
    const collectionData = await ProductManager.getCollection(this.path);
    const indexToUpdate = collectionData.findIndex((product) => product.id === id);
    if (indexToUpdate ?? false) {
      const productToUpdate = productToUpdate;
      productToUpdate.title = title ?? productToUpdate.title;
      productToUpdate.description = description ?? productToUpdate.description;
      productToUpdate.code = code ?? productToUpdate.code;
      productToUpdate.price = price ?? productToUpdate.price;
      productToUpdate.stock = stock ?? productToUpdate.stock;
      productToUpdate.category = category ?? productToUpdate.category;
      productToUpdate.thumbnails = thumbnails ?? productToUpdate.thumbnails;
      await ProductManager.updateCollection(this.path, collectionData);
    } else {
      console.log(`The ID ${id} you want to update doesn't exist in the database`);
    }
  };

  deleteProduct = async (id) => {
    const collectionData = await ProductManager.getCollection(this.path);
    const indexToBeDeleted = collectionData.findIndex((product) => product.id === id);
    if (indexToBeDeleted !== -1) {
      collectionData.splice(indexToBeDeleted, 1);
      await ProductManager.updateCollection(this.path, collectionData);
    } else {
      console.log(`The ID ${id} you want to update doesn't exist in the database`);
    }
  };
}

module.exports = ProductManager;
