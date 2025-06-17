import { createSignal, createResource, onMount } from "solid-js";
import AdminView from "./components/AdminView";
import RegularView from "./components/RegularView";

const API_BASE = "http://localhost:8080/api";

function App() {
  const [isAdmin, setIsAdmin] = createSignal(false);
  const [token, setToken] = createSignal(localStorage.getItem("token") || "");

  const [media] = createResource(() =>
    fetch(`${API_BASE}/media`).then((res) => res.json())
  );

  const [settings] = createResource(() =>
    fetch(`${API_BASE}/settings`).then((res) => res.json())
  );

  onMount(() => {
    if (token()) {
      setIsAdmin(true);
    }
  });

  const login = async (password) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setIsAdmin(true);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return false;
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  return (
    <div class="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
        }

        .app {
          min-height: 100vh;
          position: relative;
        }

        .admin-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        .login-form {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 1001;
        }

        .login-form input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .login-form button {
          width: 100%;
          padding: 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>

      {settings() && (
        <style>
          {`body { background-image: url('${settings().background_image}'); }`}
        </style>
      )}

      {!isAdmin() && !token() && <LoginForm onLogin={login} />}

      {isAdmin() && (
        <button class="admin-toggle" onClick={logout}>
          Exit Admin
        </button>
      )}

      {!isAdmin() && token() && (
        <button class="admin-toggle" onClick={() => setIsAdmin(true)}>
          Admin View
        </button>
      )}

      {isAdmin() ? (
        <AdminView
          media={media}
          settings={settings}
          token={token}
          onToggleView={() => setIsAdmin(false)}
        />
      ) : (
        <RegularView media={media} settings={settings} />
      )}
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [password, setPassword] = createSignal("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(password());
  };

  return (
    <form class="login-form" onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default App;
