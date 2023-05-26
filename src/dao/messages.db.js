import messagesModel from './models/messages.model.js';

class MessagesManager {
  constructor() {
    this.messages = [];
  }

  static validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

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
      const isEmail = MessagesManager.validateEmail(user);
      if (!isEmail) {
        throw new Error('The user is not an email');
      }
      await messagesModel.create({
        user,
        message
      });
      return { result: `Message added successfully` };
    } catch (err) {
      throw new Error(`addMessage - ${err}`);
    }
  };
}

export default MessagesManager;
