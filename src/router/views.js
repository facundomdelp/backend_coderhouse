import express from 'express';
import ProductManager from '../dao/productsManager.db.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/products', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', {
    products,
  });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', {
    products,
  });
});

router.get('/messages', async (req, res) => {
  res.render('messages', {});
});

export default router;
