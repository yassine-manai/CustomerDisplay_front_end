import React from "react";
import '../styles/s_nine.css';

function ApologyMessage({ message }) {
  return (
    <div className="apology-message">
      <div className="icon-container">
        {/* Placeholder for the apology icon */}
        <div className="apology-icon" />
      </div>
      <h2 className="apology-title"></h2>
      <p className="apology-description">
        {message}
      </p>
    </div>
  );
}

function ImageSection({ imageUrl }) {
  // Use the imageUrl directly as the src attribute of the <img> tag
  return (
    <div className="image-section">
      {/* Render the image with the provided base64-encoded URL */}
      <img
        loading="lazy"
        src={imageUrl}  
        alt="Parking lot"
        className="parking-lot-image"
        height={505}
        width={300}
      />
    </div>
  );
}

export default function S_nine({ apologyMessage, carModelImage }) {
  return (
    <div className="container">
      <main className="main-content">
        <div className="content-wrapper">
          <section className="apology-section">
            <ApologyMessage message={apologyMessage} />
          </section>
          <br />
          <section className="image-wrapper">
            {/* Pass the carModelImage (base64 string) as the imageUrl prop */}
            <ImageSection imageUrl={carModelImage} />
          </section>
        </div>
      </main>
    </div>
  );
}
