document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: 'Australiano caqui', precio: 10000, imagen: '../imagenes/australiano-caqui.jpeg' },
        { id: 2, nombre: 'Logan', precio: 10000, imagen: '../imagenes/logan.jpeg' },
        { id: 3, nombre: 'Pharos roja', precio: 10000, imagen: '../imagenes/pharos-roja.jpeg' },
        { id: 4, nombre: 'Necceser', precio: 10000, imagen: '../imagenes/necceser.jpeg' },
        { id: 5, nombre: 'Billetera', precio: 5000, imagen: '../imagenes/billeteras.jpeg' },
        { id: 6, nombre: 'Aguara', precio: 5000, imagen: '../imagenes/aguara.png' },
        { id: 7, nombre: 'Matera', precio: 20000, imagen: '../imagenes/matera.png' },
        { id: 8, nombre: 'Ceibo', precio: 20000, imagen: '../imagenes/ceibo.png' }
    ];

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        carrito.forEach(producto => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrito-item');
            itemDiv.innerHTML = `
                <p>${producto.nombre}</p>
                <p>${producto.precio}$</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button class="quitar-carrito" data-id="${producto.id}">Quitar</button>
            `;
            carritoItems.appendChild(itemDiv);
        });
        carritoTotal.textContent = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(id) {
        const producto = productos.find(producto => producto.id === id);
        const productoEnCarrito = carrito.find(producto => producto.id === id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        actualizarCarrito();
    }

    function quitarDelCarrito(id) {
        const productoEnCarrito = carrito.find(producto => producto.id === id);

        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
        } else {
            const index = carrito.indexOf(productoEnCarrito);
            carrito.splice(index, 1);
        }

        actualizarCarrito();
    }

    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = productos.find(producto => producto.nombre === e.target.getAttribute('data-product')).id;
            agregarAlCarrito(id);
        });
    });
    carritoItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('quitar-carrito')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            quitarDelCarrito(id);
        }
    });

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    actualizarCarrito();
});