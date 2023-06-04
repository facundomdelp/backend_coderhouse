import bcrypt from 'bcrypt';

export const renderValidate = async (req, res, next) => {
  if (req.session.userValidated) {
    next();
  } else {
    res.redirect('/login');
  }
};

export const apiValidate = async (req, res, next) => {
  if (req.session.userValidated) {
    next();
  } else {
    res.status(401).send({ status: 'ERR', error: 'You are not authorized to make this request' });
  }
};

export const createHash = (pass) => {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
};

export const isValidPassword = (userInDb, pass) => {
  return bcrypt.compareSync(pass, userInDb.password);
};
