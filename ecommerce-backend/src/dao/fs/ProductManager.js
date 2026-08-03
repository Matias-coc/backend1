const { error } = require('console');
const fs = require ('fs');
const path = require ('path');

class productsManager {
    constructor() {
        this.path = path.join(__dirname, '../../data/products.json');
    }

    _leerArchivo() {
        const contenido = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(contenido);
    }

    _escribirArchivo(datos) {
        fs.writeFileSync(this.path, JSON.stringify(datos, null, 2));
    }

    getAll() {
        return this._leerArchivo();
    }

    getById(id) {
        const productos = this._leerArchivo();
        const producto = productos.find(p => p.id === id);
        return producto || null;
    }

    create(productData) {
        const productos = this._leerArchivo();

        const nuevoId = productos.length > 0
        ? productos[productos.length - 1].id + 1
        : 1;

        const nuevoProducto = {
            id: nuevoId,
            ...productData
        };

        productos.push(nuevoProducto);
        this._escribirArchivo(productos);

        return nuevoProducto;
    }

    update(id, newData) {
        const productos = this._leerArchivo();

        const index = productos.findIndex(p => p.id === id);

        if (index === -1){
            throw new Error(`Producto con id ${id} no encontrado`);
        }

        productos[index] = {
            ...productos[index],
            ...newData,
            id: productos[index].id
        };

        this._escribirArchivo(productos);

        return productos[index];
    }

    delete(id) {
        const productos = this._leerArchivo();

        const index = productos.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error (`Producto con id ${id} no encontrado`);
        }

        productos.splice(index, 1);

        this._escribirArchivo(productos);
    }
}

module.exports = productsManager;