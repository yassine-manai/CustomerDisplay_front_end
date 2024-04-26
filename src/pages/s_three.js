import React from "react";
import '../styles/s_three.css';
//import {BARRIER} from "../assets/BARRIER.gif";

// PaymentSuccessMessage component to display payment success and visit message
function PaymentSuccessMessage({ paymentSuccess, visitMessage }) {
  return (
    <div className="payment-success-message3">
      <div className="success-text3">{paymentSuccess}</div>
      {/* Payment Done Successfully ! */}
      <div className="visit-message3">
        {visitMessage}
        {/* Thank you for your visit, Drive Safe ! */}
      </div>
    </div>
  );
}

// QRCodeImage component to display a QR code image
function QRCodeImage() {
  return (
    <div className="qr-code3">
      {/* Placeholder for the QR code image */}
      <div
        loading="fast"
        alt=" "
      />
    </div>
  );
}

// PaymentSuccessSection component to organize the payment success message and QR code
function PaymentSuccessSection({ paymentSuccess, visitMessage }) {
  return (
    <section className="payment-success-section3">
      <div className="payment-success-content3">
        <div className="message-column3">
          {/* Render PaymentSuccessMessage with paymentSuccess and visitMessage props */}
          <PaymentSuccessMessage
            paymentSuccess={paymentSuccess}
            visitMessage={visitMessage}
          />
        </div>
        <div className="qr-code-column3">
          {/* Render QRCodeImage component */}
          <QRCodeImage />
        </div>
      </div>
    </section>
  );
}

// S_three component (main component) to render PaymentSuccessSection
function S_three({ paymentSuccess, visitMessage }) {
  return (
    <div className="container3">
      {/* Render PaymentSuccessSection with paymentSuccess and visitMessage props */}
      <PaymentSuccessSection
        paymentSuccess={paymentSuccess}
        visitMessage={visitMessage}
      />
    </div>
  );
}

export default S_three;
