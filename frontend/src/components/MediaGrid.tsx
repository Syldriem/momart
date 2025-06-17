import { For } from "solid-js";

function MediaGrid({ media, isAdmin = false }) {
  return (
    <div class="media-grid">
      <style>{`
        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px 0;
        }

        .media-item {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s;
        }

        .media-item:hover {
          transform: translateY(-5px);
        }

        .media-item img,
        .media-item video {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .admin-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 0, 0, 0.8);
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>

      <For each={media() || []}>
        {(item) => (
          <div class="media-item">
            {item.type === "image" ? (
              <img
                src={`http://localhost:8080${item.url}`}
                alt={item.filename}
              />
            ) : (
              <video
                src={`http://localhost:8080${item.url}`}
                controls
                preload="metadata"
              />
            )}
            {isAdmin && (
              <button class="admin-overlay" onClick={() => deleteMedia(item.id)}>
                Delete
              </button>
            )}
          </div>
        )}
      </For>
    </div>
  );
}

export default MediaGrid;
