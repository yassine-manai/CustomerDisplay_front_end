import * as React from "react";
import '../styles/s_ten.css';



function ApologyMessage() {
  return (
    <div className="apology-message">
      <div className="icon-container">
        <div loading="lazy" 
         alt=""
          className="apology-icon" />
      </div>
      <h2 className="apology-title">We apologize !</h2>
      <p className="apology-description">
        The license plate is not recognized or not<br /> found in our system ! Our help desk cashier will help you to pay your fees
      </p>
    </div>
  );
}

function ImageSection() {
  return (
    <div className="image-section">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/284ba0fe61dd9637f707740982d5deadca43a78ed31a2e3cb6818f9325b9efeb?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&" alt="Parking lot image" className="parking-lot-image" />
    </div>
  );
}


export default function S_ten() {



  return (
    <>
      <div className="container">

        <main className="main-content">
           
          <div className="content-wrapper">

            <section className="apology-section">
              <ApologyMessage />
            </section>
<br />
            <section className="image-wrapper">
              <ImageSection />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}