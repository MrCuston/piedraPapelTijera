
/////////////////////////
// Comienzo de partida //
/////////////////////////
let contadorPartidas = 0; // Inicializar el contador de partidas

function validarForm() {
  var nombre = document.getElementsByName("nombre")[0].value;
  var expRegNombre = /^[^0-9]{3,}$/; // validar que el nombre tenga al menos 3 caracteres y no empiece por un número
  var partidas = document.getElementsByName("partidas")[0].value;

  if (!expRegNombre.test(nombre)) {
    alert("El campo nombre debe tener al menos 3 caracteres y no puede empezar por un número.");
    document.getElementsByName("nombre")[0].style.backgroundColor = "red"; // Cambiar el fondo a rojo
  } else {
    document.getElementsByName("nombre")[0].style.backgroundColor = ""; // Elimina el fondo rojo si el nombre es válido
    document.getElementsByName("nombre")[0].disabled = true; // Desactivar el campo nombre
  }

  if (partidas <= 0) {
    alert("La cantidad de partidas debe ser mayor a 0.");
    document.getElementsByName("partidas")[0].style.backgroundColor = "red"; // Cambiar el fondo a rojo
  } else {
    document.getElementsByName("partidas")[0].style.backgroundColor = ""; // Elimina el fondo rojo si la cantidad de partidas es válida
    document.getElementsByName("partidas")[0].disabled = true; // Desactivar el campo partidas
    contadorPartidas = parseInt(partidas); // Actualizar el contador de partidas
    document.getElementById("total").innerHTML = contadorPartidas; // Volcar el valor introducido en el <span> "total"
  }

  if (expRegNombre.test(nombre) && partidas > 0) {
    return true; // Envía el formulario si todos los campos son válidos
  } else {
    return false; // Evita que el formulario se envíe si algún campo no es válido
  }
}

//Trigger para disparar la función de validación
document.querySelector('button').addEventListener('click', function() {
  // Aquí llamas a la función de validación
  validarForm();
});



///////////////////////
// Elección y tirada //
///////////////////////

// Seleccionar todas las imágenes dentro del contenedor del "jugador"
const opcionesJugador = document.getElementById('jugador').querySelectorAll('img');

// Iterar sobre las imágenes y agregar un event listener para el clic
opcionesJugador.forEach((opcion) => {
  opcion.addEventListener('click', () => {
    // Remover la clase "seleccionado" de todas las imágenes
    opcionesJugador.forEach((elemento) => {
      elemento.classList.remove('seleccionado');
      elemento.classList.add('noSeleccionado');
    });

    // Agregar la clase "seleccionado" a la imagen seleccionada
    opcion.classList.remove('noSeleccionado');
    opcion.classList.add('seleccionado');
  });
});

//////////////////////////////////////
// Este array no se puede modificar //
//////////////////////////////////////
// Array de posibilidades ////////////
var posibilidades = ["piedraOrdenador.png", "papelOrdenador.png", "tijeraOrdenador.png"];

// Variables de los botones
const botonYa = document.getElementById('botonYa');
const maquina = document.getElementById('maquina');
const contador = document.getElementById('actual');
const botonReset = document.getElementById('reset');

// Event listener para el botón "¡YA!"
botonYa.addEventListener('click', () => {
});

// Función para generar una opción aleatoria
function generarOpcionAleatoria() {
  const opcionAleatoria = posibilidades[Math.floor(Math.random() * posibilidades.length)];
  const opcionMaquina = "img/" + opcionAleatoria;
  console.log(opcionAleatoria);
  return opcionMaquina; 
}

// Mostrar la imagen aleatoria
botonYa.addEventListener('click', () => {
  const opcionMaquina = generarOpcionAleatoria();
  maquina.querySelector('img').src = opcionMaquina;
  //incremento de contador
  contador.textContent = parseInt(contador.textContent) + 1;
});

// Función para obtener la selección del jugador y darle un valor
function obtenerSeleccionJugador() {
  let opcionSeleccionada = -1; // Valor por defecto si ninguna opción está seleccionada
  document.getElementById('jugador').querySelectorAll('img').forEach((opcion, index) => {
    if (opcion.classList.contains('seleccionado')) {
      if (index === 0) {
        opcionSeleccionada = 0;
      } else if (index === 1) {
        opcionSeleccionada = 1;
      } else if (index === 2) {
        opcionSeleccionada = 2;
      } 
    }
  });
  return opcionSeleccionada;
}

// Función para comparar las selecciones del jugador y de la máquina
function compararPiedraPapelTijera(opcionSeleccionada, opcionMaquina) {
  let nombre = document.getElementsByName("nombre")[0].value;
  let indexJugador = opcionSeleccionada;
  let indexMaquina = posibilidades.indexOf(opcionMaquina);
  console.log(opcionSeleccionada);
  let resultado;

  if (indexJugador === indexMaquina) {
    resultado = "empate"; // Si los índices son iguales, es un empate
  } else if ((indexJugador === 0 && indexMaquina === 2) || (indexJugador === 1 && indexMaquina === 0) || (indexJugador === 2 && indexMaquina === 1)) {
    resultado = "Ganaste " + nombre; // Si el jugador gana, devuelve "Ganaste"
  } else {
    resultado = "Gana la máquina"; // Si la máquina gana, devuelve "Perdiste"
  }

  return resultado;
}

///////////////////////////
// Historial de partidas //
///////////////////////////

// Event listener para el botón "¡YA!"
botonYa.addEventListener('click', () => {
  // Obtener la selección del jugador
  let opcionJugador = obtenerSeleccionJugador();

  // Generar una opción aleatoria para la máquina
  const opcionMaquina = posibilidades[Math.floor(Math.random() * posibilidades.length)];

  // Comparar los resultados
  let resultado = compararPiedraPapelTijera(opcionJugador, opcionMaquina);

  // Mostrar el resultado en el historial de partidas en HTML
  const historial = document.getElementById('historial');
  const nuevoResultado = document.createElement('p');
  nuevoResultado.textContent = resultado;
  historial.appendChild(nuevoResultado);
  
});

// Event listener para el botón "RESET"
botonReset.addEventListener('click', () => {
  resetearPartida();
});

function resetearPartida() {
  // Mostrar el mensaje "Nueva partida"
  alert("Nueva partida");

  // Resetear los campos "Nombre" y "Partidas"
  document.getElementsByName('nombre')[0].value = ""; // Restablecer el campo "nombre"
  document.getElementsByName('partidas')[0].value = "0"; // Restablecer el campo "partidas"

  // Desbloquear los campos "Nombre" y "Partidas"
  document.getElementsByName('nombre')[0].removeAttribute('disabled');
  document.getElementsByName('partidas')[0].removeAttribute('disabled');

  // Volver a poner a 0 los contadores de partidas "actual" y "total"
  document.getElementById('actual').innerText = "0";
  document.getElementById('total').innerText = "0";

  // Pondrá la imagen por defecto en la opción de la máquina
  document.getElementById('imagenMaquina').src = "img/defecto.png";

  // Añadir mensaje de partida nueva en el "historial"
  const historial = document.getElementById('historial');
  const nuevaPartida = document.createElement('p');
  nuevaPartida.textContent = "Nueva partida";
  historial.appendChild(nuevaPartida);
}










  




