// Environment variables
import {} from 'dotenv/config';
// Project route path
import { __dirname } from './utils/fileUtils.js';
// Services
import express from 'express';
import { Server } from 'socket.io';
import session from 'express-session';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
// Routes
import mainRoutes from './router/main.routes.js';
import productsRoutes from './router/products.routes.js';
import cartsRoutes from './router/carts.routes.js';
import messagesRoutes from './router/messages.routes.js';
import viewsRoutes from './router/views.routes.js';
import cookieParser from 'cookie-parser';
import { initializePassport } from './auth/passport.config.js';

const PORT = parseInt(process.env.PORT) || 3000;
const WS_PORT = parseInt(process.env.WS_PORT) || 3050;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const BASE_URL = `http://localhost:${PORT}`;
const WS_URL = `ws://localhost:${WS_PORT}`;

// Creación de servidores
const server = express();
const httpServer = server.listen(WS_PORT, () => {
  console.log(`Socketio server active in port ${WS_PORT}`);
});
const wss = new Server(httpServer, {
  cors: {
    origin: BASE_URL,
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
    cookie: { maxAge: 1000 * 1500 } // 1500 segundos
  })
);
server.use(cookieParser('abcdefgh12345678'));
server.use(passport.initialize());
initializePassport();

// Entry point
server.use('/', mainRoutes(store, BASE_URL));

// Enpoints API REST
server.use('/api/products', productsRoutes(wss));
server.use('/api/carts', cartsRoutes);
server.use('/api/messages', messagesRoutes(wss));

// Motor de plantillas
server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');
server.set('views', `${__dirname}/views`);

// Endpoint views
server.use('/', viewsRoutes(BASE_URL, WS_URL));

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
