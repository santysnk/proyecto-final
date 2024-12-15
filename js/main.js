
function añadirAlCarrito(producto) {
  alert(`${producto} ha sido añadido al carrito.`);
}

document.addEventListener("DOMContentLoaded", () => {
  const texts = [
    {
      id: "typed-text",
      text: "Descubre la línea de celulares diseñada para potenciar tu productividad, mantenerte conectado y disfrutar de la mejor tecnología."
    },
    {
      id: "typed-text2",
      text: "Explora nuestra selección de accesorios de alta calidad, diseñados para llevar tu experiencia de streaming al siguiente nivel."
    },
    {
      id: "typed-text3",
      text: "Encuentra el modelo perfecto para hacer de tus momentos inolvidables una experiencia única, con la mejor calidad de imagen y el sonido más impresionante del mercado."
    }
  ];

  const isTyping = {}; // Objeto para rastrear si el efecto de tipeo está en ejecución

  function typeWriter(id, text) {
    if (isTyping[id]) return; // Evita múltiples ejecuciones simultáneas
    isTyping[id] = true;

    const element = document.getElementById(id);
    element.innerHTML = ""; // Limpia siempre antes de iniciar el tipeo
    let i = 0; // Reinicia el progreso de tipeo

    function write() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(write, 20); // Velocidad del efecto de tipeo
      } else {
        isTyping[id] = false; // Marca la animación como finalizada
      }
    }

    element.classList.replace("hidden", "visible"); // Hace visible el texto
    write();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const targetText = texts.find((t) => t.id === targetId)?.text;
          if (targetText) {
            typeWriter(targetId, targetText); // Inicia el efecto de tipeo
          }
        }
      });
    },
    { threshold: 0.5 } // Ejecuta cuando al menos el 50% del texto sea visible
  );

  // Aplica el observador a cada texto
  texts.forEach(({ id }) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("hidden"); // Inicialmente oculto
      observer.observe(element);
    }
  });
});
