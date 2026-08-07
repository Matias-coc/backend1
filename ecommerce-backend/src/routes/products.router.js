const { Router } = require('express');
const router = Router();
const ProductsManager = require('../dao/fs/ProductManager');

const manager = new ProductsManager();

router.get('/', (req, res) => {
    try {
        const productos = manager.getAll();
        res.json({status: 'success', payload: productos});
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message});
    }
});

router.get('/:pid', (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = manager.getById(id);

        if (!producto) {
            return res.status(404).json({status: 'error', message: 'Producto no encontrado'});
        }

        res.json({status: 'success', payload: producto});
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message});
    }
});

router.post('/', (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({status: 'error', message: 'Faltan campos obligatorios'});
        }
        const nuevoProducto = manager.create({
            title,
            description,
            code,
            price,
            status: status ?? true,
            stock,
            category,
            thumbnails: thumbnails ?? []
        });

        res.status(201).json({ status: 'success', payload: nuevoProducto });
    }catch (error) {
        res.status(500).json({status: 'error', message: error.message});
    }
});

router.put('/:pid', (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const newData = req.body;

        const productoActualizado = manager.update(id, newData);

        res.json({ status: 'success', payload: productoActualizado });
    } catch (error) {
        if (error.message.includes('no encontrado')) {
            return res.status(404).json({ status: 'error', message: error.message});
        }
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.delete('/:pid', (req, res) => {
    try {
        const id = parseInt(req.params.pid);

        manager.delete(id);

        res.json({ status: 'success', message: `Producto con id ${id} eliminado`});
    }catch (error) {
        if (error.message.includes('no encontrado')) {
            return res.status(404).json({ status: 'error', message: error.message});
        }
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;