// obteniendo boton principal
const btnMain = document.getElementById("btn-new-task-main");
// contenedor del las tareas
const containerTask = document.getElementById("container-tasks");

// div cuadros emergentes con modal
const modal = document.getElementById("modal");
const newTaskContainer = document.getElementById("new-task-container");
const confirmation = document.getElementById("confirmation");

// task title date description form
const containerForm = document.getElementById("container-form");
const closeForm = document.getElementById("close-form");

const title = document.getElementById("input-title");
const date = document.getElementById("input-fecha");
const description = document.getElementById("input-description");
const btnNewTask = document.getElementById("btn-new-task");

// confirmation buttons
const cancelar = document.getElementById("cancelar");
const confirmar = document.getElementById("confirmar");

// verificando en memoria si tiene tareas

let tasks = JSON.parse(localStorage.getItem("data")) || [];


const addOrUpdateTask = () => {
    let currentTask = {
        id: Date.now(),
        titulo: title.value,
        fecha: date.value,
        descripcion: description.value,
    };

    tasks.push(currentTask);
    localStorage.setItem("data", JSON.stringify(tasks));

};

// mostrando todo lo que tiene en localstorage

const UpdateTasks = () => {
    containerTask.innerHTML = "";
    tasks.forEach(({ id, titulo, fecha, descripcion }) => {
        containerTask.innerHTML += `
    <div
                    class="mb-3 bg-slate-300 flex flex-col justify-between min-h-36 sm:w-3/4 rounded border border-black gap-y-5"
                    id="${id}"
                >
                    <p class="font-semibold break-words ml-2 text-justify">
                        Titulo:<span class="font-normal">${titulo}</span>
                    </p>
                    <p class="font-semibold break-words ml-2">
                        Fecha: <span class="font-normal">${fecha}</span>
                    </p>
                    <p class="font-semibold break-words ml-2">
                        Descripción:<span class="font-normal">${descripcion}</span
                        >
                    </p>
                    <div class="flex flex-wrap justify-around w-full mb-2">
                        <button
                            class="bg-slate-600 hover:bg-slate-800 text-white rounded-full font-medium border border-black px-3 py-1"
                        >
                            Delete
                        </button>
                        <button
                            class="bg-slate-600 hover:bg-slate-800 text-white rounded-full font-medium border border-black px-3 py-1"
                        >
                            Editar
                        </button>
                        <button
                            class="bg-slate-600 hover:bg-slate-800 text-white rounded-full font-medium border border-black px-3 py-1"
                        >
                            Completar
                        </button>
                    </div>
                </div>
    `;
    });
};

 UpdateTasks();

const cierreDeVentana = () => {
    modal.classList.add("hidden");
    newTaskContainer.classList.add("hidden");
    title.value = "";
    date.value = "";
    description.value = "";
};

const mostrarVentana = () => {
    modal.classList.remove("hidden");
    newTaskContainer.classList.remove("hidden");
};

// Abrir formulario
btnMain.addEventListener("click", () => {
    mostrarVentana();
});

// cerrar formulario ventana emergente
closeForm.addEventListener("click", () => {
    if (title.value === "" && date.value === "" && description.value === "") {
        cierreDeVentana();
    } else {
        modal.classList.remove("z-10");
        modal.classList.add("z-20");
        confirmation.classList.remove("hidden");

        // Ventana emergente de confirmacion
        confirmar.addEventListener("click", () => {
            title.value = "";
            date.value = "";
            description.value = "";
            modal.classList.remove("z-20");
            modal.classList.add("z-10");
            confirmation.classList.add("hidden");
            cierreDeVentana();
        });
        cancelar.addEventListener("click", () => {
            modal.classList.remove("z-20");
            modal.classList.add("z-10");
            confirmation.classList.add("hidden");
        });
    }
});

containerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addOrUpdateTask();
    cierreDeVentana();
});
