import usersModel from './models/users.model.js';
import { createHash } from './../utils/middlewares/validation.js';

class UsersManager {
  constructor() {
    this.users = [];
  }

  addUser = async (first_name, last_name, age, login_email, login_password) => {
    try {
      if ([first_name, last_name, age, login_email, login_password].includes(undefined)) {
        throw new Error(`Not Valid - insufficient data`);
      }
      await usersModel.create({
        first_name,
        last_name,
        age,
        email: login_email,
        password: createHash(login_password),
        role: 'user'
      });
      return { message: `User registered satisfactory` };
    } catch (err) {
      throw new Error(`addUser - ${err}`);
    }
  };

  addCartId = async (email, cartId) => {
    try {
      await usersModel.updateOne({ email }, { $set: { cart: cartId } });
    } catch (err) {
      throw new Error(`addCartId - ${err}`);
    }
  };

  getCartId = async (login_email) => {
    try {
      const user = await usersModel.findOne({ email: login_email });
      if (!user) throw new Error('User not found');
      return user.cart;
    } catch (err) {
      throw new Error(`getCartId - ${err}`);
    }
  };
}

export default UsersManager;
