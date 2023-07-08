import { usersService } from '../repositories/_index.js';

export const current = async (req, res, store) => {
  try {
    store.get(req.sessionID, async (err, data) => {
      if (err) console.log(`Error while trying to retrieve data session (${err})`);
      if (req.session.userValidated || req.sessionStore.userValidated) {
        const user = await usersService.getUserByEmail(req.sessionStore.email);
        req.sessionStore.user = user;
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
    await usersService.addUser({ firstName: first_name, lastName: last_name, age, email: login_email, password: login_password });
    req.session.userValidated = req.sessionStore.userValidated = true;
    req.sessionStore.email = login_email;
    res.redirect(baseUrl);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const login = async (req, res, baseUrl) => {
  try {
    if (!req.user) throw new Error({ message: 'Invalid credentials' });
    req.session.userValidated = req.sessionStore.userValidated = true;
    req.sessionStore.email = req.body.login_email;
    res.redirect(baseUrl);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const githubCallback = async (req, res, baseUrl) => {
  try {
    req.session.userValidated = req.sessionStore.userValidated = true;
    req.sessionStore.email = req.user.email;
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
