import express from 'express';
import ProductManager from '../dao/productsManager.db.js';

const router = express.Router();
const productManager = new ProductManager();

const productsRouter = (wss) => {
  router.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const exposedProducts = products.slice(0, req.query.limit ? req.query.limit : products.length);
    res.send(JSON.stringify(exposedProducts));
  });

  router.get('/products/:pid', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(JSON.stringify(product));
  });

  router.post('/products', async (req, res) => {
    try {
      const newProduct = req.body;
      const message = await productManager.addProduct(newProduct);
      const newId = message.id;
      res.status(200).send(message);
      wss.emit('new_product', { message, newProduct, newId });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.put('/products/:pid', async (req, res) => {
    try {
      const message = await productManager.updateProduct({ id: parseInt(req.params.pid), ...req.body });
      res.status(200).send(message);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.delete('/products/:pid', async (req, res) => {
    try {
      const deletedId = req.params.pid;
      const message = await productManager.deleteProduct(parseInt(deletedId));
      res.status(200).send(message);
      wss.emit('deleted_product', { message, deletedId });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  return router;
};

export default productsRouter;
