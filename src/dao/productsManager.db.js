import productsModel from './models/products.model.js';

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = async () => {
    try {
      return await productsModel.find();
    } catch (err) {
      return `getProducts: ${err}`;
    }
  };

  getProductById = async (id) => {
    try {
      return await productsModel.find({ id });
    } catch (err) {
      return `getProductById: ${err}`;
    }
  };

  addProduct = async (data) => {
    try {
      const { title, description, code, price, stock, category } = data;
      if ([title, description, code, price, stock, category].includes(undefined)) {
        throw new Error(`Not Valid - Enter all the mandatory fields`);
      }
      if ((await productsModel.findOne({ code })) !== null) {
        throw new Error(`${title} - ${code} Not valid - Repeated code`);
      }
      const products = await this.getProducts();
      const id = products[products.length - 1] ? products[products.length - 1].id + 1 : 1;
      await productsModel.create({ id, status: true, ...data });
      return { id, message: `Product ${title} - ${code} added successfully` };
    } catch (err) {
      throw new Error(`AddProduct - ${err}`);
    }
  };

  updateProduct = async (data) => {
    try {
      const { id } = data;
      const _idToUpdate = await productsModel.findOne({ id }, { _id: 1 });
      if (_idToUpdate === null) {
        throw new Error(`The ID ${id} you want to update doesn't exist in the database`);
      }
      const dataToUpdate = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined));
      await productsModel.updateOne({ _id: _idToUpdate }, { $set: dataToUpdate });
      return { message: `Product updated successfully` };
    } catch (err) {
      throw new Error(`updateProduct - ${err}`);
    }
  };

  deleteProduct = async (id) => {
    try {
      const _idToDelete = await productsModel.findOne({ id }, { _id: 1 });
      if (_idToDelete === null) {
        throw new Error(`The ID ${id} you want to delete doesn't exist in the database`);
      }
      await productsModel.findOneAndDelete({ _id: _idToDelete });
      return { message: `Product deleted successfully` };
    } catch (err) {
      throw new Error(`deleteProduct - ${err}`);
    }
  };
}

export default ProductManager;
