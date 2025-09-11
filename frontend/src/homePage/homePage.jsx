import React from "react";
import { useState } from "react";
import "./HomePage.css";
import NavBar from "../Navbar";
import { Link } from "react-router-dom";
import "./homePage.css";


const HomePage = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="homepage">
      <NavBar/>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="herotext">
          <h1>Mental Wellness for Campus Life</h1>
          <p>Providing stigma-free, accessible psychological support for students through AI-guided first aid, confidential counseling, and peer support communities.</p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="cta-button">Get Started Today</Link>
            <a href="#learn-more" className="cta-button secondary">Learn More</a>
          </div>
          </div>
          <img src="" alt="" srcset="" />
        </div>
      </section>

    <section className="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>The Challenge We Are Solving</h2>
            
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <b>Stigma-Free Access</b>
                <p>Many students hesitate to seek help because they fear being judged or misunderstood. Our platform ensures private, stigma-free first-line support so no one suffers in silence.</p>
              </div>

            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <b>Early Detection</b>
                <p>Stress, anxiety, and depression often go unnoticed until they become severe. By providing simple, AI-guided check-ins, we help identify problems early and guide students toward the right support.</p>
              </div>
              
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <b>Bridging the Gap</b>
                <p>Most colleges lack structured mental health systems, especially in rural areas. Our solution connects students with counselors, peer groups, and self-help resources in one accessible platform.</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Comprehensive Support System</h2>
            <p>Our platform offers a complete suite of tools to support student mental health and well-being</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI-Guided First Aid</h3>
              <p>Interactive chat support that offers immediate coping strategies and refers to professionals when needed.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3>Confidential Booking</h3>
              <p>Secure, private appointment scheduling with campus counselors and mental health professionals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Resource Hub</h3>
              <p>Videos, relaxation audio, and mental wellness guides in multiple regional languages.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Peer Support</h3>
              <p>Moderated peer-to-peer support forums with trained student volunteers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Admin Analytics</h3>
              <p>Anonymous data analytics for institutions to recognize trends and plan interventions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Complete Privacy</h3>
              <p>All data is encrypted and anonymized to protect student privacy and ensure confidentiality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="audience">
        <div className="container">
          <div className="section-title">
            <h2>Designed For Everyone</h2>
            <p>Our platform serves all members of the campus community</p>
          </div>
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              For Students
            </button>
            <button 
              className={`tab ${activeTab === 'counselors' ? 'active' : ''}`}
              onClick={() => setActiveTab('counselors')}
            >
              For Counselors
            </button>
            <button 
              className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              For Administrators
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'students' && (
              <div className="tab-panel">
                <h3>Support Tailored to Student Needs</h3>
                <ul>
                  <li>Anonymous access to mental health resources</li>
                  <li>Peer support from students who understand your challenges</li>
                  <li>Self-paced learning modules for stress management</li>
                  <li>Easy scheduling for counseling sessions</li>
                </ul>
              </div>
            )}
            {activeTab === 'counselors' && (
              <div className="tab-panel">
                <h3>Tools to Enhance Your Practice</h3>
                <ul>
                  <li>Streamlined appointment management system</li>
                  <li>Anonymous student screening tools</li>
                  <li>Resource library to share with students</li>
                  <li>Trend analysis to better serve student needs</li>
                </ul>
              </div>
            )}
            {activeTab === 'admin' && (
              <div className="tab-panel">
                <h3>Data-Driven Campus Wellness</h3>
                <ul>
                  <li>Anonymous aggregate data on student mental health</li>
                  <li>Identify trends and patterns across campus</li>
                  <li>Measure effectiveness of mental health initiatives</li>
                  <li>Resource allocation guidance based on real data</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to prioritize your mental health?</h2>
            <p>Join thousands of students who have found support through our platform. Anonymous, secure, and available 24/7.</p>
            <div className="cta-buttons">
              <Link to="/dashboard" className="cta-button">Sign Up Now</Link>
              <a href="#demo" className="cta-button secondary">Request Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>PsycheIT</h3>
              <p>Providing accessible, stigma-free mental health support for college students worldwide.</p>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#resources">Resources</a></li>
                <li><a href="#about">About Us</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Connect With Us</h3>
              <ul>
                <li><a href="#facebook"><i className="fab fa-facebook"></i> Facebook</a></li>
                <li><a href="#twitter"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="#instagram"><i className="fab fa-instagram"></i> Instagram</a></li>
                <li><a href="#linkedin"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 PsycheIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;