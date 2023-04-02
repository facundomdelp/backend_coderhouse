const fs = require('fs')

class ProductManager {

  constructor(collectionName) {
    this.path = `./collection/${collectionName}.json`
    this.products = []
    ProductManager.createCollectionFolder()
  }

  static createCollectionFolder = () => {
    fs.promises.mkdir('./collection', { recursive: true })
  }

  static getCollection = async (path) => {
    try {
      return JSON.parse(await fs.promises.readFile(path, 'utf-8'))
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
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      console.log('Product added correctly!')
    }
    catch(err) {
      console.log(err)
    }
  }

  getProducts = async () => {
    const collectionData = await ProductManager.getCollection(this.path)
    console.log(collectionData)
  }

  getProductById = async (id) => {
    const collectionData = await ProductManager.getCollection(this.path)
    const product = collectionData.find(product => product.id === id)
    if (!product) return console.log('Not Found')
    return console.log(product)
  }
}

// Crear colección
const tecnology = new ProductManager('tecnology')

// Agregar Productos
  // OK
  tecnology.addProduct('Headset', 'For playing music', 450, 'url', 50651, 200)
  tecnology.addProduct('Mouse', 'For gaming', 210, 'url', 40621, 10)
  tecnology.addProduct('Keyboard', 'For writing', 320, 'url', 20321, 1000)
  // NOK
  tecnology.addProduct('Mouse', 'For gaming', 610, 'url', 50651, 10)
  tecnology.addProduct('Mouse', 'For gaming')

// Ver productos
tecnology.getProducts()

// Ver producto por ID
  // OK
  tecnology.getProductById(2)
  // NOK 
  tecnology.getProductById(8)

  