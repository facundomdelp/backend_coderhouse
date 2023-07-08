import UsersDTO from '../dao/DTOs/users.dto.js';

class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addUser = async ({ firstName, lastName, age, email, password }) => {
    return await this.dao.addUser({ firstName, lastName, age, email, password });
  };

  addCartId = async (email, cartId) => {
    return await this.dao.addCartId(email, cartId);
  };

  getUserByEmail = async (email) => {
    const user = await this.dao.getUserByEmail(email);
    return new UsersDTO(user);
  };

  getUserById = async (id) => {
    return await this.dao.getUserById(id);
  };
}

export default UsersRepository;
