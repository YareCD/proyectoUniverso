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


const form = document.querySelector('#formContacto');

if (form) {
  const nombre = document.querySelector('#nombre');
  const correo = document.querySelector('#correo');
  const motivo = document.querySelector('#motivo');
  const temas = document.querySelectorAll('input[name="temas"]');
  const errTemas = document.querySelector('#errTemas');
  const mensaje = document.querySelector('#mensaje');
  const contador = document.querySelector('#contador');
  const enviados = document.querySelector('#enviados');
  const lista = document.querySelector('#lista');

  // erroress
  function marcar(campo, ok, texto) {
    const fb = campo.parentElement.querySelector('.invalid-feedback');

    if (ok) {
      campo.classList.remove('is-invalid');
      campo.classList.add('is-valid');
      fb.textContent = '';
    } else {
      campo.classList.remove('is-valid');
      campo.classList.add('is-invalid');
      fb.textContent = texto;
    }
    return ok;
  }

  function validarNombre() {
    const valor = nombre.value.trim();
    const letras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,60}$/;

    if (valor === '') {
      return marcar(nombre, false, 'Escribe tu nombre completo.');
    }
    if (!letras.test(valor)) {
      return marcar(nombre, false, 'Solo letras y espacios (mínimo 3 caracteres).');
    }
    return marcar(nombre, true, '');
  }

  function validarCorreo() {
    const valor = correo.value.trim();
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (valor === '') {
      return marcar(correo, false, 'Escribe tu correo electrónico.');
    }
    if (!formato.test(valor)) {
      return marcar(correo, false, 'El formato del correo no es válido.');
    }
    return marcar(correo, true, '');
  }

  function validarMotivo() {
    if (motivo.value === '') {
      return marcar(motivo, false, 'Elige qué te gustaría saber.');
    }
    return marcar(motivo, true, '');
  }

  function validarTemas() {
    let hayUno = false;
    for (let i = 0; i < temas.length; i++) {
      if (temas[i].checked) {
        hayUno = true;
      }
    }

    if (hayUno) {
      errTemas.classList.remove('d-block');
    } else {
      errTemas.classList.add('d-block');
    }
    return hayUno;
  }

  // valiadadcion de mensajes
  function validarMensaje() {
    const largo = mensaje.value.trim().length;

    if (largo === 0) {
      mensaje.classList.remove('is-invalid');
      mensaje.classList.remove('is-valid');
      return true;
    }
    if (largo < 10) {
      return marcar(mensaje, false, 'Si escribes un mensaje, que tenga al menos 10 caracteres.');
    }
    return marcar(mensaje, true, '');
  }

  nombre.addEventListener('input', validarNombre);
  correo.addEventListener('input', validarCorreo);
  motivo.addEventListener('change', validarMotivo);

  for (let i = 0; i < temas.length; i++) {
    temas[i].addEventListener('change', validarTemas);
  }

  mensaje.addEventListener('input', function () {
    contador.textContent = mensaje.value.length + '/300';
    validarMensaje();
  });

  function alerta(icono, titulo, texto) {
    if (window.Swal) {
      Swal.fire({
        icon: icono,
        title: titulo,
        text: texto,
        background: '#14113a',
        color: '#ecebf8',
        confirmButtonColor: '#9a6bff'
      });
    } else {
      alert(titulo + ' - ' + texto);
    }
  }

}
