import React, { useState, useEffect } from 'react';
import '../styles/footer.css';

export default function Footer({timerFooter}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    fetchBackgroundImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, timerFooter * 1000);

    return () => clearInterval(intervalId);
  }, [backgroundImages, timerFooter]);

  const fetchBackgroundImages = () => {
    try {
      const context = require.context("../assets", false, /\.(jpg|jpeg|png|svg)$/);
      const imagesArray = context.keys()
      .filter((filename) => filename.startsWith('./banner'))
      .map(context);
            setBackgroundImages(imagesArray);

    } catch (error) {
      console.error("Error fetching background images:", error);
    }
  };

  return (
    <footer className="footer">
      {backgroundImages.length > 0 && (
        <img
          loading="lazy"
          src={backgroundImages[currentImageIndex]}
          className="footer-background"
          alt=" "
          height={400}
        />
      )}
    </footer>
  );
}






/* import React from 'react';
import '../styles/footer.css';

export default function Footer({ backgroundSrc}) {
  return (
    <footer className="footer">
      <img
        loading="lazy"
        src={backgroundSrc}
        className="footer-background"
        alt=""
      />
    </footer>
  );
} */
