import express from 'express';
import CartsManager from '../dao/cartManager.db.js';

const router = express.Router();
const cartManager = new CartsManager();

router.post('/', async (req, res) => {
  const result = await cartManager.createCart();
  if (!result) {
    return res.status(404).send();
  }
  res.status(200).send(result);
});

router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(parseInt(req.params.cid));
  if (!cart) {
    return res.status(404).send();
  }
  res.status(200).send(JSON.stringify(cart));
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const result = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const result = await cartManager.deleteProductFromCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const result = await cartManager.updateCart(parseInt(req.params.cid), req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const result = await cartManager.updateProductQuantityFromCart(parseInt(req.params.cid), parseInt(req.params.pid), req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const result = await cartManager.deleteAllProductsFromCart(parseInt(req.params.cid));
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
