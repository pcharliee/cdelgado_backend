import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ios from 'socket.io-express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import productRouter from './routes/products.js';
import cartsRouter from './routes/cart.js';
import chatRouter from './routes/chat.js';
import sessionRouter from './routes/session.js';

import config from './config.js';
import __dirname from './utils.js';
import initializePassport from './passport/passport_local_config.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { products } from './daos/index.js';
import { chats } from './daos/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

/* Session */
const baseSession = (session({
  store: MongoStore.create({ mongoUrl: config.mongo.sessionsUrl, ttl: 600 }),
  resave: false,
  saveUninitialized: false,
  secret: config.mongo.SECRET,
}));

app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:9090'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));
app.use(baseSession);

/* Routes */
app.use('/api/products',  productRouter);
app.use('/api/carts',     cartsRouter);
app.use('/api/chat',      chatRouter);
app.use('/api/session',   sessionRouter);

/* Passport */
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/* Handlebars */
app.engine('handlebars', engine());
app.set('views', __dirname+'/views');
app.set('view engine', '.handlebars');

const server = app.listen(PORT, function () {
  console.log(`Listening to port ${PORT}`);
});

export const io = new Server(server, { cors: { origin: '*' } });
io.use(ios(baseSession));

server.on('error', function (error) {
  console.log(`Error: ${error}`);
});

io.on('connection', async function (socket) {
  let chatLog = await chats.getChats();
  socket.emit('chat', chatLog);
});
