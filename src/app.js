import express from 'express';
import cors from 'cors';
import __dirname from './utils.js';
import router from './routes/products.js';
import cartsRouter from './routes/cart.js';
import chatRouter from './routes/chat.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from './config.js';
import ios from 'socket.io-express-session';
import passport from 'passport';
import initializePassportConfig from './passport/passport_config.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { products } from './daos/index.js';
import { chats } from './daos/index.js';
import { users } from './daos/index.js'

const app = express();
const PORT = process.env.PORT || 9090;

/* Session */
const baseSession = (session({
  store: MongoStore.create({ mongoUrl: config.mongo.sessionsUrl, ttl: 600 }),
  resave: false,
  saveUninitialized: false,
  secret: 'CarlosSecret',
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', router);
app.use('/api/carts', cartsRouter);
app.use('/api/chat', chatRouter);
app.use(express.static(__dirname+'/public'));
app.use(baseSession);
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());
/* Handlebars */
app.engine('handlebars', engine());
app.set('views', __dirname+'/views');
app.set('view engine', '.handlebars');

const server = app.listen(PORT, function () {
  console.log(`Listening to port ${PORT}`);
});

export const io = new Server(server);
io.use(ios(baseSession));

app.post('/register-user', async function (req, res) {
  let user = req.body;
  users.saveOne(user).then(function (result) {
    console.log('result', result)
    if (result.status == 'error')
      return res.status(400).send({ message: result.message });
    res.status(200).send({ message: result });
  });
});

app.get('/get-session', async function (req, res) {
  res.send(req.user);
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/errorPage',
  successRedirect: '/ecommerce'
}), (req, res) => {
  console.log('Logged', req.user)
  res.send({ message: 'Logged in' });
});

app.post('/login', async function (req, res) {
  let { username, password } = req.body;
  const user = await users.getUser(username);
  if (!user) return res.status(400).send({ message: 'User does not exist' });
  if (user.password !== password)
    return res.status(400).send({ message: 'Password is incorrect' });
  
  req.session.user = {
    name: user.name,
    username: user.username,
    password: user.password
  };
  res.status(200).send({ message: 'ok' });
});

app.get('/logout', async function (req, res) {
  req.logout();
  res.status(200).send({ message: 'Logged out successfully' });
});

server.on('error', function (error) {
  console.log(`Error: ${error}`);
});

io.on('connection', async function (socket) {
  console.log(`${socket.id} connected`);
  let savedProducts = await products.getAll();
  let chatLog = await chats.getChats();
  socket.emit('showBookCatalog', savedProducts);
  socket.emit('chat', chatLog);
});
