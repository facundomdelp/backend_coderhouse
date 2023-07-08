import { cartsService, usersService } from '../repositories/_index.js';

export const createCart = async (req, res) => {
  try {
    const response = await cartsService.createCart();
    if (!response) {
      return res.status(404).send();
    }
    await usersService.addCartId(req.body.email, response.id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await cartsService.getCartById(parseInt(req.params.cid));
    if (!cart) {
      return res.status(404).send();
    }
    res.status(200).send(JSON.stringify(cart));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const response = await cartsService.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const response = await cartsService.deleteProductFromCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const response = await cartsService.updateCart(parseInt(req.params.cid), req.body);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const updateProductQuantityFromCart = async (req, res) => {
  try {
    const response = await cartsService.updateProductQuantityFromCart(parseInt(req.params.cid), parseInt(req.params.pid), req.body);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const deleteAllProductsFromCart = async (req, res) => {
  try {
    const response = await cartsService.deleteAllProductsFromCart(parseInt(req.params.cid));
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
