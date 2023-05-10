import fs from 'fs';
import ProductManager from './productManager.js';

const productManager = new ProductManager();

class CartManager {
  constructor() {
    this.path = '../data/carts.json';
    CartManager.createDataFolder();
    this.cartInit();
  }

  static createDataFolder = async () => {
    await fs.promises.mkdir('../data', { recursive: true });
  };

  static loadCarts = async (path) => {
    try {
      if (!fs.existsSync(path)) {
        await fs.promises.writeFile(path, JSON.stringify([]));
      }
      return JSON.parse(await fs.promises.readFile(path, 'utf-8'));
    } catch (err) {
      console.log(err);
    }
  };

  static saveCarts = async (path, cart) => {
    try {
      await fs.promises.writeFile(path, JSON.stringify(cart, null, 2));
    } catch (err) {
      console.log(err);
    }
  };

  cartInit = async () => {
    this.carts = (await CartManager.loadCarts(this.path)) || [];
  };

  createCart = async () => {
    this.carts.push({ id: this.carts[this.carts.length - 1] ? this.carts[this.carts.length - 1].id + 1 : 1, products: [] });
    await CartManager.saveCarts(this.path, this.carts);
    return { message: 'Cart created successfully' };
  };

  getCartById = async (id) => {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      throw new Error(`ID ${id} Not Found`);
    }

    return cart.products;
  };

  addProductToCart = async (id, pid) => {
    const cartIndex = this.carts.findIndex((cart) => cart.id === id);

    if (cartIndex === -1) {
      throw new Error(`ID ${id} Not Found`);
    }

    const productInCartIndex = this.carts[cartIndex].products.findIndex((product) => product.id === pid);
    const product = await productManager.getProductById(pid);

    if (productInCartIndex === -1) {
      this.carts[cartIndex].products.push({ id: product.id, quantity: 1 });
      await CartManager.saveCarts(this.path, this.carts);
      return { message: `Product ${product.title} - ${product.code} added successfully to cart` };
    } else {
      this.carts[cartIndex].products[productInCartIndex].quantity += 1;
      await CartManager.saveCarts(this.path, this.carts);
      return { message: `Product ${product.title} - ${product.code} added successfully to cart` };
    }
  };
}

export default CartManager;
