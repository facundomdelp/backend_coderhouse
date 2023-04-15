const express = require('express');
const ProductManager = require('../ProductManager');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Welcome to the Facundo's Market Place`);
});

router.get('/:collection', (req, res) => {
  res.send(`Welcome to the ${req.params.collection} collection`);
});

router.get('/:collection/products', async (req, res) => {
  const fileManager = new ProductManager(`${req.params.collection}`);
  const products = await fileManager.getProducts();
  const exposedProducts = products.slice(0, req.query.limit ? req.query.limit : products.length);
  res.send(JSON.stringify(exposedProducts));
});

router.get('/:collection/products/:id', async (req, res) => {
  const fileManager = new ProductManager(`${req.params.collection}`);
  const product = await fileManager.getProductById(parseInt(req.params.id));
  res.send(JSON.stringify(product));
});
