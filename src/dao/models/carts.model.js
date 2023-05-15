import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'carts';

// Para próximos desafíos:
// Ver de agregarle una referencia al id dentro de products --> ref: 'products'
// Si es el id autogenerado, el type es mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  products: [
    {
      id: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;
