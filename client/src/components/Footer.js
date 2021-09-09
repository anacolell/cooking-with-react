import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="logo-container">
          <img className="footer-logo" alt="logo" src="../img/logo.png" />
          <div className="social-icons">
            <a href="/">
              <FaInstagram className="social-icon" />
            </a>
            <a href="/">
              <FaFacebook className="social-icon" />
            </a>
            <a href="/">
              <FaTwitter className="social-icon" />
            </a>
            <a href="/">
              <FaPinterest className="social-icon" />
            </a>
            <a href="/">
              <FaYoutube className="social-icon" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
