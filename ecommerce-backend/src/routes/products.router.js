const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('listar productos')
});

router.get('/:pid', (req, res) => {
    res.send(`Obtener productos ID: ${req.params.pid}`);
});

router.post('/', (req, res) => {
    res.send('Crear producto')
});

router.put('/:pid', (req, res) => {
    res.send(`Actualizar productos ID: ${req.params.pid}`);
});

router.delete('/:pid', (req, res) => {
    res.send(`Eliminar productos ID: ${req.params.pid}`);
});

module.exports = router;