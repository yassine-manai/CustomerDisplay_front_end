import { ClockIcon, CarIcon, ExitIcon } from "../components/icons";
import img_barrierClose from "../assets/img_barrierClose.svg";
import '../styles/s_five.css';
import React from 'react'

export default function S_five ({

  name,
  thankYouMessage,
  licencePlate,
  entryTime,
  exitTime,
  lengthOfStay,
  carImage
}) {
  const orderSummaryData = {
    licencePlate,
    entryTime,
    exitTime,
    lengthOfStay,
  };

  function OrderSummary({
    licencePlate,
    entryTime,
    exitTime,
    lengthOfStay,

  })


  {
    return (
      <div className="order-summary5">
        <div className="order-summary-title5">Order Summary</div>
        <div className="order-summary-divider5" />
        <div className="order-summary-content5">
          <div className="order-summary-row5">
            <div className="order-summary-image-column5">
              <img
                loading="lazy"
                src={carImage}
                className="order-summary-image5"
                alt=" "
                height={450}
                width={500}
              />
            </div>
            <div className="order-summary-details-column5">
              <div className="order-summary-details5">
                <div className="order-summary-detail5">
                  <CarIcon />
                  <div className="order-summary-detail-label5">Licence Plate</div>
                  <div className="order-summary-detail-value55">{licencePlate}</div>
                </div>
                <div className="order-summary-detail5">
                  <ClockIcon />
                  <div className="order-summary-detail-label5">Entry Time</div>
                  <div className="order-summary-detail-value5">{entryTime}</div>
                </div>
                <div className="order-summary-detail5">
                  <ExitIcon />
                  <div className="order-summary-detail-label5">Exit time</div>
                  <div className="order-summary-detail-value5">{exitTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-footer5">
          <div className="order-summary-footer-row5">
            <div className="order-summary-length-of-stay5">
              <div className="order-summary-length-of-stay-label5">Length of stay</div>
              <div className="order-summary-length-of-stay-value5">{lengthOfStay}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ThankYouMessage({ name, message }) {
    return (
      <div className="thank-you-message-container5">
        <div className="thank-you-avatar-container5">
          <div
            loading="lazy"
            height={500}
            width={500}
            src={img_barrierClose}
            className="thank-you-avatar5"
            alt=" "
          />
        </div>
        <div className="thank-you-message5">{message}</div>
        <div className="drive-safe-message52">{name}</div>
       <div className="drive-safe-message5">Drive Safe !</div>
      </div>
    );
  }

  return (
    <div className="container5">
      <main className="main-container5">
        <div className="content-wrapper5">
          <div className="column-container5">
          <ThankYouMessage name={name} message={thankYouMessage} />
          </div>
          <div className="column-container5">
            <OrderSummary {...orderSummaryData} />
          </div>
        </div>
      </main>
    </div>
  );
}

