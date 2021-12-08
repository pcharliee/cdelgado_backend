import express from 'express';
import cors from 'cors'
import __dirname from './utils.js';
import router from './routes/products.js';
import chatRouter from './routes/chat.js';
import cartsRouter from './routes/cart.js';
import chatContainer from './classes/chat_container.js';
import CartsContainer from './classes/Carts_container.js';
import Container from './classes/Products_container.js';
import { authMiddleware } from './utils.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 9090;
const Chats = new chatContainer();
const Products = new Container();
let isAdmin = false;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.auth = isAdmin;
  next();
});
app.use('/api/products', router);
app.use('/api/chat', chatRouter);
app.use('/api/carts', cartsRouter)

app.use(express.static(__dirname+'/public'));

/* Handlebars */
app.engine('handlebars', engine());
app.set('views', __dirname+'/views');
app.set('view engine', '.handlebars');

const server = app.listen(PORT, function () {
  console.log(`Listing to port ${PORT}`);
});
export const io = new Server(server);

app.post('/login', function (req, res) {
  isAdmin = req.body.isAdmin;
  res.status(200).send(isAdmin)
})

server.on('error', function (error) {
  console.log(`Error: ${error}`);
});

io.on('connection', async function (socket) {
  console.log(`${socket.id} connected`);
  let products = await Products.getAll();
  let chatLog = await Chats.getAll();
  socket.emit('showBookCatalog', products);
  socket.emit('chat', chatLog);
})