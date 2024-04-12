import * as React from "react";
import carModel from "../assets/carModel.svg"
import '../styles/s11.css';

function ApologyMessage() {
  return (
    <div className="apology-container">
      {" "}
      <div className="apology-image-container">
        {" "}
        <img
          loading="lazy"
          src={carModel}
          alt=""
          className="apology-background"
        />{" "}
      </div>{" "}
      <div className="apology-heading">We apologize !</div>{" "}
      <div className="apology-description">
        {" "}
        The license plate is not recognized or not found in our system !{" "}
      </div>{" "}
    </div>
  );
}


function HelpDeskMessage() {
  return (
    <div className="help-container">
      {" "}
      <div className="help-background">
        {" "}
        <div className="help-icon-container">
          {" "}
          <div
            className="help-icon"/>
           
          {" "}
        </div>{" "}
      </div>{" "}
      <p className="help-description">
        {" "}
        Our help desk cashier will help you <br/>to pay your fees{" "}
      </p>{" "}
    </div>
  );
}

export default function S_11() {


      
  return (
    <>
      {" "}
      <div className="container">
        {" "}
        <main className="content">
          {" "}
          <div className="columns">
            {" "}
            <div className="column">
              {" "}
              <ApologyMessage />{" "}
            </div>{" "}
            <div className="column">
              {" "}
              <HelpDeskMessage />{" "}
            </div>{" "}
          </div>{" "}
        </main>{" "}
      </div>{" "}

    </>
  );
}
