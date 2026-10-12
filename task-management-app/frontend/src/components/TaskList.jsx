
export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-tasks">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Add your first task and start making progress!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-item" key={task._id}>
          <label className="task-label">
            <input
              type="checkbox"
              checked={Boolean(task.completed)}
              onChange={() => onToggleTask(task)}
            />

            <span className={task.completed ? "done" : ""}>
              {task.title}
            </span>
          </label>

          <div className="task-details">
            <span
              className={`priority ${(task.priority || "Medium").toLowerCase()}`}
            >
              {task.priority || "Medium"}
            </span>

            {task.dueDate && (
              <span className="due-date">
                Due: {String(task.dueDate).slice(0, 10)}
              </span>
            )}
          </div>

          <button
            type="button"
            className="delete"
            onClick={() => onDeleteTask(task._id)}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );
}
