class UsersDTO {
  constructor(user) {
    if (!user) return;
    // Se envían solo los datos necesarios y se evita envíar datos sensibles al front
    const { first_name = undefined, last_name = undefined, email, age = undefined, password, role, cart = undefined } = user;
    this.first_name = first_name ?? undefined;
    this.email = email;
    this.cartId = cart ?? undefined;
    this.role = role;
    const filteredData = { last_name, age, password };
  }
}

export default UsersDTO;
