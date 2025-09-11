import React, { useEffect } from "react";
import "./booking.css";
import NavBar from "../Navbar";

const BookingPage = () => {
  useEffect(() => {
    // Initialize Calendly widget when component mounts
    const initCalendly = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/ng9575-srmist?hide_gdpr_banner=1&text_color=000000&primary_color=002c42',
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {},
          utm: {}
        });
      } else {
        // If Calendly script hasn't loaded yet, wait and try again
        setTimeout(initCalendly, 30);
      }
    };

    // Small delay to ensure the DOM element exists
    setTimeout(initCalendly, 10);
  }, []);
  return (
    <div className="booking-page">
      <NavBar />
      
      {/* Header Section */}
      <section className="booking-header">
        <div className="container">
          <div className="booking-header-content">
            <div className="booking-header-text">
              <h1>Book a Counseling Session</h1>
              <p>Schedule a confidential session with our professional counselors. We're here to support your mental wellness journey.</p>
            </div>
            <div className="booking-header-image">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/psychology-consultant-illustration-svg-png-download-4023754.png" alt="Counseling session" />
            </div>
          </div>
        </div>
      </section>

      {/* Counselor Selection */}
      <section className="counselors-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Counselors</h2>
            <p>Choose from our team of experienced mental health professionals</p>
          </div>
          
          <div className="counselors-grid">
            <div className="counselor-card">
              <div className="counselor-image">
                <img src="https://placehold.co/200x200/A5D6A7/002c42?text=Dr.+Smith" alt="Dr. Smith" />
              </div>
              <h3>Dr. Jane Smith</h3>
              <p className="counselor-specialty">Anxiety & Depression Specialist</p>
              <p className="counselor-bio">10+ years of experience with cognitive behavioral therapy.</p>
              <button className="select-counselor-btn" data-counselor="jane-smith">Book with Dr. Smith</button>
            </div>
            
            <div className="counselor-card">
              <div className="counselor-image">
                <img src="https://placehold.co/200x200/A5D6A7/002c42?text=Dr.+Johnson" alt="Dr. Johnson" />
              </div>
              <h3>Dr. Michael Johnson</h3>
              <p className="counselor-specialty">Relationship Counselor</p>
              <p className="counselor-bio">Specializes in family dynamics and interpersonal relationships.</p>
              <button className="select-counselor-btn" data-counselor="michael-johnson">Book with Dr. Johnson</button>
            </div>
            
            <div className="counselor-card">
              <div className="counselor-image">
                <img src="https://placehold.co/200x200/A5D6A7/002c42?text=Dr.+Garcia" alt="Dr. Garcia" />
              </div>
              <h3>Dr. Maria Garcia</h3>
              <p className="counselor-specialty">Trauma & PTSD Specialist</p>
              <p className="counselor-bio">EMDR trained therapist with focus on trauma recovery.</p>
              <button className="select-counselor-btn" data-counselor="maria-garcia">Book with Dr. Garcia</button>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section className="calendly-section">
        <div className="container">
          <div className="calendly-container">
            <h1>Schedule Your Session</h1>
            <h2>Select an available time that works best for you</h2>
            
            <div className="calendly-embed">
              {/* Calendly inline widget */}
              <div className="calendly-inline-widget" 
                   style={{ minWidth: '320px', height: '700px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="booking-faq">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do online sessions work?</h3>
              <p>Our online sessions are conducted via secure video conferencing. After booking, you'll receive a confirmation email with a link to join your session.</p>
            </div>
            
            <div className="faq-item">
              <h3>What should I prepare for my first session?</h3>
              <p>Just come as you are. It might help to think about what you'd like to discuss, but your counselor will guide the conversation.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I reschedule my appointment?</h3>
              <p>Yes, you can reschedule up to 24 hours before your appointment through the link in your confirmation email.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is my information kept confidential?</h3>
              <p>Absolutely. All sessions are confidential, and we adhere to strict privacy policies to protect your information.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;