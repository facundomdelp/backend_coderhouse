import express from 'express';
import { apiValidate } from '../utils/middlewares/validation.js';
import ProductManager from './../services/productsManager.dbclass.js';

const router = express.Router();
const productManager = new ProductManager();

const productsRouter = (wss) => {
  router.get('/', apiValidate, async (req, res) => {
    const products = await productManager.getProducts(req.query);
    res.status(200).send(JSON.stringify(products));
  });

  router.get('/:pid', apiValidate, async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(JSON.stringify(product));
  });

  router.post('/', apiValidate, async (req, res) => {
    try {
      const newProduct = req.body;
      const response = await productManager.addProduct(newProduct);
      const newId = response.id;
      res.status(200).send(response);
      wss.emit('new_product', { response, newProduct, newId });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.put('/:pid', apiValidate, async (req, res) => {
    try {
      const response = await productManager.updateProduct({ id: parseInt(req.params.pid), ...req.body });
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.delete('/:pid', apiValidate, async (req, res) => {
    try {
      const response = await productManager.deleteProduct(parseInt(req.params.pid));
      res.status(200).send(response);
      wss.emit('deleted_product', { response, deletedId });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  return router;
};

export default productsRouter;
