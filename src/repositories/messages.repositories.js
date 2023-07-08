class MessagesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getMessages = async (email) => {
    return await this.dao.getMessages(email);
  };

  addMessage = async (data) => {
    return await this.dao.addMessage(data);
  };
}

export default MessagesRepository;
