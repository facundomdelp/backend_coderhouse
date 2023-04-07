const express = require('express')
const ProductManager = require('./ProductManager')

const PORT = 8080
const server = express()


server.get('/', (req, res) => {
  res.send(`Welcome to the Facundo's Market Place`)
})

server.get('/:collection', (req, res) => {
  res.send(`Welcome to the ${req.params.collection} collection`)
})

server.get('/:collection/products', async (req, res) => {
  const fileManager = new ProductManager(`${req.params.collection}`)
  const products = await fileManager.getProducts()
  const exposedProducts = products.slice(0, req.query.limit ? req.query.limit : products.length)
  res.send(JSON.stringify(exposedProducts))
})

server.get('/:collection/products/:id', async (req, res) => {
  const fileManager = new ProductManager(`${req.params.collection}`)
  const product = await fileManager.getProductById(parseInt(req.params.id))
  res.send(JSON.stringify(product))
})

server.listen(PORT, () => {
  console.log(`Server active in port ${PORT}`)
})