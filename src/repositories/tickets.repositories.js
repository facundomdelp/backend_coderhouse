class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTicket = async ({ amount, purchaser }) => {
    return await this.dao.createTicket({ amount, purchaser });
  };
}

export default TicketsRepository;
