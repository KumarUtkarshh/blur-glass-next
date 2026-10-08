"use client";

export default function InteractivePreview() {
  return (
    <div className="media-container" id="preview">
      {/* Subtle ambient glow behind video */}
      <div className="preview-ambient-glow" aria-hidden="true" />

      {/* Pure Video Frame */}
      <div className="preview-video-card">
        <video
          className="preview-video-element"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="BlurGlass video preview"
        >
          <source src="/blurglass.mp4" type="video/mp4" />
          <source src="/blur-glass.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
