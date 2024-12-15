document.addEventListener("DOMContentLoaded", () => {
    const carritoLista = document.getElementById("carrito-lista");
    const totalElemento = document.getElementById("total");

    // Recuperar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para renderizar el carrito
    function renderizarCarrito() {
        carritoLista.innerHTML = ""; // Limpia la tabla
        let total = 0;

        carrito.forEach((producto, index) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${producto.detalle}</td>
                <td>$ ${new Intl.NumberFormat("es-AR").format(producto.precio)}</td>
                <td>
                    <button class="eliminar-btn" data-index="${index}">❌</button>
                </td>
            `;

            carritoLista.appendChild(fila);
            total += parseInt(producto.precio, 10);
        });

        totalElemento.textContent = `Total: $ ${new Intl.NumberFormat("es-AR").format(total)}`;
        agregarEventosEliminar();
    }

    // Función para eliminar un producto
    function agregarEventosEliminar() {
        const botonesEliminar = document.querySelectorAll(".eliminar-btn");

        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                const index = e.target.dataset.index; // Obtiene el índice del producto
                carrito.splice(index, 1); // Elimina el producto del array
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el localStorage
                renderizarCarrito(); // Vuelve a renderizar
            });
        });
    }

    // Realizar compra
    document.getElementById("realizarCompra").addEventListener("click", () => {
        alert("¡Gracias por tu compra!");
        localStorage.removeItem("carrito"); // Limpia el carrito
        window.location.href = "../index.html"; // Redirige a inicio
    });

    // Renderizar carrito al cargar la página
    renderizarCarrito();
});

