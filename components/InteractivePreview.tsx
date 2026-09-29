export default function InteractivePreview() {
  return (
    <div className="media-container" id="preview">
      <div
        className="product-film-card"
        role="button"
        tabIndex={0}
        aria-label="Play BlurGlass preview film"
      >
        <div className="product-film-overlay" />
        <div className="video-placeholder-content">
          <div className="play-button-visual">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </div>
          <div className="film-info-wrap">
            <span className="film-placeholder-title">See BlurGlass in Action</span>
            <span className="film-placeholder-sub">Watch 1-minute demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
