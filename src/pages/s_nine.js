import * as React from "react";
import '../styles/s_nine.css';


function MainContent() {
  return (
    <main className="main-content">
      <div className="content-wrapper">
        <section className="message-section">
          <div className="message-container">
            <div className="icon-container">
              <div
                loading="lazy"
                alt=""
                className="exclamation-icon"
                height={300}
                width={300}
              />
            </div>
            <p className="error-message">
              We apologize, the license plate is not recognized or not found in
              our system !
            </p>
            <p className="help-message">
              Our help desk cashier will help you to pay your fees
            </p>
          </div>
        </section>
        <section className="image-section">
          <div className="image-container">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/284ba0fe61dd9637f707740982d5deadca43a78ed31a2e3cb6818f9325b9efeb?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
              alt="Car parking illustration"
              className="parking-image"
            />
          </div>
        </section>
      </div>
    </main>
  );
}


export default function S_nine() {

  
  return (
    <>
      <div className="container">
        <MainContent />
      </div>
    </>
  );
}