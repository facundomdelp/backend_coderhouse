import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);
const collection = 'products';

// Para próximos desafíos:
// Se puede agregar un index = true en los campos a partir de los cuales voy a hacer una búsqueda.

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: [String],
});

schema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collection, schema);

export default productsModel;
