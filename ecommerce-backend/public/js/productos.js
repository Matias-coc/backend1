const socket = io();

socket.on('actualizarProductos', (producto) => {
    const lista = document.getElementById('lista-productos');

    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
        <h3>${producto.title}</h3>
        <p>Precio: $${producto.price}</p>
        <p>Categoría: ${producto.category}</p>
        <p>Stock: ${producto.stock}</p>
        <a href="/products/${producto.id}">Ver detalle</a>
    `;

    lista.appendChild(div);
});