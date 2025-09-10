import { useState } from 'react'
import "./ResourcesPage.css";
import NavBar from "../Navbar";
import PHQ9Questionnaire from "./PHQ9";
import GAD7Questionnaire from './GAD7';
import resourcesData from "./resources.json";
import { Link } from "react-router-dom";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("videos");
  const [activeQuestionnaire, setActiveQuestionnaire] = useState("phq9"); 
  const resources = resourcesData;

  return (
    <div className="resources-page">
      <NavBar/>
      <header className="resources-header">
        <div className="resources-header-content">
          <div className="resources-header-image">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/026/960/329/small_2x/mental-health-awareness-concept-with-two-hands-carrying-cute-brain-free-png.png" 
              alt="Mental wellness resources" 
            />
          </div>
          <div className="resources-header-text">
            <h1>Mental Health Resources</h1>
            <p>Access videos, articles, and guides to support your mental wellness journey. All resources are carefully curated by mental health professionals.</p>
          </div>
          
        </div>
      </header>


      <section className="resources-nav">
        <div className="container">
          <div className="resources-tabs">
            <button 
              className={`resource-tab ${activeCategory === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveCategory('videos')}
            >
              <i className="fas fa-video"></i> Videos
            </button>
            <button 
              className={`resource-tab ${activeCategory === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveCategory('blogs')}
            >
              <i className="fas fa-blog"></i> Articles & Blogs
            </button>
            <button 
              className={`resource-tab ${activeCategory === 'guides' ? 'active' : ''}`}
              onClick={() => setActiveCategory('guides')}
            >
              <i className="fas fa-book"></i> Screening Test
            </button>
          </div>
        </div>
      </section>

      {/* Resources Content */}
      <section className="resources-content">
        <div className="container">
          {/* Videos Section */}
          {activeCategory === 'videos' && (
            <div className="videos-grid">
              <h2 className="resources-section-title">Educational Videos</h2>
              <p className="resources-section-subtitle">Watch these expert-created videos to learn about mental health topics</p>
              
              <div className="videos-container">
                {resources.videos.map(video => (
                  <div key={video.id} className="video-card">
                    <div className="video-wrapper">
                      <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${video.embedId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      ></iframe>
                    </div>
                    <div className="video-info">
                      <div className="video-duration">{video.duration}</div>
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blogs Section */}
          {activeCategory === 'blogs' && (
            <div className="blogs-grid">
              <h2 className="resources-section-title">Articles & Blogs</h2>
              <p className="resources-section-subtitle">Read evidence-based articles on mental health topics relevant to students</p>
              
              <div className="blogs-container">
                {resources.blogs.map(blog => (
                  <div key={blog.id} className="blog-card">
                    <div className="blog-category">{blog.category}</div>
                    <h3>{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    <div className="blog-meta">
                      <span className="read-time">{blog.readTime}</span>
                      <Link to={`/blogs/${blog.id}`} className="read-more">Read More</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guides Section */}
{activeCategory === 'guides' && (
  <div className="guides-grid">
    <h2 className="resources-section-title">Mental Health Screening</h2>
    <p className="resources-section-subtitle">
      Take these brief self-assessment questionnaires to better understand your mental health
    </p>
    
    <div className="questionnaire-container">
      <div className="questionnaire-intro">
        <h3>PHQ-9 & GAD-7 Screening Tools</h3>
        <p>
          These are standard screening tools used by healthcare professionals. 
          Your responses are anonymous and not stored. This is for self-assessment only.
        </p>
      </div>
      
      <div className="questionnaire-tabs">
        <button 
          className={`questionnaire-tab ${activeQuestionnaire === 'phq9' ? 'active' : ''}`}
          onClick={() => setActiveQuestionnaire('phq9')}
        >
          PHQ-9 (Depression)
        </button>
        <button 
          className={`questionnaire-tab ${activeQuestionnaire === 'gad7' ? 'active' : ''}`}
          onClick={() => setActiveQuestionnaire('gad7')}
        >
          GAD-7 (Anxiety)
        </button>
      </div>
      
      {activeQuestionnaire === 'phq9' && (
        <PHQ9Questionnaire />
      )}
      
      {activeQuestionnaire === 'gad7' && (
        <GAD7Questionnaire />
      )}
    </div>
  </div>
)}
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="additional-resources">
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
                <i className="fas fa-comment"></i> Call 080-46110007	
              </a>
            </div>
            
            <div className="crisis-card">
              <h3>Emergency Services</h3>
              <p>If you're in immediate danger, please call 100</p>
              <a href="tel:911" className="crisis-link emergency">
                <i className="fas fa-exclamation-triangle"></i> Call 100
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (same as homepage) */}
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

export default Resources;
