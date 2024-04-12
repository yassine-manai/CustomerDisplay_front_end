import * as React from "react";
import Footer from "../components/footer";

import '../styles/s_three.css';

function PaymentSuccessMessage() {
  return (
    <div className="payment-success-message">
      <div className="success-text">Payment Done Successfully !</div>
      <div className="visit-message">
        Thank you for your visit,
        <br />
        Drive Safe !
      </div>
    </div>
  );
}

function QRCodeImage() {
  return (
    <div
      loading="lazy"
      className="qr-code"
      alt=""
    />
  );
}

function PaymentSuccessSection() {
  return (
    <section className="payment-success-section">
      <div className="payment-success-content">
        <div className="message-column">
          <PaymentSuccessMessage />
        </div>
        <div className="qr-code-column">
          <QRCodeImage />
        </div>
      </div>
    </section>
  );
}



export default function s_three() {

  return (
    <>
      <div className="container">
        <PaymentSuccessSection />
      </div>
    </>
  );
}