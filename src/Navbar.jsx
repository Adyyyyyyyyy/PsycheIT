import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavStyle.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navhead">
      <div className="container header-content">
        <div className="logo">
          <i className="fas fa-brain"></i>
          <Link to="/">PsycheIT</Link>
        </div>
        
        {/* Mobile menu button */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={isMenuOpen ? "nav-open" : ""}>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><Link to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link></li>
            <li><Link to="/forum" onClick={() => setIsMenuOpen(false)}>Forum</Link></li>
            <li><Link to="/book" onClick={() => setIsMenuOpen(false)}>Counselling</Link></li>
          </ul>
        </nav>
        <a href="" className="login-button">Student Login</a>
      </div>
    </header>
  );
};

export default NavBar;