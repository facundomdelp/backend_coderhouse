import productsModel from './models/products.model.js';

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = async () => {
    try {
      return await productsModel.find().lean();
    } catch (err) {
      throw new Error(`getProducts - ${err}`);
    }
  };

  getProductById = async (id) => {
    // Preguntar si hace falta mantener este ID --> Parece poco performante.
    try {
      const product = await productsModel.findOne({ id });
      if (!product) {
        throw new Error(`Product doesn't exist in the database`);
      }
      return product;
    } catch (err) {
      throw new Error(`getProductById - ${err}`);
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
      // Estoy haciendo dos búsquedas en la DB en un mismo método, parece poco performante --> PREGUNTAR a Tutor
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
