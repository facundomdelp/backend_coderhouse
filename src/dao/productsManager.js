import fs from 'fs';

class ProductManager {
  constructor() {
    this.products = [];
    this.path = '../data/products.json';
    ProductManager.createDataFolder();
    this.productsInit();
  }

  static createDataFolder = async () => {
    await fs.promises.mkdir('../data', { recursive: true });
  };

  static loadProducts = async (path) => {
    try {
      if (!fs.existsSync(path)) {
        await fs.promises.writeFile(path, JSON.stringify([]));
      }
      return JSON.parse(await fs.promises.readFile(path, 'utf-8'));
    } catch (err) {
      console.log(err);
    }
  };

  static saveProducts = async (path, products) => {
    try {
      await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    } catch (err) {
      console.log(err);
    }
  };

  productsInit = async () => {
    this.products = (await ProductManager.loadProducts(this.path)) || [];
  };

  getProducts = async () => {
    const products = await ProductManager.loadProducts(this.path);
    return products;
  };

  getProductById = async (id) => {
    await this.productsInit();
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error(`ID ${id} Not Found`);
    return product;
  };

  addProduct = async ({ title, description, code, price, stock, category, thumbnails }) => {
    await this.productsInit();
    if (this.products.find((product) => product.code === code)) {
      throw new Error(`${title} - ${code} Not valid - Repeated code`);
    }

    const params = [title, description, code, price, stock, category];
    if (params.includes(undefined)) {
      throw new Error(`${params[0]} - ID ${params[2]} - Not Valid - Enter all the mandatory fields`);
    }

    const id = this.products[this.products.length - 1] ? this.products[this.products.length - 1].id + 1 : 1;
    this.products.push({
      id,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails
    });

    await ProductManager.saveProducts(this.path, this.products);
    return { id, message: `Product ${title} - ${code} added successfully` };
  };

  updateProduct = async ({ id, title, description, code, price, stock, category, thumbnails }) => {
    await this.productsInit();
    const products = await ProductManager.loadProducts(this.path);
    const indexToUpdate = products.findIndex((product) => product.id === id);

    if (indexToUpdate === -1) {
      throw new Error(`The ID ${id} you want to update doesn't exist in the database`);
    }

    const productToUpdate = products[indexToUpdate];
    productToUpdate.title = title ?? productToUpdate.title;
    productToUpdate.description = description ?? productToUpdate.description;
    productToUpdate.code = code ?? productToUpdate.code;
    productToUpdate.price = price ?? productToUpdate.price;
    productToUpdate.stock = stock ?? productToUpdate.stock;
    productToUpdate.category = category ?? productToUpdate.category;
    productToUpdate.thumbnails = thumbnails ?? productToUpdate.thumbnails;

    await ProductManager.saveProducts(this.path, products);
    return { message: `Product ${title} - ${code} updated successfully` };
  };

  deleteProduct = async (id) => {
    await this.productsInit();
    const products = await ProductManager.loadProducts(this.path);
    const indexToBeDeleted = products.findIndex((product) => product.id === id);
    const productToBeDeleted = products[indexToBeDeleted];

    if (indexToBeDeleted === -1) {
      throw new Error(`The ID ${id} you want to update doesn't exist in the database`);
    }

    products.splice(indexToBeDeleted, 1);
    await ProductManager.saveProducts(this.path, products);
    return { message: `Product ${productToBeDeleted.title} - ${productToBeDeleted.code} deleted successfully` };
  };
}

export default ProductManager;
