import InfoContainer from "../components/InfoComp";
import '../styles/s_two.css';
import * as React from "react";
import { useState } from "react";

function S_TWO() {
  const locationData = {
    iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/bd134da79b4287c378621cc11a38dc61c6af1b036b1f38172c4ae4602455f6fa?apiKey=3a9f9b98de3f493789d8094471d44942&",
    name: "PUMC Carpark",
    exit: "- Exit 705"
  };

  const [orderDetails, setOrderDetails] = useState([
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/705125e31b9966e2bc45ffe2d7391482cddec4b2b1b3b84e59cc43a402a0566e?apiKey=3a9f9b98de3f493789d8094471d44942&",
      label: "Entry Time",
      value: "21-02-2024 14:36",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eef99b4e2234d95b45a5b79f6eaafdf10c66970a66321d090b6072c47d0ed892?apiKey=3a9f9b98de3f493789d8094471d44942&",
      label: "Exit time",
      value: "21-02-2024 14:36",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f32b9208fbad478268d19977d5d730f82431bc0e645d031573754162be23e980?apiKey=3a9f9b98de3f493789d8094471d44942&",
      label: "Length of stay",
      value: "2 hours 31 minutes",
    },
  ]);

  return (
      <div className="container">
        <InfoContainer location={locationData} />

        <div className="order-summary">
      <div className="order-details">
        <h2 className="order-title">Order Summary </h2>
        <div className="separator_vertical" />


        {orderDetails.map((detail, index) => (
          <div key={index} className="detail-row">
            <div className="detail-label">
              <div className="icon-container">
                <img src={detail.icon} alt="" className="icon" />
              </div>
              <div className="label">{detail.label}</div>
            </div>
            <div className="detail-value">{detail.value}</div>
          </div>
        ))}
        
        <div className="amount-container">
          <div className="amount-label">Amount to pay</div>
          <div className="amount-value">
            <span className="amount">0.400</span>{" "}
            <span className="currency">TND</span>
          </div>
        </div>
      </div>

      <div className="separator" />

      <div className="plate-number">
        <div className="plate-label">
          <div className="icon-container">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffe342400e0e731f8e0380ec42d9fa95fd6820690f9f9df7539dd1fdc068827a?apiKey=3a9f9b98de3f493789d8094471d44942&" alt="" className="icon" />
          </div>
          <div className="label">E22714</div>
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdd590999e484b2609125fd20c5ce9b98f3b5d73d03954284cb3832ff751c513?apiKey=3a9f9b98de3f493789d8094471d44942&" alt="Plate number" className="plate-image" />
      </div>
     </div>


    </div>
  );
}


export default S_TWO;

