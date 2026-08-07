const fs = require ('fs');
const path = require ('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '../../data/carts.json');
    }

    _leerArchivo() {
        const contenido = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(contenido);
    }

    _escribirArchivo(datos) {
        fs.writeFileSync(this.path, JSON.stringify(datos, null, 2));
    }

    getAll(){
        return this._leerArchivo();
    }

    getById(id){
        const productos = this._leerArchivo();
        const producto = productos.find(p => p.id === id);
        return producto || null;
    }

    create() {
        const carritos = this._leerArchivo();

        const nuevoId = carritos.length > 0
        ? carritos[carritos.length - 1].id + 1
        : 1;

        const nuevoCarrito = {
            id: nuevoId,
            products: []
        };

        carritos.push(nuevoCarrito);
        this._escribirArchivo(carritos);

        return nuevoCarrito;
    }

    addProduct(cartId, productId) {
        const carritos = this._leerArchivo();

        const index = carritos.findIndex(c => c.id === cartId);

        if (index === -1) {
            throw new Error (`Carrito con id ${cartId} no encontrado`);
        }

        const productoExistente = carritos[index].products.find(p => p.product === productId);

        if (productoExistente) {
            productoExistente.quantity++;
        } else {
            carritos[index].products.push({product: productId, quantity: 1});
        }

        this._escribirArchivo(carritos);

        return carritos[index];
    }

    deleteProduct(cartId, productId) {
        const carritos = this._leerArchivo();

        const index = carritos.findIndex(c => c.id === cartId);

        if (index === -1) {
            throw new Error (`Carrito con id ${cartId} no encontrado`);
        }

        carritos[index].products = carritos[index].products.filter(p => p.product !== productId);

        this._escribirArchivo(carritos);

        return carritos[index];
    }
}

module.exports = CartManager;