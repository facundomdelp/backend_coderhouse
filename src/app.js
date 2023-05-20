import {} from 'dotenv/config';
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import productsRouter from './router/products.js';
import cartsRouter from './router/carts.js';
import viewsRouter from './router/views.js';
import messagesRouter from './router/messages.js';
import { __dirname } from './fileUtils.js';

const PORT = parseInt(process.env.PORT) || 3000;
const WS_PORT = parseInt(process.env.WS_PORT) || 3050;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

// Creación de servidores
const server = express();
const httpServer = server.listen(WS_PORT, () => {
  console.log(`Socketio server active in port ${WS_PORT}`);
});
const wss = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.send(`Welcome to Facundo's Market Place SERVER</br></br>Route /api for more options`);
});

// Enpoints API REST
server.get('/api', (req, res) => {
  res.send('/products</br>/carts</br>/messages');
});
server.use('/api', productsRouter(wss));
server.use('/api', cartsRouter);
server.use('/api', messagesRouter(wss));

// Motor de plantillas
server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');
server.set('views', `${__dirname}/views`);

// Endpoint views
server.get('/home', (req, res) => {
  res.send('/products</br>/realtimeproducts</br>/messages');
});
server.use('/home', viewsRouter);

// Contenidos estáticos
server.use('/public', express.static(`${__dirname}/public`));

// Eventos socket.io
wss.on('connection', (socket) => {
  console.log(`Client connected (${socket.id})`);
  socket.emit('server_confirm', 'Client connection received');
  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected (${socket.id}): ${reason}`);
  });
});

// Activación y escucha del servidor
try {
  await mongoose.connect(MONGOOSE_URL);
  server.listen(PORT, () => {
    console.log(`Server active in port ${PORT}`);
  });
} catch (err) {
  console.log(`Couldn't connect to DB server`);
}
