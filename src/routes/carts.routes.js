import express from 'express';
import {
  addProductToCart,
  createCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getCartById,
  updateCart,
  updateProductQuantityFromCart,
  purchase
} from '../controllers/carts.controllers.js';
import { apiValidate } from '../middlewares/validation.js';
import { userAuthorization } from '../middlewares/authorization.js';

const router = express.Router();

router.post('/', apiValidate, createCart);
router.get('/:cid', apiValidate, getCartById);
router.post('/:cid/products/:pid', apiValidate, userAuthorization, addProductToCart);
router.delete('/:cid/products/:pid', apiValidate, deleteProductFromCart);
router.put('/:cid', apiValidate, updateCart);
router.put('/:cid/products/:pid', apiValidate, updateProductQuantityFromCart);
router.delete('/:cid', apiValidate, deleteAllProductsFromCart);
router.post('/:cid/purchase', purchase);

export default router;
