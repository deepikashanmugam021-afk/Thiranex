
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  function handleAuth(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    setPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setPage("login");
  }

  if (token && user) {
    return (
      <Dashboard
        user={user}
        token={token}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-brand">TaskFlow</div>
        <p className="auth-subtitle">
          Organize your work. Achieve your goals.
        </p>

        <div className="auth-tabs">
          <button
            className={page === "login" ? "active" : ""}
            onClick={() => setPage("login")}
          >
            Login
          </button>
          <button
            className={page === "register" ? "active" : ""}
            onClick={() => setPage("register")}
          >
            Register
          </button>
        </div>

        {page === "login" ? (
          <Login onLogin={handleAuth} />
        ) : (
          <Register
            onRegister={handleAuth}
          />
        )}
      </div>
    </div>
  );
}
