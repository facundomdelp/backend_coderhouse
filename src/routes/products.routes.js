import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/products.controllers.js';
import { apiValidate } from '../middlewares/validation.js';
import { adminAuthorization } from '../middlewares/authorization.js';

const router = express.Router();

const productsRouter = (wss) => {
  router.get('/', apiValidate, getProducts);
  router.get('/:pid', apiValidate, getProductById);
  router.post('/', apiValidate, adminAuthorization, (req, res) => addProduct(req, res, wss));
  router.put('/:pid', apiValidate, adminAuthorization, updateProduct);
  router.delete('/:pid', apiValidate, adminAuthorization, (req, res) => deleteProduct(req, res, wss));

  return router;
};

export default productsRouter;
