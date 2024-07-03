import React, { useState, useEffect } from "react";
import '../styles/s_one.css';

export default function S_ONE({ timerInterval }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImagesFromFolder();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, timerInterval * 1000);
    
    return () => clearInterval(intervalId);
  }, [currentIndex, images, timerInterval]);

  const fetchImagesFromFolder = () => {
    try {
      const context = require.context("../assets", false, /\.(jpg|jpeg|png|svg)$/);
      const imagesArray = context.keys()
        .filter((filename) => filename.startsWith('./main'))
        .map(context);
      setImages(imagesArray);
    } 
    catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container1">
      <img
        loading="lazy"
        src={images.length > 0 ? images[currentIndex] : ""}
        alt=""
        className="map-image1"

      />

      <div className="carousel-indicator">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </div>

      {/* Circular bottom indicator */}
      <div className="circular-indicator">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}






























/* import React from "react";
import '../styles/s_one.css';

export default function S_ONE({ img }) {
  return (
    <div className="container1">
      <img
        loading="lazy"
        src={img}
        alt="Map"

        className="map-image1"
      />
    </div>
  );
}
 */