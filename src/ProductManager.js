const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = '../data/products.json';
    this.products = [];
    ProductManager.createDataFolder();
  }

  static createDataFolder = async () => {
    await fs.promises.mkdir('../data', { recursive: true });
  };

  static updateCollection = async (path, products) => {
    try {
      await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    } catch (err) {
      console.log(err);
    }
  };

  getProducts = async () => {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
    }
  };

  addProduct = async ({ title, description, code, price, stock, category, thumbnails }) => {
    if (this.products.find((product) => product.code === code)) return console.log(`${title} - ${code} Not valid - Repeated code`);
    const params = [title, description, code, price, stock, category];
    if (params.includes(undefined)) return console.log(`${params[0]} - ID ${params[2]} - Not Valid - Enter all the mandatory fields`);
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

  getProductById = async (id) => {
    const products = await ProductManager.getProducts();
    const product = products.find((product) => product.id === id);
    if (!product) return `ID ${id} Not Found`;
    console.log(product);
    return product;
  };

  updateProduct = async ({ id, title, description, code, price, stock, category, thumbnails }) => {
    const products = await ProductManager.getProducts();
    const indexToUpdate = products.findIndex((product) => product.id === id);
    if (indexToUpdate ?? false) {
      const productToUpdate = products[indexToUpdate];
      productToUpdate.title = title ?? productToUpdate.title;
      productToUpdate.description = description ?? productToUpdate.description;
      productToUpdate.code = code ?? productToUpdate.code;
      productToUpdate.price = price ?? productToUpdate.price;
      productToUpdate.stock = stock ?? productToUpdate.stock;
      productToUpdate.category = category ?? productToUpdate.category;
      productToUpdate.thumbnails = thumbnails ?? productToUpdate.thumbnails;
      await ProductManager.updateCollection(this.path, products);
    } else {
      console.log(`The ID ${id} you want to update doesn't exist in the database`);
    }
  };

  deleteProduct = async (id) => {
    const products = await ProductManager.getProducts();
    const indexToBeDeleted = products.findIndex((product) => product.id === id);
    if (indexToBeDeleted !== -1) {
      products.splice(indexToBeDeleted, 1);
      await ProductManager.updateCollection(this.path, products);
    } else {
      console.log(`The ID ${id} you want to update doesn't exist in the database`);
    }
  };
}

module.exports = ProductManager;
