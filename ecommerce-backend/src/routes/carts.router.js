const {Router} = require ('express');
const router = Router();

router.post('/', (req, res) => {
    res.send('Crear carrito');
});

router.get('/:cid', (req, res) => {
    res.send(`Obtener carrito ID: ${req.params.cid}`);
});

module.exports = router;

