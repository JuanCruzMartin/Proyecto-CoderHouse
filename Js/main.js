
function handleCategoriaChange() {
    const categoriaSelect = document.querySelector('.categorias select');
    categoriaSelect.addEventListener('change', function() {
        const selectedCategoria = categoriaSelect.value;

        console.log('Categoría seleccionada:', selectedCategoria);
    });
}


function handleTalleChange() {
    const talleSelect = document.querySelector('.talle select');
    talleSelect.addEventListener('change', function() {
        const selectedTalle = talleSelect.value;
   
        console.log('Talle seleccionado:', selectedTalle);
    });
}


function agregarEventoProductos() {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        producto.addEventListener('click', function() {
            const nombreProducto = producto.alt;
            const precioProducto = producto.nextElementSibling.textContent;
      
            console.log('Producto seleccionado:', nombreProducto, precioProducto);
            
            localStorage.setItem('productoSeleccionado', JSON.stringify({ nombre: nombreProducto, precio: precioProducto }));
        });
    });
}


function setupEventListeners() {
    handleCategoriaChange();
    handleTalleChange();
    agregarEventoProductos();
}


function main() {
    setupEventListeners();
}

document.addEventListener('DOMContentLoaded', main);