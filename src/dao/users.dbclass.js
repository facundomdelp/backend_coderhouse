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
      if ((await usersModel.findOne({ user: login_email })) !== null) {
        throw new Error(`The email direction is already registered`);
      }
      await usersModel.create({ user: login_email, password: createHash(login_password), role: 'user' }); // El rol admin lo agregué directamente en la base de datos para el usuario de Coder nada más
      return { message: `User registered satisfactory` };
    } catch (err) {
      throw new Error(`addUser - ${err}`);
    }
  };

  validateUser = async (login_email, login_password) => {
    try {
      const user = await usersModel.findOne({ user: login_email });
      if (!isValidPassword(user, login_password)) {
        throw new Error(`Incorrect user or password`);
      }
      return user;
    } catch (err) {
      throw new Error(`validateUser: ${err}`);
    }
  };
}

export default UsersManager;
