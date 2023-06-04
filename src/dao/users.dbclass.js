import usersModel from './models/users.model.js';
import { createHash, isValidPassword } from './../utils/middlewares/validation.js';

class UsersManager {
  constructor() {
    this.users = [];
  }

  addUser = async (login_email, login_password) => {
    try {
      if ([login_email, login_password].includes(undefined)) {
        throw new Error(`Not Valid - insufficient data`);
      }
      await usersModel.create({ user: login_email, password: createHash(login_password), role: 'user' });
      return { message: `User registered satisfactory` };
    } catch (err) {
      throw new Error(`addUser - ${err}`);
    }
  };
}

export default UsersManager;
