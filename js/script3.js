// ::::::::::::::::   DESAFIO TODO LIST ENRIQUE PAILLAVIL 24-06-2024  ::::::::::::::::://
const listaDeTareas = document.querySelector("#Tarea")
const tareaInput = document.querySelector("#nuevaTarea")
const tiempoInput = document.querySelector("#tiempoTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const tareaCantidadDiv = document.querySelector("#tareaCantidad")
const tareasCompletadasDiv = document.querySelector("#tareasCompletadas")
let contador=4;

// Tareas por defecto incluye la hora para ejecutar tarea //
const tareas = [
  {
    id: "1",
    descripción: "Levantarse",
    tiempo: "6:00",
    estado: false
  },
  {
    id: "2",
    descripción: "Ducharse",
    tiempo: "6:15",
    estado: false
  },
  {
    id: "3",
    descripción: "Hacer ejercicio",
    tiempo: "7:00",
    estado: false
  }
]

// Función para actualizar el HTML-basado en el ejemplo guia //
function rendertareas() {
    let html = "";
    for (let tarea of tareas) {
      html += `
        <li>
          <div class="tarea-grid">
            <div class="tarea-accion">
              <button onclick="borrar(${tarea.id})"><i class="fa-regular fa-trash-can"></i></button>
              <input type="checkbox" class="custom-checkbox" ${tarea.estado ? 'checked' : ''} onclick="toggleEstado(${tarea.id})">
            </div>
            <div class="tarea-id">${tarea.id}</div>
            <div class="tarea-descripcion">${tarea.descripción.slice(0, 20)}${tarea.descripción.length > 20 ? '...' : ''}</div> 
            <div class="tarea-tiempo">${tarea.tiempo}</div>
          </div>
        </li>
      `;
    }
    listaDeTareas.innerHTML = html;
    actualizarCantidadTareas();
    actualizarTareasCompletadas();
  }
// Función para actualizar la cantidad de tareas //
function actualizarCantidadTareas() {
    tareaCantidadDiv.textContent = `Cantidad de tareas: ${tareas.length}`
    tareaCantidadDiv.classList.add("cantidad-tareas")
  }
  
// Función para actualizar la cantidad de tareas completadas //
  function actualizarTareasCompletadas() {
    const tareasCompletadas = tareas.filter(tarea => tarea.estado).length
    tareasCompletadasDiv.textContent = `Tareas completadas: ${tareasCompletadas}`
    tareasCompletadasDiv.classList.add("tareas-completadas")
  }

btnAgregar.addEventListener("click", () => {
  const nuevaTarea = {
    id: generarIdConsecutivo(),
    descripción: tareaInput.value,
    tiempo: tiempoInput.value,
    estado: false
  }
  tareas.push(nuevaTarea)
  tareaInput.value = ""
  tiempoInput.value = ""
  rendertareas()
})

function borrar(id) {
  const index = tareas.findIndex((ele) => ele.id == id)
  tareas.splice(index, 1)
  rendertareas()
  var audio = new Audio('js/basura.mp3');
  audio.play();
}

function toggleEstado(id) {
  const tarea = tareas.find((ele) => ele.id == id)
  tarea.estado = !tarea.estado
  rendertareas()
  var audio = new Audio('js/success.mp3');
  audio.play();
}
// ver si se puede hacer como flecha
function generarIdConsecutivo() {
    return contador++;
  }

// Renderizar las tareas iniciales
rendertareas()