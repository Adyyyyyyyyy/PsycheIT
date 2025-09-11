import { useState } from 'react'
import "./StudentDashboard.css";
import "../resourceHub/ResourcesPage.css";
import NavBar from "../Navbar";
import PHQ9Questionnaire from "../resourceHub/PHQ9";
import GAD7Questionnaire from '../resourceHub/GAD7';

const ScreeningTest = () => {
  const [activeQuestionnaire, setActiveQuestionnaire] = useState("phq9");

  return (
    <div className="screening-test-page">
      <NavBar/>
      
      <header className="screening-header">
        <div className="screening-header-content">
          <div className="screening-header-text">
            <h1>Mental Health Screening</h1>
            <p>Take these brief self-assessment questionnaires to better understand your mental health. These are standard screening tools used by healthcare professionals.</p>
            <div className="disclaimer-banner">
              <i className="fas fa-info-circle"></i>
              <span>Your responses are anonymous and not stored. This is for self-assessment only.</span>
            </div>
          </div>
        </div>
      </header>

      <section className="screening-content">
        <div className="container">
          <div className="questionnaire-container">
            <div className="questionnaire-intro">
              <h3>PHQ-9 & GAD-7 Screening Tools</h3>
              <p>
                These standardized questionnaires help assess symptoms of depression (PHQ-9) and anxiety (GAD-7). 
                Please answer honestly based on how you've been feeling over the past two weeks.
              </p>
            </div>
            
            <div className="questionnaire-tabs">
              <button 
                className={`questionnaire-tab ${activeQuestionnaire === 'phq9' ? 'active' : ''}`}
                onClick={() => setActiveQuestionnaire('phq9')}
              >
                <i className="fas fa-brain"></i>
                PHQ-9 (Depression)
              </button>
              <button 
                className={`questionnaire-tab ${activeQuestionnaire === 'gad7' ? 'active' : ''}`}
                onClick={() => setActiveQuestionnaire('gad7')}
              >
                <i className="fas fa-heart"></i>
                GAD-7 (Anxiety)
              </button>
            </div>
            
            <div className="questionnaire-content">
              {activeQuestionnaire === 'phq9' && (
                <div className="questionnaire-section">
                  <div className="questionnaire-description">
                    <h4>Depression Screening (PHQ-9)</h4>
                    <p>The PHQ-9 is a widely used tool for screening, diagnosing, monitoring and measuring the severity of depression.</p>
                  </div>
                  <PHQ9Questionnaire />
                </div>
              )}
              
              {activeQuestionnaire === 'gad7' && (
                <div className="questionnaire-section">
                  <div className="questionnaire-description">
                    <h4>Anxiety Screening (GAD-7)</h4>
                    <p>The GAD-7 is an effective tool for screening for and measuring the severity of generalized anxiety disorder.</p>
                  </div>
                  <GAD7Questionnaire />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources Section */}
      <section className="crisis-help-section">
        <div className="container">
          <h2>Need Immediate Help?</h2>
          <p>If you're in crisis or need to talk to someone immediately, these resources are available 24/7:</p>
          
          <div className="crisis-resources">
            <div className="crisis-card">
              <h3>National Tele Mental Health Hotline</h3>
              <p>Dial the Toll-Free number below to get in touch with a Counsellor</p>
              <a href="tel:1-8008914416" className="crisis-link">
                <i className="fas fa-phone"></i> Call 1-800 891 4416
              </a>
            </div>
            
            <div className="crisis-card">
              <h3>Crisis Help Line</h3>
              <p>National Institute of Mental Health and Neurosciences (NIMHANS) Helpline</p>
              <a href="tel:080-46110007" className="crisis-link">
                <i className="fas fa-phone"></i> Call 080-46110007	
              </a>
            </div>
            
            <div className="crisis-card">
              <h3>Emergency Services</h3>
              <p>If you're in immediate danger, please call 100</p>
              <a href="tel:100" className="crisis-link emergency">
                <i className="fas fa-exclamation-triangle"></i> Call 100
              </a>
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

export default ScreeningTest;
