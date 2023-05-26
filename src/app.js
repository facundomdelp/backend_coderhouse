import {} from 'dotenv/config';

import { __dirname } from './fileUtils.js';

import express from 'express';
import { Server } from 'socket.io';
import session from 'express-session';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

import mainRouter from './router/main.js';
import productsRouter from './router/products.js';
import cartsRouter from './router/carts.js';
import messagesRouter from './router/messages.js';
import viewsRouter from './router/views.js';

const PORT = parseInt(process.env.PORT) || 3000;
const WS_PORT = parseInt(process.env.WS_PORT) || 3050;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const BASE_URL = `http://localhost:${PORT}`;

// Creación de servidores
const server = express();
const httpServer = server.listen(WS_PORT, () => {
  console.log(`Socketio server active in port ${WS_PORT}`);
});
const wss = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST']
  }
});

// Parseo
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Persistencia de sesiones
const store = MongoStore.create({ mongoUrl: MONGOOSE_URL, mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }, ttl: 30 });
server.use(
  session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 1000 }
  })
);

// Entry point
server.use('/', mainRouter(store, BASE_URL));

// Enpoints API REST
server.use('/api/products', productsRouter(wss));
server.use('/api/carts', cartsRouter);
server.use('/api/messages', messagesRouter(wss));

// Motor de plantillas
server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');
server.set('views', `${__dirname}/views`);

// Endpoint views
server.use('/', viewsRouter(BASE_URL));

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
