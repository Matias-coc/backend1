const { Router } = require('express');
const router = Router();
const ProductManager = require('../dao/fs/ProductManager');
const CartManager = require('../dao/fs/CartManager');

const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/products', (req, res) => {
    try {
        const productos = productManager.getAll();
        res.render('products', { productos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/products/:pid', (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = productManager.getById(id);

        if (!producto) {
            return res.status(404).render('404');
        }

        res.render('productDetail', { producto });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/carts/:cid', (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const carrito = cartManager.getById(id);

        if (!carrito) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.render('cart', { carrito });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;