import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavStyle.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();

    // Listen for storage changes (in case user logs out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Also check auth status when route changes (for when user logs in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate("/auth");
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
            <li><Link to="/chatbot" onClick={() => setIsMenuOpen(false)}>SHANTI</Link></li>
            <li><Link to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link></li>
            <li><Link to="/forum" onClick={() => setIsMenuOpen(false)}>Forum</Link></li>
            <li><Link to="/book" onClick={() => setIsMenuOpen(false)}>Book Counselor</Link></li>
            <li><Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
          </ul>
        </nav>
        
        {/* Conditional rendering based on authentication status */}
        {isLoggedIn ? (
          <button className="login-button logout-button" onClick={handleLogout}>
            Sign Out
          </button>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Student Login
          </button>
        )}
      </div>
    </header>
  );
};

export default NavBar;