import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';
import './Navbar.css'; 
import mainCollegeImg from '../assets/images (2).jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Academics', path: '/academics' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Student Achievements', path: '/student-achievements' },
    { name: 'Placements', path: '/placements' },
  ];

  const isActive = (linkPath) => {
    if (linkPath === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (linkPath.startsWith('/#')) {
      return location.pathname === '/' && location.hash === linkPath.substring(1);
    }
    return location.pathname === linkPath;
  };

  return (
    <header className="navbar-container glass">
      <div className="container navbar">
        <Link to="/" className="logo">
          <Cpu className="logo-icon" size={32} />
          <span className="logo-text gradient-text">Department of Electronics and Communication Engineering</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <a 
            href="https://www.easacollege.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="main-college-link"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <img src={mainCollegeImg} alt="EASA College" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
            College Website
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-nav glass animate-fade-in">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name} onClick={toggleMenu}>
                <Link 
                  to={link.path} 
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <a 
              href="https://www.easacollege.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="main-college-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
            >
              <img src={mainCollegeImg} alt="EASA College" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
              College Website
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
