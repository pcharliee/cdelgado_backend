import express from 'express';
import router from './routes/products.js';
import cors from 'cors';
import Container from '../classes/Container.js';
import { dirname } from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Products = new Container();
const PORT = process.env.PORT || 9090;

const server = app.listen(PORT, function () {
  console.log(`Handlebars, listening to ${PORT}`)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/products', router);
app.use('/public', express.static(__dirname + '/public'));
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', '.handlebars');

app.get('/products', function (req, res) {
  Products.getAll().then(function (result) {
    let renderObject = {
      title: "Handlebars site",
      products: result.payload
    };
    res.render('products', renderObject);
  });
})

app.get('/', function (req, res) {
  let renderObject = {
    title: "Handlebars site",
  };
  res.render('form', renderObject);
})



