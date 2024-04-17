import React from "react";
import '../styles/s_ten.css';
import cashier from '../assets/cashier.svg'

// ApologyMessage component renders an apology with a title and description
function ApologyMessage({ title, description }) {
  return (
    <div className="apology-message10">
      <div className="icon-container10">
      <img
        loading="lazy"
        src={cashier}  
        alt="Parking lot"
        className="apology-icon10"
        height={505}
        width={300}
      />
      </div>
      <h2 className="apology-title10">{title}</h2>
      <p className="apology-description10">
        {description}
      </p>
    </div>
  );
}

// ImageSection component renders an image with the provided imageUrl
function ImageSection({ imageUrl }) {
  return (
    <div className="image-section10">
      {/* Render the image with the provided URL */}
      <img
        loading="lazy"
        src={imageUrl}
        alt=" "
        className="parking-lot-image10"
        height={605}
        width={300}
      />
    </div>
  );
}

function S_ten({ apologyTitle, apologyDescription, carModelImage }) {
  return (
    <div className="container10">
      <main className="main-content10">
        <div className="content-wrapper10">
          {/* Render ApologyMessage with title and description props */}
          <section className="apology-section10">
            <ApologyMessage title={apologyTitle} description={apologyDescription} />
          </section>
          <br />
          {/* Render ImageSection with imageUrl prop */}
          <section className="image-wrapper10">
            <ImageSection imageUrl={carModelImage} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default S_ten;
