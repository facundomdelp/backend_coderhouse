const express = require('express');
const productsRouter = require('./router/products');
const cartsRouter = require('./router/carts');

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
