import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';
import './Navbar.css'; // I will create a specific css file for this component if needed, or inline for now.

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Placements', path: '/placements' },
  ];

  return (
    <header className="navbar-container glass">
      <div className="container navbar">
        <Link to="/" className="logo">
          <Cpu className="logo-icon" size={32} />
          <span className="logo-text gradient-text">ECE Dept</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
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
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
