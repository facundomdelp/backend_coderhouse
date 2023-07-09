import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  age: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Number
  },
  role: {
    type: String,
    required: true
  }
});

const usersModel = mongoose.model(collection, schema);

export default usersModel;
