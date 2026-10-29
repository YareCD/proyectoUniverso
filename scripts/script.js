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

// contadoress
const numeros = document.querySelectorAll('[data-num]');

function contar(el) {
  const meta = Number(el.dataset.num);
  const dec = Number(el.dataset.dec) || 0;
  const paso = meta / 60;
  let actual = 0;

  const timer = setInterval(function () {
    actual = actual + paso;
    if (actual >= meta) {
      actual = meta;
      clearInterval(timer);
    }
    el.textContent = actual.toFixed(dec);
  }, 30);
}

function revisarNumeros() {
  for (let i = 0; i < numeros.length; i++) {
    const n = numeros[i];
    if (!n.dataset.listo && n.getBoundingClientRect().top < window.innerHeight) {
      n.dataset.listo = 'si';
      contar(n);
    }
  }
}

if (numeros.length > 0) {
  window.addEventListener('scroll', revisarNumeros);
  revisarNumeros();
}
