const Cart = require('../../models/cart.model');

class CartManagerMongo {
    async getAll() {
        return await Cart.find();
    }

    async getById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async create() {
        return await Cart.create({ products: [] });
    }

    async addProduct(cartId, productId) {
        const carrito = await Cart.findById(cartId);

        if (!carrito) {
            throw new Error(`Carrito con id ${cartId} no encontrado`);
        }

        const productoExistente = carrito.products.find(
            p => p.product.toString() === productId
        );

        if (productoExistente) {
            productoExistente.quantity++;
        } else {
            carrito.products.push({ product: productId, quantity: 1 });
        }

        await carrito.save();
        return carrito;
    }

    async deleteProduct(cartId, productId) {
        const carrito = await Cart.findById(cartId);

        if (!carrito) {
            throw new Error(`Carrito con id ${cartId} no encontrado`);
        }

        carrito.products = carrito.products.filter(
            p => p.product.toString() !== productId
        );

        await carrito.save();
        return carrito;
    }

    async updateCart(cartId, products) {
        return await Cart.findByIdAndUpdate(
            cartId,
            { products },
            { new: true }
        );
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const carrito = await Cart.findById(cartId);

        if (!carrito) {
            throw new Error(`Carrito con id ${cartId} no encontrado`);
        }

        const producto = carrito.products.find(
            p => p.product.toString() === productId
        );

        if (!producto) {
            throw new Error(`Producto con id ${productId} no encontrado en el carrito`);
        }

        producto.quantity = quantity;
        await carrito.save();
        return carrito;
    }

    async deleteAll(cartId) {
        return await Cart.findByIdAndUpdate(
            cartId,
            { products: [] },
            { new: true }
        );
    }
}

module.exports = CartManagerMongo;