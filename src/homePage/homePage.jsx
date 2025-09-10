import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <i className="fas fa-brain"></i>
            PsycheIT
          </div>
          <nav>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <Link to="/dashboard" className="cta-button">Student Login</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Mental Wellness for Campus Life</h1>
          <p>Providing stigma-free, accessible psychological support for students through AI-guided first aid, confidential counseling, and peer support communities.</p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="cta-button">Get Started Today</Link>
            <a href="#learn-more" className="cta-button secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <h3>5,000+</h3>
              <p>Students Helped</p>
            </div>
            <div className="stat">
              <h3>98%</h3>
              <p>Satisfaction Rate</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Campuses Served</p>
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

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>What Students Are Saying</h2>
            <p>Hear from students who have benefited from our platform</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"The AI chat helped me through a panic attack at 2 AM when no one else was available. It guided me through breathing exercises that actually worked."</p>
              </div>
              <div className="testimonial-author">
                <h4>Rahul M.</h4>
                <p>Engineering Student</p>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"I was hesitant to seek help because of the stigma, but the anonymous peer support forum made me feel safe to share my struggles."</p>
              </div>
              <div className="testimonial-author">
                <h4>Priya S.</h4>
                <p>Arts Student</p>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Booking counseling sessions through the app was so easy and private. I didn't have to worry about running into someone I know at the counseling center."</p>
              </div>
              <div className="testimonial-author">
                <h4>Arjun K.</h4>
                <p>Business Student</p>
              </div>
            </div>
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