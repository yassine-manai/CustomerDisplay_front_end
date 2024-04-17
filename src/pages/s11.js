import React from "react";
import '../styles/s11.css';

// ApologyMessage component now accepts props
function ApologyMessage({ heading, description, carImage }) {
  return (
    <div className="apology-container11">
      <div className="apology-image-container11">
        <img
          loading="lazy"
          height={220}
          width={300}
          src={carImage}
          alt=" "
          className="apology-background11"
        />
      </div>
      <div className="apology-heading11">{heading}</div>
      <div className="apology-description11">{description}</div>
    </div>
  );
}

// HelpDeskMessage component now accepts props
function HelpDeskMessage({ description }) {
  return (
    <div className="help-container11">
      <div className="help-background11">
        <div className="help-icon-container11">
          {/* You can add your help icon JSX here */}
        </div>
      </div>
      <p className="help-description11">
        {description}
      </p>
    </div>
  );
}

// S_11 component now accepts props and passes them to child components
export default function S_11({ apologyHeading, apologyDescription, helpDescription, carModelImage }) {
  return (
    <div className="container11">
      <main className="content11">
        <div className="columns11">
          <div className="column11">
            {/* Pass props to ApologyMessage component */}
            <ApologyMessage
              heading={apologyHeading}
              description={apologyDescription}
              carImage={carModelImage}
            />
          </div>
          <div className="column11">
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
