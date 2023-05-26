import usersModel from './models/users.model.js';

class UsersManager {
  constructor() {
    this.users = [];
  }

  // Agregar crypto

  addUser = async (user, password) => {
    try {
      if ([user, password].includes(undefined)) {
        throw new Error(`Not Valid - insufficient data`);
      }
      if ((await usersModel.findOne({ user })) !== null) {
        throw new Error(`The email direction is already registered`);
      }
      await usersModel.create({ user, password, role: 'user' }); // El rol admin lo agregué directamente en la base de datos para el usuario de Coder
      return { message: `User registered satisfactory` };
    } catch (err) {
      throw new Error(`addUser - ${err}`);
    }
  };

  validateUser = async (user, password) => {
    try {
      const response = await usersModel.findOne({ user, password });
      if (!response) {
        return { message: `Incorrect user or password` };
      }
      return response;
    } catch (err) {
      this.status = `validateUser: ${err}`;
    }
  };
}

export default UsersManager;
