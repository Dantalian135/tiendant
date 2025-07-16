// l. Estructuras de Control, arreglos y operadores lógicos, utilizando métodos de entrada y salida: confirm, alert
// o. Declaración Variables y Estructuras de Datos (Constantes y Arreglos)
function agregarAlCarrito(nombre, imagen, precio, boton) {
    // o. Declaración de constante para capturar cantidad desde un input del DOM
    const cantidadInput = boton.parentElement.querySelector('input[type="number"]');
    const cantidad = parseInt(cantidadInput?.value) || 1;

    // o. Creación de objeto literal producto
    const producto = {
        nombre,
        imagen,
        precio,
        cantidad
    };

    // o. Arreglo carrito obtenido del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // p. Uso de estructura condicional if y método find para validar producto existente
    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push(producto);
    }

    // m. Manipulación del DOM: guardado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // l. Métodos de entrada/salida: confirm y alert
    const confirmacion = confirm("¿Seguro que quieres agregar al carrito?");
    if (confirmacion) {
        alert("Se agregó exitosamente al carrito");

        const seguirComprando = confirm("¿Quieres seguir comprando?");
        if (!seguirComprando) {
            window.location.href = "cart.html"; // m. Manipulación del DOM: redirección
        }
    }
}

// m. Manipulación HTML y JS: carga dinámica de datos en cart.html
// q. Manipulación DOM con HTML y JavaScript
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tbody = document.querySelector("#cart tbody");
    const subtotalContainer = document.querySelector(".subtotal table");

    if (!tbody || !subtotalContainer) return;

    // m. Limpieza de contenido anterior
    tbody.innerHTML = "";
    let total = 0;

    // p. Estructura repetitiva foreach
    carrito.forEach(producto => {
        const tr = document.createElement("tr");
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        // m. Inserción dinámica en el DOM
        tr.innerHTML = `
            <td><a href="#" onclick="eliminarProducto('${producto.nombre}')"><i class="fas fa-times-circle" style="color:black"></i></a></td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 60px;"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td><input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad('${producto.nombre}', this.value)"></td>
            <td>$${subtotal.toFixed(2)}</td>
        `;

        tbody.appendChild(tr);
    });

    // m. Inserción del total en el DOM
    subtotalContainer.innerHTML = `
        <tr>
            <td>Cart Subtotal</td>
            <td>$${total.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Shipping</td>
            <td>Free</td>
        </tr>
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>$${total.toFixed(2)}</strong></td>
        </tr>
    `;
}

// p. Uso de estructura condicional y lógica para modificar el arreglo del carrito
function eliminarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(p => p.nombre !== nombre); // p. Uso de operador lógico y método array filter
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload(); // m. Manipulación DOM: recarga de página
}

// p. Estructuras condicionales y parseo de datos de entrada
function actualizarCantidad(nombre, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
        producto.cantidad = parseInt(nuevaCantidad);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        location.reload();
    }
}
