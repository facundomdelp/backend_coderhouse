import cartsModel from '../../models/carts.model.js';

class CartsManager {
  constructor() {
    this.carts = [];
  }

  static #isProductInCart = (cartToUpdate, pid) => cartToUpdate.products.some((product) => product.id === pid);
  static #findProductIndexInCart = (cartToUpdate, pid) => cartToUpdate.products.findIndex((product) => product.id === pid);

  createCart = async () => {
    try {
      const carts = await cartsModel.find().sort({ _id: -1 }).limit(1);
      const id = carts.length > 0 ? carts[0].id + 1 : 1;
      await cartsModel.create({ id, products: [] });
      return { message: 'Cart created successfully', id };
    } catch (err) {
      throw new Error(`createCart - ${err}`);
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await cartsModel.findOne({ id }).populate('productsInCart').lean();
      if (!cart) throw new Error(`Cart doesn't exist in the database`);
      return cart;
    } catch (err) {
      throw new Error(`getCartById - ${err}`);
    }
  };

  addProductToCart = async (id, pid) => {
    try {
      const cartToUpdate = await this.getCartById(id);
      if (CartsManager.#isProductInCart(cartToUpdate, pid)) {
        cartToUpdate.products[CartsManager.#findProductIndexInCart(cartToUpdate, pid)].quantity++;
      } else {
        cartToUpdate.products.push({
          id: pid,
          quantity: 1
        });
      }
      const _idToUpdate = await cartsModel.findOne({ id }, { _id: 1 });
      await cartsModel.updateOne({ _id: _idToUpdate }, { $set: cartToUpdate });
      return { message: 'Product added successfully' };
    } catch (err) {
      throw new Error(`addProductToCart - ${err}`);
    }
  };

  deleteProductFromCart = async (id, pid) => {
    try {
      const cartToDeleteProduct = await this.getCartById(id);
      if (CartsManager.#isProductInCart(cartToDeleteProduct, pid)) {
        await cartsModel.updateOne({ id }, { $pull: { products: { id: pid } } });
        return { message: 'Product deleted successfully' };
      } else {
        throw new Error(`Couldn't find product in cart`);
      }
    } catch (err) {
      throw new Error(`deleteProductFromCart - ${err}`);
    }
  };

  updateCart = async (id, { products }) => {
    try {
      const cartToUpdate = await this.getCartById(id);
      if (products.length === 0) throw new Error(`Please add products to update`);
      for (const product of products) {
        const { id: pid, quantity } = product;
        if ([pid, quantity].includes(undefined)) {
          throw new Error(`${products.indexOf(product) + 1}° product with incomplete mandatory fields`);
        }
        if (CartsManager.#isProductInCart(cartToUpdate, pid)) {
          for (let i = 1; i <= quantity; i++) {
            await this.addProductToCart(id, pid);
          }
        } else {
          await cartsModel.updateOne({ id }, { $push: { products: product } });
        }
      }
      return { message: 'Cart updated successfully with products' };
    } catch (err) {
      throw new Error(`updateCart - ${err}`);
    }
  };

  updateProductQuantityFromCart = async (id, pid, { quantity }) => {
    try {
      if (!quantity) throw new Error(`Please enter a quantity`);
      const cartToUpdateProductQuantity = await this.getCartById(id);
      cartToUpdateProductQuantity.products[CartsManager.#findProductIndexInCart(cartToUpdateProductQuantity, pid)].quantity = quantity;
      await cartsModel.updateOne({ id }, { $set: cartToUpdateProductQuantity });
      return { message: 'Product quantity updated' };
    } catch (err) {
      throw new Error(`updateProductQuantityFromCart - ${err}`);
    }
  };

  deleteAllProductsFromCart = async (id) => {
    try {
      await cartsModel.updateOne({ id }, { $set: { products: [] } });
      return { message: 'Products removed successfully' };
    } catch (err) {
      throw new Error(`deleteAllProductsFromCart - ${err}`);
    }
  };
}

export default CartsManager;
