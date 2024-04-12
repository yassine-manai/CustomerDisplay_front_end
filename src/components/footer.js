import React from 'react';
import '../styles/footer.css';

export default function Footer({ backgroundSrc, logoSrc }) {
  return (
    <footer className="footer">
      <img
        loading="lazy"
        src={backgroundSrc}
        className="footer-background"
        alt=""
      />
      <img
        loading="lazy"
        src={logoSrc}
        className="footer-logo"
        alt=""
      />
    </footer>
  );
}
