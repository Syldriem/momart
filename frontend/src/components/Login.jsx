
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

const API_BASE = "http://localhost:8080/api";

function Login() {
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  const login = async (password) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(password());
  };

  return (
    <div class="login-container">
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
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .login-form {
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
    </div>
  );
}

export default Login;
