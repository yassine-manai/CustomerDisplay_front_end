import React from "react";
import '../styles/s_ten.css';

// ApologyMessage component renders an apology with a title and description
function ApologyMessage({ title, description }) {
  return (
    <div className="apology-message">
      <div className="icon-container">
        {/* Placeholder for the apology icon */}
        <div className="apology-icon" />
      </div>
      <h2 className="apology-title">{title}</h2>
      <p className="apology-description">
        {description}
      </p>
    </div>
  );
}

// ImageSection component renders an image with the provided imageUrl
function ImageSection({ imageUrl }) {
  return (
    <div className="image-section">
      {/* Render the image with the provided URL */}
      <img
        loading="lazy"
        src={imageUrl}
        alt="Parking lot"
        className="parking-lot-image"
        height={605}
        width={300}
      />
    </div>
  );
}

function S_ten({ apologyTitle, apologyDescription, carModelImage }) {
  return (
    <div className="container">
      <main className="main-content">
        <div className="content-wrapper">
          {/* Render ApologyMessage with title and description props */}
          <section className="apology-section">
            <ApologyMessage title={apologyTitle} description={apologyDescription} />
          </section>
          <br />
          {/* Render ImageSection with imageUrl prop */}
          <section className="image-wrapper">
            <ImageSection imageUrl={carModelImage} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default S_ten;
