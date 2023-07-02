import express from 'express';
import { addMessage, getMessages } from '../controllers/messages.controllers.js';
import { apiValidate } from '../utils/middlewares/validation.js';

const router = express.Router();

const messagesRouter = (wss) => {
  router.get('/', apiValidate, getMessages);
  router.post('/', apiValidate, (req, res) => addMessage(req, res, wss));
  return router;
};

export default messagesRouter;
