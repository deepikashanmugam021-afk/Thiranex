
import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
    });

    setTitle("");
    setPriority("Medium");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        required
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low priority</option>
        <option value="Medium">Medium priority</option>
        <option value="High">High priority</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">+ Add Task</button>
    </form>
  );
}
