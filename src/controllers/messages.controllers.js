import { messagesService } from '../repositories/_index.js';

export const getMessages = async (req, res) => {
  try {
    const messagesHistory = await messagesService.getMessages();
    res.status(200).send(JSON.stringify(messagesHistory));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const addMessage = async (req, res, wss) => {
  try {
    const newMessage = req.body;
    const response = await messagesService.addMessage(newMessage);
    wss.emit('message_received', newMessage);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
