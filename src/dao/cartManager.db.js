import cartsModel from './models/carts.model.js';
import ProductManager from './productsManager.db.js';

const productManager = new ProductManager();
class CartManager {
  constructor() {
    this.carts = [];
  }

  getCarts = async () => {
    try {
      return await cartsModel.find();
    } catch (err) {
      throw new Error(`getProducts - ${err}`);
    }
  };

  createCart = async () => {
    try {
      const carts = await this.getCarts();
      const id = carts[carts.length - 1] ? carts[carts.length - 1].id + 1 : 1;
      await cartsModel.create({ id, products: [] });
      return { message: 'Cart created successfully' };
    } catch (err) {
      throw new Error(`createCart - ${err}`);
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await cartsModel.findOne({ id });
      if (!cart) {
        throw new Error(`Cart doesn't exist in the database`);
      }
      return cart;
    } catch (err) {
      throw new Error(`getProductById - ${err}`);
    }
  };

  addProductToCart = async (id, pid) => {
    try {
      const cartToUpdate = await this.getCartById(id);
      if (cartToUpdate.products.some((product) => product.id === pid)) {
        cartToUpdate.products[cartToUpdate.products.findIndex((product) => product.id === pid)].quantity++;
        console.log(1);
      } else {
        cartToUpdate.products.push({
          id: pid,
          quantity: 1,
        });
        console.log(2);
      }
      const _idToUpdate = await cartsModel.findOne({ id }, { _id: 1 });
      await cartsModel.updateOne({ _id: _idToUpdate }, { $set: cartToUpdate });
      return { message: 'Product added successfully' };
    } catch (err) {
      throw new Error(`addProductToCart - ${err}`);
    }
  };
}

export default CartManager;
