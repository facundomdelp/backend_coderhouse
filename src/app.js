import express from 'express';
import productsRouter from './router/products.js';
import cartsRouter from './router/carts.js';
import { __dirname } from './utils/fileUtils.js';

const PORT = 8080;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.send(`Welcome to Facundo's Market Place SERVER</br></br>Route /api for more options`);
});

server.get('/api', (req, res) => {
  res.send(`Route /products</br>Route /carts`);
});

server.use('/api', productsRouter);
server.use('/api', cartsRouter);
server.use('/public', express.static(`${__dirname}/public`));

server.listen(PORT, () => {
  console.log(`Server active in port ${PORT}`);
});
