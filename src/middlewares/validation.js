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
