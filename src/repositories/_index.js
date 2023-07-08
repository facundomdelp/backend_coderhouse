import { FactoryCarts, FactoryMessages, FactoryProducts, FactoryUsers } from '../dao/factory.js';
import ProductsRepository from './products.repositories.js';
import CartsRepository from './carts.repositories.js';
import MessagesRepository from './messages.repositories.js';
import UsersRepository from './users.repositories.js';

const productsService = new ProductsRepository(new FactoryProducts());
const cartsService = new CartsRepository(new FactoryCarts());
const messagesService = new MessagesRepository(new FactoryMessages());
const usersService = new UsersRepository(new FactoryUsers());

export { productsService, cartsService, messagesService, usersService };
