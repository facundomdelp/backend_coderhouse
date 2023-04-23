import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './router/products.js';
import cartsRouter from './router/carts.js';
import viewsRouter from './router/views.js';
import { __dirname } from './fileUtils.js';

const PORT = 8080;
const WS_PORT = 7050;

// Creación de servidores
const server = express();
const httpServer = server.listen(WS_PORT, () => {
  console.log(`Servidor socketio iniciado en puerto ${WS_PORT}`);
});
export const wss = new Server(httpServer, {
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
  res.send('/products</br>/carts');
});
server.use('/api', productsRouter);
server.use('/api', cartsRouter);

// Motor de plantillas
server.engine('handlebars', handlebars.engine());
server.set('views', `${__dirname}/views`);
server.set('view engine', 'handlebars');

// Endpoint views
server.get('/home', (req, res) => {
  res.send('/products</br>/realtimeproducts');
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

server.listen(PORT, () => {
  console.log(`Server active in port ${PORT}`);
});
