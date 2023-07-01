import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'carts';

const schema = new mongoose.Schema(
  {
    id: {
      // Mantengo el id autoincrementable que se pidió en las primeras entregas
      type: Number,
      required: true,
      index: true
    },
    products: [
      {
        id: {
          type: Number,
          required: true,
          index: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Uso un virtual schema para poder mantener el id autoincrementable
// Esto me permite referenciar a partir de mis propios ids
schema.virtual('productsInCart', {
  ref: 'products',
  localField: 'products.id',
  foreignField: 'id'
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;
