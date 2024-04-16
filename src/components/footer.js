import React from 'react';
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
}
