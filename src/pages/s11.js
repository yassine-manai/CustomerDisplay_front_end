import React from "react";
import '../styles/s11.css';

// ApologyMessage component now accepts props
function ApologyMessage({ heading, description, carImage }) {
  return (
    <div className="apology-container">
      <div className="apology-image-container">
        <img
          loading="lazy"
          height={220}
          width={300}
          src={carImage}
          alt=""
          className="apology-background"
        />
      </div>
      <div className="apology-heading">{heading}</div>
      <div className="apology-description">{description}</div>
    </div>
  );
}

// HelpDeskMessage component now accepts props
function HelpDeskMessage({ description }) {
  return (
    <div className="help-container">
      <div className="help-background">
        <div className="help-icon-container">
          {/* You can add your help icon JSX here */}
        </div>
      </div>
      <p className="help-description">
        {description}
      </p>
    </div>
  );
}

// S_11 component now accepts props and passes them to child components
export default function S_11({ apologyHeading, apologyDescription, helpDescription, carModelImage }) {
  return (
    <div className="container">
      <main className="content">
        <div className="columns">
          <div className="column">
            {/* Pass props to ApologyMessage component */}
            <ApologyMessage
              heading={apologyHeading}
              description={apologyDescription}
              carImage={carModelImage}
            />
          </div>
          <div className="column">
            {/* Pass props to HelpDeskMessage component */}
            <HelpDeskMessage
              description={helpDescription}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
