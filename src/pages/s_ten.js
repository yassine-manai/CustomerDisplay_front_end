import React from "react";
import '../styles/s_ten.css';

function ApologyMessage() {
  return (
    <div className="apology-message">
      <div className="icon-container">
        {/* Placeholder for the apology icon */}
        <div className="apology-icon" />
      </div>
      <h2 className="apology-title">We apologize!</h2>
      <p className="apology-description">
        The license plate is not recognized or not found in our system! Our help desk cashier will help you to pay your fees.
      </p>
    </div>
  );
}

function ImageSection({ imageUrl }) {
  return (
    <div className="image-section">
      {/* Render the image with the provided URL */}
      <img loading="lazy" src={imageUrl} alt="Parking lot" className="parking-lot-image" height={527} width={300} />
    </div>
  );
}

function S_ten({ imageUrl }) {
  return (
    <div className="container">
      <main className="main-content">
        <div className="content-wrapper">
          <section className="apology-section">
            <ApologyMessage />
          </section>
          <br />
          <section className="image-wrapper">
            {/* Pass the imageUrl prop to the ImageSection component */}
            <ImageSection imageUrl={imageUrl} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default S_ten;
