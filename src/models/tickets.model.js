import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);
const collection = 'tickets';

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true,
    index: true
  }
});

schema.plugin(mongoosePaginate);
const ticketsModel = mongoose.model(collection, schema);

export default ticketsModel;
