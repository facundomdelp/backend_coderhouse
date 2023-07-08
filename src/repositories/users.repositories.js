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
    return await this.dao.getUserByEmail(email);
  };

  getUserById = async (id) => {
    return await this.dao.getUserById(id);
  };

  getCartId = async (login_email) => {
    return await this.dao.getCartId(login_email);
  };
}

export default UsersRepository;
