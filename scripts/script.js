// animaciones al hacer scroll (AOS)
if (window.AOS) {
  AOS.init({ duration: 800, once: true });
}

// año del footer
const anio = document.querySelector('#anio');
if (anio) {
  anio.textContent = new Date().getFullYear();
}

const btnSubir = document.querySelector('#subir');
if (btnSubir) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btnSubir.classList.add('visible');
    } else {
      btnSubir.classList.remove('visible');
    }
  });

  btnSubir.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
