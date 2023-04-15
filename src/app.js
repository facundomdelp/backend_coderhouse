const express = require('express');
const router = require('./router/products.js');

const PORT = 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', router);
server.use('/public', express.static(`${__dirname}/public`));

server.listen(PORT, () => {
  console.log(`Server active in port ${PORT}`);
});
