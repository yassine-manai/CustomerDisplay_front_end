import React, { useState, useEffect } from 'react';
import '../styles/footer.css';

const {
  REACT_APP_SUPABASE_URL_WS: wsip,
  REACT_APP_SUPABASE_URL_PORT: wsport,
} = process.env;

const savedCronTimer = parseInt(localStorage.getItem('CronTimer'), 10);
console.info(savedCronTimer);

export default function Footer({ timerFooter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  const fetchImagesFromApiBanner = async () => {
    try 
    {
      const response = await fetch(`http://${wsip}:${wsport}/get_banner`);
      const data = await response.json();
      console.log('Fetched images banner:', data);

      // Extract base64 images from API response
      const imagesBanner = data.map(img => img.base64);

      sessionStorage.removeItem('bannerImages');

      // Save banner images to localStorage
      sessionStorage.setItem('bannerImages', JSON.stringify(imagesBanner));

      // Set images state
      setImages(imagesBanner);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    // Function to load locally saved images
    const loadLocalImages = () => {
      const localImages = JSON.parse(sessionStorage.getItem('bannerImages'));
      if (localImages && localImages.length > 0) {
        setImages(localImages);
      }
    };

    // Fetch images from API on initial load
    fetchImagesFromApiBanner();

    // Load locally saved images
    loadLocalImages();

    // Set interval to fetch images from API every hour
    const fetchIntervalImage = setInterval(() => {
      fetchImagesFromApiBanner();
    }, savedCronTimer);

    // Clear interval on component unmount or dependency change
    return () => clearInterval(fetchIntervalImage);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, timerFooter * 1000);

      return () => clearInterval(intervalId);
    }
  }, [images, timerFooter]);

  console.log('Current Index:', currentIndex);
  console.log('Images:', images);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="footer">
      <img
        src={`${images[currentIndex]}`}
        className="footer-background"
        alt=" "
      />
    </div>
  );
}
