import React, { useState, useEffect } from "react";
import '../styles/s_one.css';

const {
  REACT_APP_SUPABASE_URL_WS: wsip,
  REACT_APP_SUPABASE_URL_PORT: wsport,
} = process.env;

export default function S_ONE({ timerInterval }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImagesFromApiMain();
    const fetchInterval = setInterval(fetchImagesFromApiMain, 3600000);
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, timerInterval * 1000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images, timerInterval]);

  const fetchImagesFromApiMain = async () => {
    try {
      const response = await fetch(`http://${wsip}:${wsport}/get_mainScreen`);
      const data = await response.json();
      const imagesArray = data.map(img => img.base64);
      setImages(imagesArray);
    } catch (error) {
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
