const fs = require('fs')

class ProductManager {

  constructor (collectionName) {
    this.path = `./collection/${collectionName}.json`
    this.collectionName = collectionName
    this.products = []
    ProductManager.createCollectionFolder()
  }

  static createCollectionFolder = async () => {
    await fs.promises.mkdir('./collection', { recursive: true })
  }

  static getCollection = async (path) => {
    try {
      return JSON.parse(await fs.promises.readFile(path, 'utf-8'))
    }
    catch(err) {
      console.log(err)
    }
  }

  static updateCollection = async (path, products) => {
    try {
      await fs.promises.writeFile(path, JSON.stringify(products, null, 2))
    }
    catch(err) {
      console.log(err)
    }
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (this.products.find(product => product.code === code)) return console.log('Not valid - Repeated code')
    const params = [title, description, price, thumbnail, code, stock]
    if (params.includes(undefined)) return console.log('Not Valid - Enter all the fields')
    this.products.push({
      id: this.products[this.products.length - 1] ? this.products[this.products.length - 1].id + 1 : 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    })
    await ProductManager.updateCollection(this.path, this.products)
  }

  getProducts = async () => {
    const collectionData = await ProductManager.getCollection(this.path)
    console.log(collectionData)
    return collectionData
  }

  getProductById = async (id) => {
    const collectionData = await ProductManager.getCollection(this.path)
    const product = collectionData.find(product => product.id === id)
    if (!product) return 'Not Found'
    console.log(product)
    return product
  }

  updateProduct = async (id, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) => {
    const collectionData = await ProductManager.getCollection(this.path)
    const indexToBeUpdated = collectionData.findIndex(product => product.id === id)
    if (indexToBeUpdated) {
      if (newTitle) {
        collectionData[indexToBeUpdated].title = newTitle
      }
      if (newDescription) {
        collectionData[indexToBeUpdated].description = newDescription
      }
      if (newPrice) {
        collectionData[indexToBeUpdated].price = newPrice
      }
      if (newThumbnail) {
        collectionData[indexToBeUpdated].thumbnail = newThumbnail
      }
      if (newCode) {
        collectionData[indexToBeUpdated].code = newCode
      }
      if (newStock) {
        collectionData[indexToBeUpdated].stock = newStock
      }
      await ProductManager.updateCollection(this.path, collectionData)
    } else {
      console.log('The ID doesn`t exist in the database')
    }
  }

  deleteProduct = async (id) => {
    const collectionData = await ProductManager.getCollection(this.path)
    const indexToBeDeleted = collectionData.findIndex(product => product.id === id)
    if (indexToBeDeleted) {
      collectionData.splice(indexToBeDeleted, 1)
      await fs.promises.unlink(this.path)
      await ProductManager.updateCollection(this.path, collectionData)
    } else {
      console.log('The ID doesn`t exist in the database')
    }
  }
}

module.exports = ProductManager


  