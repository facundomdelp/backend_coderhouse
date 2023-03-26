class ProductManager {

  constructor() {
    this.products = []
  }

  addProduct(title, description, price, thumbnail, code, stock) {
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
    return console.log('Product added correctly!')
  }

  getProducts() {
    return console.log(this.products)
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id)
    if (!product) return console.log('Not Found')
    return console.log(product)
  }

}

/********************************************* Testing *********************************************/

// Crear colección
const tecnology = new ProductManager

// Agregar Productos
  // OK
  console.log('TEST: Adding product #1')
  tecnology.addProduct('Headset', 'For playing music', 450, 'url', 50651, 200)
  console.log('TEST: Adding product #2')
  tecnology.addProduct('Mouse', 'For gaming', 210, 'url', 40621, 10)
  console.log('TEST: Adding product #3')
  tecnology.addProduct('Keyboard', 'For writing', 320, 'url', 20321, 1000)
  console.log('------------')
  // NOK
  console.log('TEST: Repeated code')
  tecnology.addProduct('Mouse', 'For gaming', 610, 'url', 50651, 10)
  console.log('TEST: Missing fields')
  tecnology.addProduct('Mouse', 'For gaming')
  console.log('------------')

// Ver productos
console.log('TEST: Get all products')
tecnology.getProducts()
console.log('------------')

// Ver producto por ID
  // OK
  console.log('TEST: Get a product by ID')
  tecnology.getProductById(2)
  console.log('------------')
  // NOK 
  console.log('TEST: Get an unexisting product by ID')
  tecnology.getProductById(8)

  