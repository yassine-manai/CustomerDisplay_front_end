import React from "react";
import '../styles/s_seven.css';

import { ClockIcon, CarIcon, ExitIcon } from "../components/icons";


export default function s_seven({
  name,
  thankYouMessage,
  licencePlate,
  entryTime,
  exitTime,
  lengthOfStay,
  amountDeducted,
  currency,
  carImage
}) {
  const orderSummaryData = {
    licencePlate,
    entryTime,
    exitTime,
    lengthOfStay,
    amountDeducted,
    currency,
  };

  function OrderSummary({
    licencePlate,
    entryTime,
    exitTime,
    lengthOfStay,
    amountDeducted,
    currency,

  }) {
    return (
      <div className="order-summary7">
        <div className="order-summary-title7">Order Summary</div>
        <div className="order-summary-divider7" />
        <div className="order-summary-content7">
          <div className="order-summary-row7">
            <div className="order-summary-image-column7">
              <img
                loading="lazy"
                src={carImage}
                className="order-summary-image7"
                alt="Order summary"
                height={200}
                width={200}
              />
            </div>
            <div className="order-summary-details-column7">
              <div className="order-summary-details7">
                <div className="order-summary-detail7">
                  <CarIcon />
                  <div className="order-summary-detail-label7">Licence Plate</div>
                  <div className="order-summary-detail-value7">{licencePlate}</div>
                </div>
                <div className="order-summary-detail7">
                  <ClockIcon />
                  <div className="order-summary-detail-label7">Entry Time</div>
                  <div className="order-summary-detail-value7">{entryTime}</div>
                </div>
                <div className="order-summary-detail7">
                  <ExitIcon />
                  <div className="order-summary-detail-label7">Exit Time</div>
                  <div className="order-summary-detail-value7">{exitTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-footer7">
          <div className="order-summary-footer-row7">
            <div className="order-summary-footer-column7">
              <div className="order-summary-length-of-stay7">
                <div className="order-summary-length-of-stay-label7">Length of Stay</div>
                <div className="order-summary-length-of-stay-value7">{lengthOfStay}</div>
              </div>
            </div>
            <div className="order-summary-footer-column7">
              <div className="order-summary-amount-deducted7">
                <div className="order-summary-amount-deducted-label7">Amount to Pay</div>
                <div className="order-summary-amount-deducted-value7">
                  <span className="amount-deducted-value7">{amountDeducted}</span>
                  <span className="amount-deducted-currency7"> {currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ThankYouMessage({ name, message }) {
    return (
      <div className="thank-you-message-container7">
        <div className="thank-you-avatar-container7">
          <img
            loading="lazy"
            alt=" "
            height={300}
            width={300}
            className="thank-you-avatar7"
          />
        </div>
        <div className="drive-safe-message7">Hello {name}</div>
        <div className="thank-you-message7">{message}</div>
      </div>
    );
  }

  return (
    <div className="container7">
      <main className="main-container7">
        <div className="content-wrapper7">
          <div className="column-container7">
            <ThankYouMessage name={name} message={thankYouMessage} />
          </div>
          <div className="column-container7">
            <OrderSummary {...orderSummaryData} />
          </div>
        </div>
      </main>
    </div>
  );
}

