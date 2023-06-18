import bcrypt from 'bcrypt';

export const createHash = (pass) => {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
};

export const isValidPassword = (userInDb, pass) => {
  return bcrypt.compareSync(pass, userInDb.password);
};
