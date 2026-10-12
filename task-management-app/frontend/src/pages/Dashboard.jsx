
import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard({ user, token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved tasks from the backend
  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load tasks");
      }

      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      setError(
        "Tasks load ஆகவில்லை. Backend API route-ஐ check செய்யவும்."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  // Add a new task
  async function addTask(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title enter செய்யவும்.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            priority,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add task");
      }

      setTitle("");
      setDescription("");
      setPriority("Medium");
      await loadTasks();
    } catch (err) {
      setError(err.message || "Task add செய்ய முடியவில்லை.");
    }
  }

  // Mark a task as completed
  async function toggleTask(task) {
    const taskId = task._id || task.id;

    try {
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !task.completed,
            status: !task.completed ? "Completed" : "Pending",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Task update API-ஐ check செய்யவும்.");
      }

      await loadTasks();
    } catch (err) {
      setError(err.message || "Task update செய்ய முடியவில்லை.");
    }
  }

  // Delete a task
  async function deleteTask(task) {
    const taskId = task._id || task.id;

    if (!window.confirm("இந்த task-ஐ delete செய்ய வேண்டுமா?")) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Task delete API-ஐ check செய்யவும்.");
      }

      await loadTasks();
    } catch (err) {
      setError(err.message || "Task delete செய்ய முடியவில்லை.");
    }
  }

  const completedTasks = tasks.filter(
    (task) =>
      task.completed === true || task.status === "Completed"
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="taskflow">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✓</span>
          TaskFlow
        </div>

        <p className="menu-label">WORKSPACE</p>
        <div className="menu-item active">▦ &nbsp; Dashboard</div>
        <div className="menu-item">☑ &nbsp; My Tasks</div>
        <div className="menu-item">◷ &nbsp; Overview</div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">
            {(user?.name || user?.username || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
          <div className="profile-info">
            <strong>{user?.name || user?.username || "User"}</strong>
            <span>TaskFlow Member</span>
          </div>
          <button
            className="logout-button"
            onClick={onLogout}
            title="Logout"
          >
            ↪
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace / Dashboard</span>
            <h1>My Dashboard</h1>
          </div>
          <div className="topbar-right">
            <span className="online-dot"></span>
            <span>My Workspace</span>
          </div>
        </header>

        <section className="welcome-banner">
          <div>
            <span className="welcome-label">YOUR PRODUCTIVITY SPACE</span>
            <h2>
              Welcome back,{" "}
              {user?.name || user?.username || "there"}! 👋
            </h2>
            <p>Plan your day, manage your tasks, and achieve more.</p>
          </div>
          <div className="banner-art">✦</div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">▦</div>
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
            <small>All your tasks</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <span>Completed</span>
            <h2>{completedTasks}</h2>
            <small>Tasks finished</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">◷</div>
            <span>Pending</span>
            <h2>{pendingTasks}</h2>
            <small>Tasks to complete</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">↗</div>
            <span>Progress</span>
            <h2>
              {tasks.length
                ? Math.round((completedTasks / tasks.length) * 100)
                : 0}%
            </h2>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    tasks.length
                      ? (completedTasks / tasks.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel add-panel">
            <div className="panel-heading">
              <div>
                <h3>➕ Create New Task</h3>
                <p>Add something you want to accomplish.</p>
              </div>
            </div>

            <form onSubmit={addTask}>
              <label>Task Title *</label>
              <input
                type="text"
                placeholder="e.g. Complete project report"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Description</label>
              <textarea
                placeholder="Add a few details about your task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />

              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <button className="add-task-button" type="submit">
                + Add Task
              </button>
            </form>
          </div>

          <div className="panel tasks-panel">
            <div className="panel-heading">
              <div>
                <h3>My Tasks</h3>
                <p>Your personal task list</p>
              </div>
              <span className="task-count">{tasks.length} tasks</span>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <div className="empty-state">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">☑</div>
                <h4>No tasks yet</h4>
                <p>Create your first task to get started!</p>
              </div>
            ) : (
              <div className="task-list">
                {tasks.map((task) => {
                  const isCompleted =
                    task.completed === true ||
                    task.status === "Completed";

                  return (
                    <div
                      className={`task-item ${
                        isCompleted ? "task-done" : ""
                      }`}
                      key={task._id || task.id}
                    >
                      <button
                        className={`task-check ${
                          isCompleted ? "checked" : ""
                        }`}
                        onClick={() => toggleTask(task)}
                        title="Toggle completion"
                      >
                        {isCompleted ? "✓" : ""}
                      </button>

                      <div className="task-details">
                        <h4>{task.title}</h4>
                        {task.description && (
                          <p>{task.description}</p>
                        )}
                        <div className="task-meta">
                          <span
                            className={`priority priority-${(
                              task.priority || "Medium"
                            ).toLowerCase()}`}
                          >
                            {task.priority || "Medium"} Priority
                          </span>
                          <span
                            className={`status ${
                              isCompleted ? "status-done" : ""
                            }`}
                          >
                            {isCompleted ? "Completed" : "Pending"}
                          </span>
                        </div>
                      </div>

                      <button
                        className="delete-task"
                        onClick={() => deleteTask(task)}
                        title="Delete task"
                      >
                        🗑
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <footer className="dashboard-footer">
          Made with ♥ &nbsp; TaskFlow — Organize. Focus. Achieve.
        </footer>
      </main>
    </div>
  );
}