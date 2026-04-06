import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function addTask() {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      done: false
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

function toggleTask(id) {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  ));
}

  return (
    <div style={{ padding: "20px" }}>
      <h1>TaskFlow 🚀</h1>

      <input
        type="text"
        placeholder="Digite uma tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTask}>Adicionar</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;