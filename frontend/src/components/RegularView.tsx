import MediaGrid from "./MediaGrid";
import Navigation from "./Navigation";

function RegularView({ media, settings }) {
  return (
    <div class="regular-view">
      <style>{`
        .regular-view {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-section {
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
        }

        .hero-content {
          text-align: center;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          padding: 40px;
          border-radius: 10px;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .media-section {
          flex: 1;
          padding: 40px 20px;
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>

      <div class="hero-section">
        <div class="hero-content">
          <h1>My Art Portfolio</h1>
          <Navigation settings={settings} />
        </div>
      </div>

      <div class="media-section">
        <MediaGrid media={media} />
      </div>
    </div>
  );
}

export default RegularView;
