document.addEventListener("DOMContentLoaded", function () {
    const taskContainer = document.getElementById("task-container");
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");

    function addTask() {
        const taskContent = taskInput.value.trim();
        if (taskContent !== "") {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskItem.innerHTML = `
                <div class="task-content" contenteditable="true">${taskContent}</div>
                <div class="task-actions">
                    <button class="complete-btn">Completar</button>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            `;
            taskContainer.appendChild(taskItem);
            taskInput.value = "";
        }
    }

    function updateTask(taskContent, newContent) {
        taskContent.textContent = newContent.trim();
    }

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    taskContainer.addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("complete-btn")) {
            const taskContent = target.parentElement.previousElementSibling;
            taskContent.classList.toggle("completed");
        } else if (target.classList.contains("edit-btn")) {
            const taskContent = target.parentElement.previousElementSibling;
            taskContent.contentEditable = true;
            taskContent.focus();
        } else if (target.classList.contains("delete-btn")) {
            const taskItem = target.parentElement.parentElement;
            taskItem.remove();
        }
    });

    // Detectar el evento de pérdida de foco en el contenido editable para guardar los cambios
    taskContainer.addEventListener("blur", function (event) {
        const target = event.target;
        if (target.classList.contains("task-content")) {
            target.contentEditable = false;
            updateTask(target, target.textContent);
        }
    }, true); // Captura el evento en la fase de burbujeo para garantizar que se maneje después del evento de clic

    taskContainer.addEventListener("keydown", function (event) {
        const target = event.target;
        if (event.key === "Enter" && target.classList.contains("task-content")) {
            event.preventDefault(); // Evita que se realice la acción predeterminada (salto de línea)
            target.blur(); // Pierde el foco para que se active el evento blur y se actualice la tarea
        }
    });
});
