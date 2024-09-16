//Creación de tooltip

// Tener acceso al tooltip y al tiempo
let tooltip;
let timer;

// Seleccionar todos los elementos que tienen el atributo data-tooltip
document.querySelectorAll("[data-tooltip]").forEach((element) => {
  // "Escuchar" cuando el mouse pasa por el elemento que contiene el data-tooltip
  element.addEventListener("mouseenter", function () {
    // Ejecutar las tareas después de 300ms
    timer = setTimeout(() => {
      // Crear el tooltip y agregarle la clase para los estilos
      tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      // Añadir el texto relacionado al atributo data-tooltip
      tooltip.textContent = this.getAttribute("data-tooltip");
      // Añadir el tooltip al documento
      element.appendChild(tooltip);

      // Hacer el tooltip visible
      tooltip.classList.add("tooltip-visible");
    }, 300);
  });

  // "Escuchar" cuando se quita el mouse
  element.addEventListener("mouseleave", function () {
    // Cancelar el temporizador si el cursor sale del elemento antes de los 300ms
    clearTimeout(timer);

    // Si el tooltip está activo cuando se remueve el mouse
    if (tooltip) {
      // Quitar la clase visible para desaparecer el tooltip
      tooltip.classList.remove("tooltip-visible");
      // Espera a que termine la transición para eliminar el Tooltip del DOM
      tooltip.addEventListener("transitionend", () => {
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      });
    }
  });
});
