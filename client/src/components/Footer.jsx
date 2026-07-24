import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Globe, Share2, MessageCircle } from 'lucide-react';
import { getSettings } from '../services/api';
import './Footer.css';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await getSettings();
        if (data) {
          setSettings(data);
        }
      } catch (err) {
        console.error('Error fetching footer settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const address = settings?.address || 'NH-47, Palakkad Main Road, Navakkarai, Coimbatore, Tamil Nadu - 641105';
  const phoneNumbers = (settings?.phoneNumbers && settings.phoneNumbers.length > 0)
    ? (Array.isArray(settings.phoneNumbers) ? settings.phoneNumbers.join(', ') : settings.phoneNumbers)
    : '+91-9364445555, 0422-2656871';
  const email = settings?.email || 'info@easacollege.com';

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
            <a href="https://www.easacollege.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Official Website: EASA College of Engineering and Technology"><Globe size={20} /></a>
            <a href="#" className="social-link"><Share2 size={20} /></a>
            <a href="#" className="social-link"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="https://www.easacollege.com" target="_blank" rel="noopener noreferrer">EASA College of Engineering and Technology</a></li>
            <li><a href="https://www.easacollege.com/best-college-for-electronics-and-communication-engineering-in-coimbatore" target="_blank" rel="noopener noreferrer">ECE Program (Official Page)</a></li>
            <li><a href="https://portal.easacollege.com" target="_blank" rel="noopener noreferrer">ERP Login</a></li>
            <li><a href="https://www.easacollege.com/admission-enquiry-for-engineering-colleges-in-coimbatore" target="_blank" rel="noopener noreferrer">Admission Enquiry</a></li>
            <li><Link to="/admin/login">Admin Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><a href="https://www.easacollege.com/life-at-easa-campus" target="_blank" rel="noopener noreferrer">Library</a></li>
            <li><Link to="/academics#labs">Laboratories & Facilities</Link></li>
            <li><Link to="/student-achievements">Student Clubs</Link></li>
            <li><Link to="/academics#curriculum">Downloads (Curriculum)</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li><MapPin size={18} className="contact-icon" /> {address}</li>
            <li><Phone size={18} className="contact-icon" /> {phoneNumbers}</li>
            <li><Mail size={18} className="contact-icon" /> {email}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Department of Electronics and Communication Engineering, EASA College of Engineering and Technology. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
