import express from 'express';
import MessagesManager from '../dao/messages.dbclass.js';

const router = express.Router();
const messagesManager = new MessagesManager();

const messagesRoutes = (wss) => {
  router.get('/', async (req, res) => {
    const messagesHistory = await messagesManager.getMessages();
    res.status(200).send(JSON.stringify(messagesHistory));
  });

  router.post('/', async (req, res) => {
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

export default messagesRoutes;
