import express from 'express';
import cors from 'cors'
const app = express();
import router from './routes/products.js'
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/products', router);

const server = app.listen(PORT, function () {
  console.log(`Listing to port ${PORT}`);
});

server.on('error', function (error) {
  console.log(`Error: ${error}`);
});

app.get('/', function (req, res) {
  res.send(`<h1>Welcome to the book store</h1>`);
});