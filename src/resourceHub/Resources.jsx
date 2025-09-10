import { useState } from 'react'
import "./ResourcesPage.css";
import NavBar from "../Navbar";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("videos");
  const resources = {
    videos: [
      {
        id: 1,
        title: "How To STOP Letting Social Anxiety Control You",
        description: "Social anxiety can be overwhelming, but with the right strategies, you can take back control of your life and start feeling more confident in social situations. Some practical tips on how to cope with social anxiety, recognize its triggers, and manage anxiety problems effectively. ",
        embedId: "wbroM1Di-bI",
        duration: "06:24"
      },
      {
        id: 2,
        title: "10 Habits That Boost Your Emotional Well-being",
        description: "We all have negative habits, but now it’s time to start incorporating some mentally beneficial behaviors into our routines in hopes we can develop a new habit - a good one this time. Here are a few mental health tips that boost your emotional well-being.",
        embedId: "hXlFxceM4R8",
        duration: "10:39"
      },
      {
        id: 3,
        title: "Exam Stress: A Serious Mental Health Concern",
        description: "Dr Aruna Broota, Clinical Psychologist, is telling you why exam pressure and anxiety should not be taken lightly. What role can parents play in reducing stress? Why are all-nighters before exams a bad move? And tips to cope with exam jitters.",
        embedId: "sAnRwCu8YLw",
        duration: "11:06"
      },
      {
        id: 4,
        title: "Mental Health Wellness Tips",
        description: "Practical ways to achieve better mental health and balance in your life, such as practicing gratitude, connecting with others, and maintaining physical health.",
        embedId: "NQcYZplTXnQ",
        duration: "3:37"
      }
      
    ],
    blogs: [
      {
        id: 1,
        title: "10 Signs You Might Be Experiencing Burnout",
        excerpt: "Academic burnout is more than just feeling tired. Learn to recognize the signs before it affects your health and grades...",
        readTime: "5 min read",
        category: "Self-Care"
      },
      {
        id: 2,
        title: "How to Support a Friend with Mental Health Challenges",
        excerpt: "When someone you care about is struggling, it can be hard to know how to help. These evidence-based approaches can make a difference...",
        readTime: "7 min read",
        category: "Relationships"
      },
      {
        id: 3,
        title: "The Science Behind Meditation and Stress Reduction",
        excerpt: "Research shows that regular meditation practice can physically change your brain. Here's what the studies reveal...",
        readTime: "8 min read",
        category: "Mindfulness"
      },
      {
        id: 4,
        title: "Navigating Social Anxiety in College Settings",
        excerpt: "Parties, group projects, and presentations can trigger social anxiety. Learn practical strategies to manage these situations...",
        readTime: "6 min read",
        category: "Anxiety"
      }
    ],
    guides: [
      {
        id: 1,
        title: "Crisis Resource Handbook",
        description: "Immediate steps and resources for mental health emergencies",
        downloadLink: "#",
        pages: "12",
        format: "PDF"
      },
      {
        id: 2,
        title: "Daily Wellness Checklist",
        description: "A printable tracker for maintaining mental wellness habits",
        downloadLink: "#",
        pages: "5",
        format: "PDF"
      },
      {
        id: 3,
        title: "Campus-Specific Mental Health Resources",
        description: "Directory of support services available at your institution",
        downloadLink: "#",
        pages: "8",
        format: "PDF"
      },
      {
        id: 4,
        title: "Breathing Exercise Guide",
        description: "Step-by-step instructions for anxiety-reducing breathing techniques",
        downloadLink: "#",
        pages: "6",
        format: "PDF"
      }
    ]
  };

  return (
    <div className="resources-page">
      <NavBar/>
      <header className="resources-header">
        <div className="resources-header-content">
          <div className="resources-header-text">
            <h1>Mental Health Resources</h1>
            <p>Access videos, articles, and guides to support your mental wellness journey. All resources are carefully curated by mental health professionals.</p>
          </div>
          <div className="resources-header-image">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/mental-health-illustration-svg-png-download-3016778.png" 
              alt="Mental wellness resources" 
            />
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
              <i className="fas fa-book"></i> Guides & Worksheets
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
                      <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guides Section */}
          {activeCategory === 'guides' && (
            <div className="guides-grid">
              <h2 className="resources-section-title">Guides & Worksheets</h2>
              <p className="resources-section-subtitle">Download these practical resources to support your mental health journey</p>
              
              <div className="guides-container">
                {resources.guides.map(guide => (
                  <div key={guide.id} className="guide-card">
                    <div className="guide-icon">
                      <i className="fas fa-file-pdf"></i>
                    </div>
                    <div className="guide-info">
                      <h3>{guide.title}</h3>
                      <p>{guide.description}</p>
                      <div className="guide-meta">
                        <span>{guide.pages} pages • {guide.format}</span>
                      </div>
                    </div>
                    <a href={guide.downloadLink} className="download-btn">
                      <i className="fas fa-download"></i> Download
                    </a>
                  </div>
                ))}
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
              <h3>National Crisis Hotline</h3>
              <p>Call or text 988 anytime for free, confidential support</p>
              <a href="tel:988" className="crisis-link">
                <i className="fas fa-phone"></i> Call 988
              </a>
            </div>
            
            <div className="crisis-card">
              <h3>Crisis Text Line</h3>
              <p>Text HOME to 741741 to connect with a crisis counselor</p>
              <a href="sms:741741" className="crisis-link">
                <i className="fas fa-comment"></i> Text 741741
              </a>
            </div>
            
            <div className="crisis-card">
              <h3>Emergency Services</h3>
              <p>If you're in immediate danger, please call 911</p>
              <a href="tel:911" className="crisis-link emergency">
                <i className="fas fa-exclamation-triangle"></i> Call 911
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
