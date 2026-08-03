const express = require ('express');
const app = express();

app.use(express.json()); 

const productsRouter = require('./ecommerce-backend/src/routes/products.router.js');
const cartsRouter = require('./ecommerce-backend/src/routes/carts.router.js')

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080');
});
