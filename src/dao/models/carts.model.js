import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'carts';

const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      index: true,
    },
    products: [
      {
        id: {
          type: Number,
          required: true,
          index: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.virtual('productsInCart', {
  ref: 'products',
  localField: 'products.id',
  foreignField: 'id',
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;
