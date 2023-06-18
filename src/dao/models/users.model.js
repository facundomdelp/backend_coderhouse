import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  age: { type: String, required: true },
  password: { type: String, required: true },
  cart: { type: Number },
  role: { type: String, required: true }
});

const usersModel = mongoose.model(collection, schema);

export default usersModel;
