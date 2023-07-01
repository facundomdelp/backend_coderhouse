import express from 'express';
import { apiValidate } from '../utils/middlewares/validation.js';
import MessagesManager from './../services/messages.dbclass.js';

const router = express.Router();
const messagesManager = new MessagesManager();

const messagesRouter = (wss) => {
  router.get('/', apiValidate, async (req, res) => {
    const messagesHistory = await messagesManager.getMessages();
    res.status(200).send(JSON.stringify(messagesHistory));
  });

  router.post('/', apiValidate, async (req, res) => {
    try {
      const newMessage = req.body;
      const response = await messagesManager.addMessage(newMessage);
      wss.emit('message_received', newMessage);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  return router;
};

export default messagesRouter;
