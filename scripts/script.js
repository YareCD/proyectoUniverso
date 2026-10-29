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

// btn de movimiento para el sol
const btnSol = document.querySelector('#btnSol');
const imgSol = document.querySelector('#imgSol');

if (btnSol && imgSol) {
  btnSol.addEventListener('click', function () {
    imgSol.classList.toggle('mov');

    if (imgSol.classList.contains('mov')) {
      btnSol.querySelector('i').className = 'fa-solid fa-pause me-2';
      btnSol.querySelector('span').textContent = 'Detener movimiento';
    } else {
      btnSol.querySelector('i').className = 'fa-solid fa-play me-2';
      btnSol.querySelector('span').textContent = 'Ver el Sol en movimiento';
    }
  });
}

// mivimientos d elas fases de la luna
const luna = document.querySelector('#luna');
const fases = document.querySelectorAll('input[name="fase"]');
const descFase = document.querySelector('#descFase');

const textos = {
  nueva: 'Luna nueva: la cara iluminada mira hacia el Sol y casi no la vemos desde la Tierra.',
  creciente: 'Cuarto creciente: se ilumina poco a poco la mitad derecha en el hemisferio norte.',
  llena: 'Luna llena: la Tierra queda entre el Sol y la Luna, y vemos el disco completo.',
  menguante: 'Cuarto menguante: la luz va desapareciendo y queda iluminada la otra mitad.'
};

if (luna) {
  for (let i = 0; i < fases.length; i++) {
    fases[i].addEventListener('change', function () {
      luna.dataset.fase = this.value;
      descFase.textContent = textos[this.value];
    });
  }
}

// filtros para las curiosidades
const filtros = document.querySelectorAll('[data-filtro]');
const items = document.querySelectorAll('[data-cat]');

for (let i = 0; i < filtros.length; i++) {
  filtros[i].addEventListener('click', function () {

    for (let j = 0; j < filtros.length; j++) {
      filtros[j].classList.remove('btn-main');
      filtros[j].classList.add('btn-line');
    }
    this.classList.remove('btn-line');
    this.classList.add('btn-main');

    const filtro = this.dataset.filtro;

    for (let k = 0; k < items.length; k++) {
      if (filtro === 'todas' || items[k].dataset.cat === filtro) {
        items[k].classList.remove('d-none');
      } else {
        items[k].classList.add('d-none');
      }
    }
  });
}
