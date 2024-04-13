import * as React from "react";
import '../styles/s_nine.css';



function ApologyMessage({message}) {
  return (
    <div className="apology-message">
      <div className="icon-container">
        {/* Placeholder for the apology icon */}
        <div className="apology-icon" />
      </div>
      <h2 className="apology-title"> </h2>
      <p className="apology-description">
      {message}     
       </p>
      <br />
      <br />
  
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

function S_ten({ imageUrl, message }) {
  return (
    <div className="container">
      <main className="main-content">
        <div className="content-wrapper">
          <section className="apology-section">
            <ApologyMessage message={message} />
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
