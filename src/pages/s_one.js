import React, { useState, useEffect } from "react";
import '../styles/s_one.css';

const {
  REACT_APP_SUPABASE_URL_WS: wsip,
  REACT_APP_SUPABASE_URL_PORT: wsport,
} = process.env;

const savedCronTimer = parseInt(localStorage.getItem('CronTimer'), 10);

export default function S_ONE({ timerInterval }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImagesFromApiMain = async () => {
      try {
        const response = await fetch(`http://${wsip}:${wsport}/get_mainScreen`);
        const data = await response.json();
        console.log('Fetched images main:', data);

        const imagesArray = data.map(img => img.base64);

        localStorage.removeItem('mainScreenImages');
        localStorage.setItem('mainScreenImages', JSON.stringify(imagesArray));

        setImages(imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImagesFromApiMain();

    const loadLocalImages = () => {
      const localImages = JSON.parse(localStorage.getItem('mainScreenImages'));
      if (localImages && localImages.length > 0) {
        setImages(localImages);
      }
    };
    loadLocalImages();

    
  }, [savedCronTimer]);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, timerInterval * 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, images, timerInterval]);

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
