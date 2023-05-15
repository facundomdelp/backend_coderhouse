import express from 'express';
import MessagesManager from '../dao/messages.db.js';

const router = express.Router();
const messagesManager = new MessagesManager();

const messagesRouter = (wss) => {
  router.get('/messages', async (req, res) => {
    const messagesHistory = await messagesManager.getMessages();
    res.status(200).send(JSON.stringify(messagesHistory));
  });

  router.post('/messages', async (req, res) => {
    try {
      const newMessage = req.body;
      const result = await messagesManager.addMessage(newMessage);
      wss.emit('message_received', newMessage);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  return router;
};

export default messagesRouter;
