import { Link } from "react-router-dom";
import "./homePage/homePage.css";
const NavBar = () => {
    return (
        <header className="header">
                <div className="container header-content">
                  <div className="logo">
                    <i className="fas fa-brain"></i>
                    <a><Link to="/">PsycheIT</Link></a>
                  </div>
                  <nav>
                    <ul>
                      <li><a href="#features">Features</a></li>
                      <li><Link to="/resources">Resources</Link></li>
                      <li><a href="#about">About</a></li>
                      <li><a href="#contact">Contact</a></li>
                    </ul>
                  </nav>
                  <a href="#login" className="cta-button">Student Login</a>
                </div>
              </header>
    );
};
export default NavBar;