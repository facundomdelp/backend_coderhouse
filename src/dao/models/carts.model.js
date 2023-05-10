import mongoose from 'mongoose';

const collection = 'carts';

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
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
