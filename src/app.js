// Environment variables
import config from './utils/config.js';
// Project route path
import { __dirname } from './utils/fileUtils.js';
// Services
import express from 'express';
import { Server } from 'socket.io';
import session from 'express-session';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import passport from 'passport';
// Persistence service
import MongoSingleton from './dao/mongo.js';
// Routes
import mainRouter from './routes/main.routes.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import messagesRouter from './routes/messages.routes.js';
import viewsRouter from './routes/views.routes.js';
import initializePassport from './auth/passport.config.js';

const PORT = parseInt(config.PORT);
const WS_PORT = parseInt(config.WS_PORT);
const MONGOOSE_URL = config.MONGOOSE_URL;
const SESSION_SECRET = config.SESSION_SECRET;
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
    cookie: { maxAge: 1000 * 1500 } // 600 segundos / 10 minutes
  })
);
server.use(passport.initialize());
initializePassport();

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
server.use('/', viewsRouter(BASE_URL, WS_URL));

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
  MongoSingleton.getInstance();
  server.listen(PORT, () => {
    console.log(`Server active in port ${PORT}`);
  });
} catch (err) {
  console.log(`Couldn't connect to DB server`);
}
