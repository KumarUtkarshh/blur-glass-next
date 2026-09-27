export default function InteractivePreview() {
  return (
    <div className="media-container" id="preview">
      <div className="product-film-card">
        <div className="video-placeholder-content">
          <div className="play-button-visual">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </div>
          <span className="film-placeholder-title">Product Film</span>
        </div>
      </div>
    </div>
  );
}
