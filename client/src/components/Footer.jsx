import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Globe, Share2, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container grid grid-cols-4 footer-grid">
        <div className="footer-section">
          <Link to="/" className="logo">
            <Cpu className="logo-icon" size={32} />
            <span className="logo-text gradient-text">Department of Electronics and Communication Engineering</span>
          </Link>
          <p className="footer-desc">
            Empowering the next generation of engineers with cutting-edge technology and world-class education.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><Globe size={20} /></a>
            <a href="#" className="social-link"><Share2 size={20} /></a>
            <a href="#" className="social-link"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="https://www.easacollege.com" target="_blank" rel="noopener noreferrer">EASA College Home</a></li>
            <li><a href="https://www.easacollege.com/best-college-for-electronics-and-communication-engineering-in-coimbatore" target="_blank" rel="noopener noreferrer">ECE Program (Official Page)</a></li>
            <li><a href="https://portal.easacollege.com" target="_blank" rel="noopener noreferrer">ERP Login</a></li>
            <li><a href="https://www.easacollege.com/admission-enquiry-for-engineering-colleges-in-coimbatore" target="_blank" rel="noopener noreferrer">Admission Enquiry</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Library</a></li>
            <li><a href="#">Laboratories</a></li>
            <li><a href="#">Student Clubs</a></li>
            <li><a href="#">Downloads</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li><MapPin size={18} className="contact-icon" /> 123 Tech Campus, Engineering Block, City 10001</li>
            <li><Phone size={18} className="contact-icon" /> +1 (555) 123-4567</li>
            <li><Mail size={18} className="contact-icon" /> contact.ece@dept.edu</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Department of Electronics and Communication Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
