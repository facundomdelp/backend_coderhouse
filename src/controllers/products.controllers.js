import ProductManager from '../dao/productsManager.dbclass.js';

const productManager = new ProductManager();

export const getProducts = async (req, res) => {
  try {
    const products = await productManager.getProducts(req.query);
    res.status(200).send(JSON.stringify(products));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(JSON.stringify(product));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const addProduct = async (req, res, wss) => {
  try {
    const newProduct = req.body;
    const response = await productManager.addProduct(newProduct);
    const newId = response.id;
    res.status(200).send(response);
    wss.emit('new_product', { response, newProduct, newId });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const response = await productManager.updateProduct({ id: parseInt(req.params.pid), ...req.body });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const deleteProduct = async (req, res, wss) => {
  try {
    const response = await productManager.deleteProduct(parseInt(req.params.pid));
    res.status(200).send(response);
    wss.emit('deleted_product', { response, deletedId });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
