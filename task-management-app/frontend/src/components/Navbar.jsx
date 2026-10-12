
export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        TaskFlow
      </a>

      <div className="navbar-right">
        <span className="navbar-user">
          Hi, {user?.name || user?.email || "User"}
        </span>

        <button
          type="button"
          className="navbar-logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
