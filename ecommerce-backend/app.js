require('dotenv').config();
const connectDB = require('./src/config/db.js');
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));


const productsRouter = require('./src/routes/products.router.js');
const cartsRouter = require('./src/routes/carts.router.js');
const viewsRouter = require('./src/routes/views.router.js');

app.use('/api/products', productsRouter(io));
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });

    socket.on('nuevoProducto', (producto) => {
        io.emit('actualizarProductos', producto);
    });
});

connectDB();

server.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080');
});
