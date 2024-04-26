import React from "react";
import '../styles/s_nine.css';
import cashier from '../assets/cashier.svg'

function ApologyMessage({ message }) {
  return (
    <div className="apology-message9">
      <div className="icon-container9">
        {/* Placeholder for the apology icon */}
        <img
        loading="lazy"
        src={cashier}  
        alt="Parking lot"
        className="apology-icon9"
        height={505}
        width={300}
      />
      </div>
      <div className="apology-title9"></div>
      <p className="apology-description9">
        {message}
      </p>
    </div>
  );
}

function ImageSection({ imageUrl }) {
  // Use the imageUrl directly as the src attribute of the <img> tag
  return (
    <div className="image-section9">
      {/* Render the image with the provided base64-encoded URL */}
      <img
        loading="lazy"
        src={imageUrl}  
        alt="Parking lot"
        className="parking-lot-image9"
      />
    </div>
  );
}

export default function S_nine({ apologyMessage,  carImage}) {
  return (
    <div className="container9">
      <main className="main-content9">
        <div className="content-wrapper9">
          <section className="apology-section9">
            <ApologyMessage message={apologyMessage} />
          </section>
          <br />
          <section className="image-wrapper9">
            {/* Pass the carModelImage (base64 string) as the imageUrl prop */}
            <ImageSection imageUrl={carImage} />
          </section>
        </div>
      </main>
    </div>
  );
}
