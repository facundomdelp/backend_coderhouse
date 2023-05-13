import express from 'express';
import MessagesManager from '../dao/messages.db.js';

const router = express.Router();
const messagesManager = new MessagesManager();

const messagesRouter = (wss) => {
  router.get('/messages', async (req, res) => {
    const messages = await messagesManager.getMessages();
    res.status(200).send(JSON.stringify(messages));
  });

  router.post('/messages', async (req, res) => {
    try {
      const { user, message } = req.body;
      wss.emit('new_message', { user, message });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  return router;
};

export default messagesRouter;
