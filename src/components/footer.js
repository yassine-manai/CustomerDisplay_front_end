import React, { useState, useEffect } from 'react';
import '../styles/footer.css';

const {
  REACT_APP_SUPABASE_URL_WS: wsip,
  REACT_APP_SUPABASE_URL_PORT: wsport,
} = process.env;

export default function Footer({ timerFooter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, timerFooter * 1000); 

    return () => clearInterval(intervalId);
  }, [images, timerFooter]);

  const fetchImagesFromApiBanner = async () => {
    try {
      const response = await fetch(`http://${wsip}:${wsport}/get_banner`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched images:', data);

      const imagesArray = data.map(img => img.base64);
      setImages(imagesArray);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImagesFromApiBanner(); 

    const fetchInterval = setInterval(fetchImagesFromApiBanner, 3600000);
    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <footer className="footer">
      {images.length > 0 && (
        <img
          loading="lazy"
          src={images[currentIndex]}
          className="footer-background"
          alt=""
          height={400}
        />
      )}
    </footer>
  );
}
