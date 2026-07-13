import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="page6">
      <div className="footer-row">
        <div className="footer-col">
          <img src="/images/finalLOGO.png" className="footer-logo" alt="SmartBin Logo" />
          <p>
            <span>SmartBin</span> aims to have a significant positive impact on waste management and
            recycling efforts in our community and beyond. It integrates real-time data on litter
            and recyclable materials, allowing waste management organizations to optimize their
            collection routes.
          </p>
        </div>
        <div className="footer-col">
          <h3>Contact <div className="footer-underline"><span></span></div></h3>
          <address>smartbin@gmail.com</address>
          <address><h5>+91 - 9876543521</h5></address>
        </div>
        <div className="footer-col">
          <h3>Quick Links <div className="footer-underline"><span></span></div></h3>
          <ul>
            <li><a href="#page1">Home</a></li>
            <li><a href="#page3">About</a></li>
            <li><a href="#page2">Services</a></li>
            <li><a href="#page6">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Follow Us <div className="footer-underline"><span></span></div></h3>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
          <br /><br />
          <h3>Newsletter <div className="footer-underline"><span></span></div></h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Enter your email id" required />
            <button type="submit"><i className="fas fa-arrow-right"></i></button>
          </form>
        </div>
      </div>
      <hr className="footer-line" />
      <p className="footer-copyright">
        Copyright 2024 SmartBin - All rights reserved.
        <ul className="footer-list">
          <li><a href="#"><b>Terms and Conditions</b></a></li>
          <li><a href="#"><b>Privacy Policy</b></a></li>
          <li><a href="#"><b>Cookies Policy</b></a></li>
        </ul>
      </p>
    </footer>
  );
}
