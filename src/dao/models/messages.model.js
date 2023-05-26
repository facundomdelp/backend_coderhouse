import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'messages';

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const messagesModel = mongoose.model(collection, schema);

export default messagesModel;
