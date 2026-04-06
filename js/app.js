let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";
let dragId = null;

const searchInput = document.getElementById("search");

// ADICIONAR
function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;
  const dueTime = document.getElementById("dueTime").value;

  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    done: false,
    createdAt: new Date().toLocaleString(),
    category,
    priority,
    dueDate,
    dueTime
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// TOGGLE
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );

  saveTasks();
  renderTasks();
}

// DELETAR
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// EDITAR (texto + prazo)
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt("Editar tarefa:", task.text);
  if (newText === null) return;

  const newDate = prompt("Nova data (AAAA-MM-DD, vazio mantém)", task.dueDate || "");
  if (newDate === null) return;

  const newTime = prompt("Novo horário (HH:MM, vazio mantém)", task.dueTime || "");
  if (newTime === null) return;

  tasks = tasks.map(t =>
    t.id === id
      ? {
          ...t,
          text: newText.trim() || t.text,
          dueDate: newDate.trim() || t.dueDate,
          dueTime: newTime.trim() || t.dueTime
        }
      : t
  );

  saveTasks();
  renderTasks();
}

// FILTRO
function filterTasks(type) {
  filter = type;
  renderTasks();
}

// SALVAR
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// CONTADOR
function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;

  document.getElementById("counter").innerText =
    `Total: ${total} | Concluídas: ${done} | Pendentes: ${pending}`;
}

// RENDER
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks;
  const search = searchInput.value.toLowerCase();

  if (search) {
    filtered = filtered.filter(t => t.text.toLowerCase().includes(search));
  }

  if (filter === "active") {
    filtered = filtered.filter(t => !t.done);
  } else if (filter === "done") {
    filtered = filtered.filter(t => t.done);
  }

  if (filtered.length === 0) {
    list.innerHTML = `<p>Nenhuma tarefa encontrada.</p>`;
    updateCounter();
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.classList.add(task.priority);
    li.setAttribute("draggable", "true");
    li.dataset.id = task.id;

    li.innerHTML = `
      <div>
        <strong class="${task.done ? "done" : ""}" onclick="toggleTask(${task.id})">
          ${task.text}
        </strong>
        <p>🗓️ Criada: ${task.createdAt}</p>
        <p>📅 Prazo: ${task.dueDate || "—"} ${task.dueTime || ""}</p>
        <p>🏷️ ${task.category}</p>
        <p>⭐ ${task.priority}</p>
      </div>
      <div>
        <button onclick="editTask(${task.id})">
          <i class="fas fa-pen"></i>
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);
    li.addEventListener("dragend", handleDragEnd);

    list.appendChild(li);
  });

  updateCounter();
}

// DRAG & DROP
function handleDragStart(e) {
  dragId = e.currentTarget.dataset.id;
  e.dataTransfer.effectAllowed = "move";
  e.currentTarget.classList.add("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  e.currentTarget.classList.add("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  const targetId = e.currentTarget.dataset.id;
  if (!dragId || dragId === targetId) return;

  reorderTasks(dragId, targetId);
  renderTasks();
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  document
    .getElementById("taskList")
    .querySelectorAll(".drag-over")
    .forEach(el => el.classList.remove("drag-over"));
  dragId = null;
}

function reorderTasks(sourceId, targetId) {
  const fromIndex = tasks.findIndex(t => t.id == sourceId);
  const toIndex = tasks.findIndex(t => t.id == targetId);
  if (fromIndex === -1 || toIndex === -1) return;

  const [moved] = tasks.splice(fromIndex, 1);
  tasks.splice(toIndex, 0, moved);
  saveTasks();
}

// TEMA
function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

// CARREGAR TEMA
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// ENTER
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// INICIAR
renderTasks();
