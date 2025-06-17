function Navigation({ settings }) {
  const parseLinks = () => {
    try {
      return JSON.parse(settings()?.social_links || "{}");
    } catch {
      return {};
    }
  };

  return (
    <div class="navigation">
      <style>{`
        .navigation {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          transition: background 0.3s;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .about-text {
          max-width: 600px;
          margin: 20px auto;
          line-height: 1.6;
        }
      `}</style>

      <a href="#about" class="nav-link">
        About Me
      </a>

      {Object.entries(parseLinks()).map(([name, url]) => (
        <a href={url} target="_blank" class="nav-link">
          {name}
        </a>
      ))}

      {settings()?.about_text && (
        <div class="about-text">
          <p>{settings().about_text}</p>
        </div>
      )}
    </div>
  );
}

export default Navigation;

