import React, { useState, useEffect } from "react";
import '../styles/errorScreen.css';

import img_error from '../assets/img_error.png';
import img_noImage from '../assets/img_noImage.png';

export default function ERRSCRN({ messageText }) {
    let imgSrc = '';
  
    switch (messageText) {
      case 'Unable to connect to Ads backend':
        imgSrc = img_error; 
        break;

      case 'Unable to get configuration from POS':
        imgSrc = img_error; 
        break;

      case 'Unable to get images from Ads Server':
        imgSrc = img_error; 
        break;

      case 'NO IMAGE AVAILABLE':
        imgSrc = img_noImage; 
        break;

    }
  
  
    return (
      <div className="container0">
        <img src={imgSrc} alt={""} className="map-image0" />
        <span className="texterror1">  {messageText} </span>
      </div>
    );
  }