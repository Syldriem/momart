import { createSignal } from "solid-js";
import MediaGrid from "./MediaGrid";

const API_BASE = "http://localhost:8080/api";

function AdminView({ media, settings, token, onToggleView }) {
  const [uploading, setUploading] = createSignal(false);
  const [backgroundImage, setBackgroundImage] = createSignal(
    settings()?.background_image || ""
  );
  const [aboutText, setAboutText] = createSignal(settings()?.about_text || "");
  const [socialLinks, setSocialLinks] = createSignal(
    settings()?.social_links || "{}"
  );

  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/admin/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      });

      if (response.ok) {
        window.location.reload(); // Refresh to show new media
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const updateSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({
          background_image: backgroundImage(),
          about_text: aboutText(),
          social_links: socialLinks(),
        }),
      });

      if (response.ok) {
        alert("Settings updated!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div class="admin-view">
      <style>{`
        .admin-view {
          padding: 20px;
          background: rgba(255, 255, 255, 0.95);
          min-height: 100vh;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .admin-section {
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .admin-section h2 {
          margin-bottom: 15px;
          color: #333;
        }

        .upload-area {
          border: 2px dashed #ddd;
          padding: 40px;
          text-align: center;
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.3s;
        }

        .upload-area:hover {
          border-color: #007bff;
        }

        .settings-form {
          display: grid;
          gap: 15px;
        }

        .settings-form input,
        .settings-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }
      `}</style>

      <div class="admin-header">
        <h1>Admin Panel</h1>
        <button class="btn btn-secondary" onClick={onToggleView}>
          Preview Site
        </button>
      </div>

      <div class="admin-section">
        <h2>Upload Media</h2>
        <div
          class="upload-area"
          onClick={() => document.getElementById("file-input").click()}
        >
          {uploading() ? (
            <p>Uploading...</p>
          ) : (
            <p>Click to upload images or videos</p>
          )}
          <input
            id="file-input"
            type="file"
            accept="image/*,video/*"
            style="display: none"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) uploadFile(file);
            }}
          />
        </div>
      </div>

      <div class="admin-section">
        <h2>Site Settings</h2>
        <div class="settings-form">
          <input
            type="url"
            placeholder="Background Image URL"
            value={backgroundImage()}
            onInput={(e) => setBackgroundImage(e.target.value)}
          />
          <textarea
            placeholder="About Text"
            rows="4"
            value={aboutText()}
            onInput={(e) => setAboutText(e.target.value)}
          />
          <textarea
            placeholder="Social Links (JSON format)"
            rows="3"
            value={socialLinks()}
            onInput={(e) => setSocialLinks(e.target.value)}
          />
          <button class="btn btn-primary" onClick={updateSettings}>
            Update Settings
          </button>
        </div>
      </div>

      <div class="admin-section">
        <h2>Media Gallery</h2>
        <MediaGrid media={media} isAdmin={true} />
      </div>
    </div>
  );
}

export default AdminView;
