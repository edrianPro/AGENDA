let d = document;
let arrNombre = [];
let arrCorreo = [];
let arrTelefono = [];

window.addEventListener('load', function (e) {
  cargarContactos();
  verContactos();
});

window.addEventListener('click', function (e) {
  e.preventDefault();
});

function agregarContacto() {
  let getNombre = d.querySelector('#nombre');
  let getCorreo = d.querySelector('#correo');
  let getTelefono = d.querySelector('#telefono');

  arrNombre.push(getNombre.value);
  arrCorreo.push(getCorreo.value);
  arrTelefono.push(getTelefono.value);

  let conf = window.confirm('Deseas agregar otro contacto?');
  //cambia esto en tu codigo y listo
  if (conf == true ) { //<----- solo la parte del if
    getNombre.value = '';
    getCorreo.value = '';
    getTelefono.value = '';
    guardarContacto();
  } else {
    //alert('Solo se pueden ingresar 3 contactos');
    getNombre.value = '';
    getCorreo.value = '';
    getTelefono.value = '';
    cargarContactos();
    verContactos();
  }
}

function guardarContacto() {
  localStorage.setItem('nombresLS', arrNombre);
  localStorage.setItem('numerosLS', arrCorreo);
  localStorage.setItem('correosLS', arrTelefono);
}

function cargarContactos() {
  if (localStorage.length > 0) {
    arrNombre = localStorage.getItem('nombresLS');
    arrCorreo = localStorage.getItem('numerosLS');
    arrTelefono = localStorage.getItem('correosLS');

    arrNombre = arrNombre.split(',');
    arrCorreo = arrCorreo.split(',');
    arrTelefono = arrTelefono.split(',');
  } else {
    arrNombre = [];
    arrCorreo = [];
    arrTelefono = [];
  }
}

function verContactos() {
  const containerContacto = d.querySelector('#contacto');

  for (let i = 0; i < arrNombre.length; i++) {
    const element = arrNombre[i];
    containerContacto.innerHTML += `
     <div>
        <i class="far fa-edit editar" onclick="editarContacto()"></i>
      </div>
      <div class="datos--container">
        <p id="nome">Nombre: ${arrNombre[i]}</p>
        <p id="nume">Número: ${arrTelefono[i]}</p>
        <p id="core">Correo: ${arrCorreo[i]}</p>
      </div>
     `;
  }
}

function buscarContacto() {
  let busqueda = prompt('cual es el nombre del contactos?');
  let indiceBusqueda = arrNombre.indexOf(busqueda);

  console.log(indiceBusqueda);
  if (indiceBusqueda >= 0) {
    alert(`
    Nombre: ${arrNombre[indiceBusqueda]}
    Numero: ${arrTelefono[indiceBusqueda]}
    Correo: ${arrCorreo[indiceBusqueda]}  
    `);
  } else {
    alert('No se encontraron resultados');
  }
}

function editarContacto() {
  let busqueda = prompt('Nombre del contacto que deseas editar?');
  let indiceBusqueda = arrNombre.indexOf(busqueda);

  if (indiceBusqueda >= 0) {
    let nuevoNombre = prompt('Cual es el nombre?');
    let nuevoNumero = prompt('Cual es el numero?');
    let nuevoCorreo = prompt('Cual es correo?');

    arrNombre[indiceBusqueda] = nuevoNombre;
    arrTelefono[indiceBusqueda] = nuevoNumero;
    arrCorreo[indiceBusqueda] = nuevoCorreo;
    guardarContacto();
    window.location.reload();
  } else {
    alert('No se encontraron resultados');
  }
}
