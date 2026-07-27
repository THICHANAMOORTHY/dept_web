import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import './Navbar.css'; 
import logoImg from '../assets/logo.png';

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
      <div className="navbar">
        <Link to="/" className="logo">
          <img src={logoImg} alt="EASA Logo" className="logo-icon" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
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
            <Globe size={18} />
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
              <Globe size={18} />
              College Website
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
