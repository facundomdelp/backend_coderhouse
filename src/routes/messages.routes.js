import express from 'express';
import { addMessage, getMessages } from '../controllers/messages.controllers.js';
import { apiValidate } from '../middlewares/validation.js';
import { userAuthorization } from '../middlewares/authorization.js';

const router = express.Router();

const messagesRouter = (wss) => {
  router.get('/', apiValidate, getMessages);
  router.post('/', apiValidate, userAuthorization, (req, res) => addMessage(req, res, wss));
  return router;
};

export default messagesRouter;
