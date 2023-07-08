class UsersDTO {
  constructor(user) {
    // Se envían solo los datos necesarios y se evita envíar datos sensibles al front
    const { first_name, last_name, email, age, password, role, cart } = user;
    this.first_name = first_name;
    this.email = email;
    this.cartId = cart;
    this.role = role;
    const filteredData = { last_name, age, password };
  }
}

export default UsersDTO;
