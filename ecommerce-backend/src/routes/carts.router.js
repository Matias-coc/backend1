const { Router } = require('express');
const router = Router();
const CartManager = require('../dao/fs/CartManager');

const manager = new CartManager();

router.post('/', (req, res) => {
    try {
        const nuevoCarrito = manager.create();
        res.status(201).json({ status: 'success', payload: nuevoCarrito });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/:cid', (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const carrito = manager.getById(id);

        if (!carrito) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', payload: carrito });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.post('/:cid/products/:pid', (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const carrito = manager.addProduct(cartId, productId);

        res.json({ status: 'success', payload: carrito });
    } catch (error) {
        if (error.message.includes('no encontrado')) {
            return res.status(404).json({ status: 'error', message: error.message });
        }
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.delete('/:cid/products/:pid', (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const carrito = manager.deleteProduct(cartId, productId);

        res.json({ status: 'success', payload: carrito });
    } catch (error) {
        if (error.message.includes('no encontrado')) {
            return res.status(404).json({ status: 'error', message: error.message });
        }
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
