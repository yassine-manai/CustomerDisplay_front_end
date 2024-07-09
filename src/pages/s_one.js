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
    // Function to fetch images from API and save locally
    const fetchImagesFromApiMain = async () => {
      try {
        const response = await fetch(`http://${wsip}:${wsport}/get_mainScreen`);
        const data = await response.json();
        console.log('Fetched images main:', data);

        // Extract base64 images from API response
        const imagesArray = data.map(img => img.base64);

        // Save images to localStorage
        localStorage.setItem('mainScreenImages', JSON.stringify(imagesArray));

        // Set images state
        setImages(imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    // Fetch images from API on initial load
    fetchImagesFromApiMain();

    // Load locally saved images on component mount
    const loadLocalImages = () => {
      const localImages = JSON.parse(localStorage.getItem('mainScreenImages'));
      if (localImages && localImages.length > 0) {
        setImages(localImages);
      }
    };
    loadLocalImages();

    // Set interval to fetch images from API every savedCronTimer hours
    const fetchInterval = setInterval(() => {
      fetchImagesFromApiMain();
    }, savedCronTimer* 3600000);

    // Clear interval on component unmount or dependency change
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    // Set interval to cycle through images
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

      {/* Dots indicator */}
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
