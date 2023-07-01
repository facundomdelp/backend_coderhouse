import express from 'express';
import CartsManager from '../services/cartManager.dbclass.js';
import { apiValidate } from '../utils/middlewares/validation.js';
import UsersManager from '../services/users.dbclass.js';

const router = express.Router();
const cartManager = new CartsManager();
const usersManager = new UsersManager();

router.post('/', apiValidate, async (req, res) => {
  const response = await cartManager.createCart();
  if (!response) {
    return res.status(404).send();
  }
  await usersManager.addCartId(req.body.email, response.id);
  res.status(200).send(response);
});

router.get('/:cid', apiValidate, async (req, res) => {
  const cart = await cartManager.getCartById(parseInt(req.params.cid));
  if (!cart) {
    return res.status(404).send();
  }
  res.status(200).send(JSON.stringify(cart));
});

router.post('/:cid/products/:pid', apiValidate, async (req, res) => {
  try {
    const response = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/:cid/products/:pid', apiValidate, async (req, res) => {
  try {
    const response = await cartManager.deleteProductFromCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:cid', apiValidate, async (req, res) => {
  try {
    const response = await cartManager.updateCart(parseInt(req.params.cid), req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:cid/products/:pid', apiValidate, async (req, res) => {
  try {
    const response = await cartManager.updateProductQuantityFromCart(parseInt(req.params.cid), parseInt(req.params.pid), req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/:cid', apiValidate, async (req, res) => {
  try {
    const response = await cartManager.deleteAllProductsFromCart(parseInt(req.params.cid));
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
