const ProductManager = require('./ProductManager')

// Crear colección
const tecnology = new ProductManager('tecnology')

// Agregar productos
  // OK
  tecnology.addProduct('Headset', 'For playing music', 450, 'url1', 50651, 200)
  tecnology.addProduct('Mouse', 'For gaming', 210, 'url2', 40621, 10)
  tecnology.addProduct('Keyboard', 'For writing', 320, 'url3', 20321, 1000)
  tecnology.addProduct('Speaker', 'For listening', 1020, 'url4', 15600, 150)
  tecnology.addProduct('Notebook', 'For working', 121020, 'url5', 01121, 15)
  tecnology.addProduct('Screen', 'For watching', 45000, 'url6', 02200, 65)
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

// Actualizar producto por ID
tecnology.updateProduct(3, 'Headset', 'For playing music', 600)

// Eliminar producto por ID
tecnology.deleteProduct(5)
