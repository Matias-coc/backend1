const Product = require('../../models/product.model');

class ProductManagerMongo {
    async getAll(limit = 10, page = 1, query = {}, sort = {}) {
        const skip = (page - 1) * limit;
        const productos = await Product.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        return {
            payload: productos,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
            nextLink: page < totalPages ? `/api/products?page=${page + 1}&limit=${limit}` : null
        };
    }

    async getById(id) {
        return await Product.findById(id);
    }

    async create(productData) {
        return await Product.create(productData);
    }

    async update(id, newData) {
        return await Product.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManagerMongo;