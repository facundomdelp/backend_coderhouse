import express from 'express';
import CartManager from '../dao/cartManager.db.js';

const router = express.Router();
const cartManager = new CartManager();

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

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const result = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/:');

export default router;
