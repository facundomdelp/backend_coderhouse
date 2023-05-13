import messagesModel from './models/messages.model.js';

class MessagesManager {
  constructor() {
    this.messages = [];
  }

  getMessages = async () => {
    try {
      return await messagesModel.find().lean();
    } catch (err) {
      throw new Error(`getMessages - ${err}`);
    }
  };

  addMessage = async (data) => {
    try {
      const { user, message } = data;
      await messagesModel.create({
        user,
        message,
      });
    } catch (err) {
      throw new Error(`addMessage - ${err}`);
    }
  };
}

export default MessagesManager;
