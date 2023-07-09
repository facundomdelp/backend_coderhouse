import usersModel from '../../models/users.model.js';
import { createHash } from '../../utils/validation.js';

class UsersManager {
  constructor() {
    this.users = [];
  }

  addUser = async ({ firstName, lastName, age, email, password }) => {
    try {
      if ([email, password].includes(undefined)) {
        throw new Error(`Not Valid - insufficient data`);
      }
      await usersModel.create({
        first_name: firstName,
        last_name: lastName,
        age,
        email,
        password: createHash(password),
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

  getUserByEmail = async (email) => {
    try {
      return await usersModel.findOne({ email }).lean();
    } catch (err) {
      throw new Error(`getUserByEmail - ${err}`);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await usersModel.findById(id);
      if (!user) throw new Error('User not found');
      return user;
    } catch (err) {
      throw new Error(`getUserById - ${err}`);
    }
  };

  getUserByCart = async (cartId) => {
    try {
      const user = await usersModel.findOne({ cart: cartId });
      if (!user) throw new Error('Cart is empty'); // El id del carrito se genera desde el front cuando el usuario ingresa el primer producto
      return user;
    } catch (err) {
      throw new Error(`getUserByCart - ${err}`);
    }
  };
}

export default UsersManager;
