import usersModel from '../../models/users.model.js';

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
