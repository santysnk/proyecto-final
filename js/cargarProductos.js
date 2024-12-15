document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.querySelector(".productos");
    const carritoBoton = document.querySelector(".tiendaBotonCarrito");
    let carrito = []; // Array para almacenar los productos añadidos

    // Captura el botón por su ID
    const botonCarrito = document.getElementById("botonCarrito");

    // Evento click para redirigir a carrito.html
    botonCarrito.addEventListener("click", () => {
      window.location.href = "carrito.html"; // Redirige a carrito.html
    });

    // Actualiza el contador del botón carrito
    function actualizarCarrito() {
        carritoBoton.textContent = `(${carrito.length}) CARRITO`;
    }

    // Función para añadir al carrito
    function añadirAlCarrito(detalle, precio) {
        carrito.push({ detalle, precio });
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda en localStorage
        actualizarCarrito();
    }

    async function cargarExcel() {
        try {
            // Cargar el archivo Excel
            const response = await fetch("../baseDatos/Base_de_datos.xlsx");
            const data = await response.arrayBuffer();

            // Leer el archivo Excel
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convertir la hoja a un array de objetos
            const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", header: 1 });
            const headers = ["PRODUCTOS", "DETALLE", "NOMBRE_IMAGEN", "COSTO", "IVA", "% GANANCIA", "PRECIO_FINAL"];
            const productos = rows.slice(1).map(row => {
                return {
                    [headers[0]]: row[0] || "",
                    [headers[1]]: row[1] || "Sin descripción",
                    [headers[2]]: row[2] || "placeholder.png",
                    [headers[6]]: row[6] || "0.00"
                };
            });

            // Crear dinámicamente cada producto
            productos.slice(1).forEach((producto, index) => {
                const imagenPath = producto.NOMBRE_IMAGEN
                    ? `/images/productos/${producto.NOMBRE_IMAGEN.trim()}`
                    : "/images/productos/placeholder.png";

                const detalle = producto.DETALLE || "Sin descripción";

                // Formatear el precio: eliminar decimales y agregar puntos
                const precioRaw = producto.PRECIO_FINAL || 0;
                const precioFinal = new Intl.NumberFormat("es-AR", {
                    style: "decimal",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(precioRaw);

                const productoDiv = document.createElement("div");
                productoDiv.className = "producto";

                productoDiv.innerHTML = `
                    <img src="${imagenPath}" alt="${detalle}" 
                        onerror="this.onerror=null; this.src='/images/productos/placeholder.png';">
                    <h3>${detalle}</h3>
                    <h3>$ ${precioFinal}</h3>
                    <button onclick="añadirAlCarrito('${detalle}', ${precioFinal.replace(/\./g, "")})">
                        Añadir al Carrito
                    </button>
                `;

                productosContainer.appendChild(productoDiv);
            });

        } catch (error) {
            console.error("Error al cargar el archivo Excel:", error);
        }
    }

    // Recuperar carrito al cargar la página
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
    cargarExcel();
    window.añadirAlCarrito = añadirAlCarrito; // Exponer función globalmente
});




