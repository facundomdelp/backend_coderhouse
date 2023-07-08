class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async ({ limit, page, sort, category, stockGreaterThan }) => {
    return await this.dao.getProducts({ limit, page, sort, category, stockGreaterThan });
  };

  getProductById = async (id) => {
    return await this.dao.getProductById(id);
  };

  addProduct = async (data) => {
    return await this.dao.addProduct(data);
  };

  updateProduct = async (data) => {
    return await this.dao.updateProduct(data);
  };

  deleteProduct = async (id) => {
    return await this.dao.deleteProduct(id);
  };
}

export default ProductsRepository;
