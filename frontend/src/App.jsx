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
      setIsAdmin(false);
    }
  });



  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsAdmin(false);
    window.location.href = '/login';
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

        

        
      `}</style>

      {settings() && (
        <style>
          {`body { background-image: url('${settings().background_image}'); }`}
        </style>
      )}

      

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
        <RegularView media={media} settings={settings} onToggleView={token() ? () => setIsAdmin(true) : () => {}} />
      )}
    </div>
  );
}



export default App;
