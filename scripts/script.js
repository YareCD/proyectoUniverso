// animaciones al hacer scroll (AOS)
if (window.AOS) {
  AOS.init({ duration: 800, once: true });
}

// año del footer
const anio = document.querySelector('#anio');
if (anio) {
  anio.textContent = new Date().getFullYear();
}
