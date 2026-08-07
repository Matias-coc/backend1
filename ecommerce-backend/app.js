const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Routers API
const productsRouter = require('./src/routes/products.router.js');
const cartsRouter = require('./src/routes/carts.router.js');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Servidor
app.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080');
});
