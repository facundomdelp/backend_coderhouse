import UsersManager from '../services/users.dbclass.js';

const usersManager = new UsersManager();

export const current = async (req, res, store) => {
  try {
    store.get(req.sessionID, async (err, data) => {
      if (err) console.log(`Error while trying to retrieve data session (${err})`);
      if (req.session.userValidated || req.sessionStore.userValidated) {
        res.redirect('/home/products');
      } else {
        res.redirect('/login');
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const register = async (req, res, baseUrl) => {
  try {
    const { first_name, last_name, age, login_email, login_password } = req.body;
    await usersManager.addUser({ firstName: first_name, lastName: last_name, age, email: login_email, password: login_password });
    req.session.userValidated = req.sessionStore.userValidated = true;
    req.sessionStore.user = login_email;
    const cartId = await usersManager.getCartId(login_email);
    req.sessionStore.cartId = cartId;
    res.redirect(baseUrl);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const login = async (req, res, baseUrl) => {
  try {
    if (!req.user) throw new Error({ message: 'Invalid credentials' });
    req.session.userValidated = req.sessionStore.userValidated = true;
    req.sessionStore.user = req.body.login_email;
    const cartId = await usersManager.getCartId(req.body.login_email);
    req.sessionStore.cartId = cartId;
    res.redirect(baseUrl);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const githubCallback = async (req, res, baseUrl) => {
  try {
    req.session.userValidated = req.sessionStore.userValidated = true;
    req.sessionStore.user = req.user.email;
    const cartId = await usersManager.getCartId(req.user.email);
    req.sessionStore.cartId = cartId;
    res.redirect(baseUrl);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const logout = async (req, res, baseUrl) => {
  try {
    req.session.userValidated = req.sessionStore.userValidated = false;
    req.session.destroy((err) => {
      req.sessionStore.destroy(req.sessionID, (err) => {
        if (err) console.log(`Error while trying to destroy the session (${err})`);
        console.log('Destroyed sesion');
        res.redirect(baseUrl);
      });
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
