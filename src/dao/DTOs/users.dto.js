class UsersDTO {
  constructor(user) {
    // Se filtran los datos sensibles
    const { first_name, last_name, email, age, password, role, cart } = user;
    this.first_name = first_name;
    this.email = email;
    this.cartId = cart;
  }
}

export default UsersDTO;
