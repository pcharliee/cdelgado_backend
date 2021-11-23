import express from 'express';
import router from './routes/products.js';
import Container from '../classes/Container.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Products = new Container();
const PORT = process.env.PORT || 9090;

const server = app.listen(PORT, function () {
  console.log(`EJS site, listening to ${PORT}`)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', router);
app.use('/public', express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', '.ejs');

app.get('/products', function (req, res) {
  Products.getAll().then(function (result) {
    let renderObject = {
      title: "EJS site",
      products: result.payload
    };
    res.render('products', renderObject);
  });
})

app.get('/', function (req, res) {
  console.log('req', req)
  let renderObject = {
    title: "EJS site",
  };
  res.render('form', renderObject);
})

