import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const usersModel = mongoose.model(collection, schema);

export default usersModel;
