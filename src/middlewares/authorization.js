const ADMIN = 'admin';
const USER = 'user';

export const adminAuthorization = async (req, res, next) => {
  if (req.sessionStore.user.role === ADMIN) {
    next();
  } else {
    res.status(401).send({ status: 'ERR', error: 'You are not authorized to make this request' });
  }
};

export const userAuthorization = async (req, res, next) => {
  if (req.sessionStore.user.role === USER) {
    next();
  } else {
    res.status(401).send({ status: 'ERR', error: 'You are not authorized to make this request' });
  }
};
