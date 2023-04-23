import express from 'express';
import ProductManager from '../controllers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/products', async (req, res) => {
  const products = await productManager.getProducts();
  const exposedProducts = products.slice(0, req.query.limit ? req.query.limit : products.length);
  res.send(JSON.stringify(exposedProducts));
});

router.get('/products/:pid', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (!product) {
    return res.status(404).send();
  }
  res.status(200).send(JSON.stringify(product));
});

router.post('/products', async (req, res) => {
  try {
    const result = await productManager.addProduct(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/products/:pid', async (req, res) => {
  try {
    const result = await productManager.updateProduct({ id: parseInt(req.params.pid), ...req.body });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/products/:pid', async (req, res) => {
  try {
    const result = await productManager.deleteProduct(parseInt(req.params.pid));
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
