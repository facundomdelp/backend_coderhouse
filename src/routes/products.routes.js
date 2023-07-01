import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/products.controllers.js';
import { apiValidate } from '../utils/middlewares/validation.js';

const router = express.Router();

const productsRouter = (wss) => {
  router.get('/', apiValidate, getProducts);
  router.get('/:pid', apiValidate, getProductById);
  router.post('/', apiValidate, (req, res) => addProduct(req, res, wss));
  router.put('/:pid', apiValidate, updateProduct);
  router.delete('/:pid', apiValidate, (req, res) => deleteProduct(req, res, wss));

  return router;
};

export default productsRouter;
