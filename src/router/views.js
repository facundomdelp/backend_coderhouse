import express from 'express';
import ProductManager from '../dao/productsManager.db.js';
import MessagesManager from '../dao/messages.db.js';

const router = express.Router();
const productManager = new ProductManager();
const messagesManager = new MessagesManager();

router.get('/products', async (req, res) => {
  const products = await productManager.getProducts(req.query);
  res.render('products', {
    products: products.payload,
  });
});

router.get('/realTimeProducts', async (req, res) => {
  const products = await productManager.getProducts(req.query);
  res.render('realTimeProducts', {
    products: products.payload,
  });
});

router.get('/messages', async (req, res) => {
  const messages = await messagesManager.getMessages();
  res.render('messages', {
    messages,
  });
});

export default router;
