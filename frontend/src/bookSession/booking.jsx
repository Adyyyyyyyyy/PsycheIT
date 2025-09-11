// import React, { useEffect } from "react";
// import "./booking.css";
// import NavBar from "../Navbar";

// const BookingPage = () => {
//   useEffect(() => {
//         const initCalendly = () => {
//       if (window.Calendly) {
//         window.Calendly.initInlineWidget({
//           url: 'https://calendly.com/ng9575-srmist?hide_gdpr_banner=1&text_color=000000&primary_color=002c42',
//           parentElement: document.querySelector('.calendly-inline-widget'),
//           prefill: {},
//           utm: {}
//         });
//       } else {
//         setTimeout(initCalendly, 30);
//       }
//     };

//     setTimeout(initCalendly, 10);
//   }, []);
//   return (
//     <div className="booking-page">
//       <NavBar />
      
//         <section className="booking-header">
//         <div className="container">
//           <div className="booking-header-content">
//             <div className="booking-header-text">
//               <h1>Book a Counseling Session</h1>
//               <p>Schedule a confidential session with our professional counselors. We're here to support your mental wellness journey.</p>
//             </div>
//             <div className="booking-header-image">
//               <img src="https://cdni.iconscout.com/illustration/premium/thumb/psychology-consultant-illustration-svg-png-download-4023754.png" alt="Counseling session" />
//             </div>
//           </div>
//         </div>
//       </section>

      
//       <section className="counselors-section">
//         <div className="container">
//           <div className="section-title">
//             <h2>Our Counselors</h2>
//             <p>Choose from our team of experienced mental health professionals</p>
//           </div>
          
//           <div className="counselors-grid">
//             <div className="counselor-card">
//               <div className="counselor-image">
//                 <img src="https://placehold.co/200x200/A5D6A7/002c42?text=Dr.+Smith" alt="Dr. Smith" />
//               </div>
//               <h3>Dr. Nandini Gangadharan</h3>
//               <p className="counselor-specialty">Anxiety & Depression Specialist</p>
//               <p className="counselor-bio">10+ years of experience with cognitive behavioral therapy.</p>
//               <button className="select-counselor-btn" data-counselor="jane-smith">Book with Dr. Gangadharan</button>
//             </div>
            
//             <div className="counselor-card">
//               <div className="counselor-image">
//                 <img src="https://placehold.co/200x200/A5D6A7/002c42?text=Dr.+Johnson" alt="Dr. Johnson" />
//               </div>
//               <h3>Dr. Meenal Singh</h3>
//               <p className="counselor-specialty">Relationship Counselor</p>
//               <p className="counselor-bio">Specializes in family dynamics and interpersonal relationships.</p>
//               <button className="select-counselor-btn" data-counselor="meenal-singh">Book with Dr. Singh</button>
//             </div>
            
//             <div className="counselor-card">
//               <div className="counselor-image">
//                 <img src="https://placehold.co/200x200/A5D6A7/002c42?text=Dr.+Garcia" alt="Dr. Garcia" />
//               </div>
//               <h3>Dr. Nidhi Pathak</h3>
//               <p className="counselor-specialty">Trauma & PTSD Specialist</p>
//               <p className="counselor-bio">EMDR trained therapist with focus on trauma recovery.</p>
//               <button className="select-counselor-btn" data-counselor="nidhi-pathak">Book with Dr. Pathak</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="calendly-section">
//         <div className="container">
//           <div className="calendly-container">
//             <h1>Schedule Your Session</h1>
//             <h2>Select an available time that works best for you</h2>
            
//             <div className="calendly-embed">
//               <div className="calendly-inline-widget" 
//                    style={{ minWidth: '320px', height: '700px' }} />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="booking-faq">
//         <div className="container">
//           <div className="section-title">
//             <h2>Frequently Asked Questions</h2>
//           </div>
          
//           <div className="faq-grid">
//             <div className="faq-item">
//               <h3>How do online sessions work?</h3>
//               <p>Our online sessions are conducted via secure video conferencing. After booking, you'll receive a confirmation email with a link to join your session.</p>
//             </div>
            
//             <div className="faq-item">
//               <h3>What should I prepare for my first session?</h3>
//               <p>Just come as you are. It might help to think about what you'd like to discuss, but your counselor will guide the conversation.</p>
//             </div>
            
//             <div className="faq-item">
//               <h3>Can I reschedule my appointment?</h3>
//               <p>Yes, you can reschedule up to 24 hours before your appointment through the link in your confirmation email.</p>
//             </div>
            
//             <div className="faq-item">
//               <h3>Is my information kept confidential?</h3>
//               <p>Absolutely. All sessions are confidential, and we adhere to strict privacy policies to protect your information.</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BookingPage;

import React, { useState, useEffect } from "react";
import "./booking.css";
import NavBar from "../Navbar";

const BookingPage = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  
  // Map counselors to their Calendly links
  const counselorCalendlyMap = {
    "nandini-gangadharan": "https://calendly.com/ng9575-srmist?hide_gdpr_banner=1&text_color=000000&primary_color=002c42",
    "meenal-singh": "https://calendly.com/0603meenalsingh?hide_gdpr_banner=1&text_color=000000&primary_color=002c42", 
    "nidhi-pathak": "https://calendly.com/your-username/nidhi-pathak"
  };

  // Load Calendly script dynamically
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Don't remove the script as it might be used by other components
    };
  }, []);

  // Function to initialize Calendly when a counselor is selected
  useEffect(() => {
    if (selectedCounselor) {
      const initWidget = () => {
        if (window.Calendly) {
          // Clear any existing widgets first
          const container = document.getElementById('calendly-container');
          if (container) {
            // Remove all existing content
            container.innerHTML = '';
            
            // Destroy any existing Calendly widgets
            if (window.Calendly.closePopupWidget) {
              window.Calendly.closePopupWidget();
            }
            
            // Wait a bit then initialize new widget
            setTimeout(() => {
              try {
                window.Calendly.initInlineWidget({
                  url: counselorCalendlyMap[selectedCounselor],
                  parentElement: container,
                  prefill: {},
                  utm: {}
                });
              } catch (error) {
                console.error('Error initializing Calendly widget:', error);
                // Fallback: Create iframe manually
                container.innerHTML = `<iframe src="${counselorCalendlyMap[selectedCounselor]}&embed_domain=localhost&embed_type=Inline" width="100%" height="630" frameborder="0" scrolling="no"></iframe>`;
              }
            }, 100);
          }
        } else {
          // Retry if Calendly hasn't loaded yet
          setTimeout(initWidget, 200);
        }
      };
      
      // Small delay to ensure DOM is ready
      setTimeout(initWidget, 10);
    }
  }, [selectedCounselor]);

  // Cleanup function when component unmounts
  useEffect(() => {
    return () => {
      // Clean up Calendly widgets when component unmounts
      const container = document.getElementById('calendly-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  const handleCounselorSelect = (counselorId) => {
    // Clear any existing Calendly widget before selecting new counselor
    const container = document.getElementById('calendly-container');
    if (container) {
      container.innerHTML = '';
    }
    
    setSelectedCounselor(counselorId);
    
    // Scroll to the Calendly section after a brief delay to allow state update
    setTimeout(() => {
      const calendlySection = document.querySelector('.calendly-section');
      if (calendlySection) {
        calendlySection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

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
              {selectedCounselor && (
                <div className="selected-counselor-banner">
                  <p>You're booking with: <strong>{getCounselorName(selectedCounselor)}</strong></p>
                  <button 
                    className="change-counselor-btn"
                    onClick={() => {
                      // Clear Calendly widget before changing counselor
                      const container = document.getElementById('calendly-container');
                      if (container) {
                        container.innerHTML = '';
                      }
                      setSelectedCounselor(null);
                    }}
                  >
                    Change Counselor
                  </button>
                </div>
              )}
            </div>
            <div className="booking-header-image">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/psychology-consultant-illustration-svg-png-download-4023754.png" alt="Counseling session" />
            </div>
          </div>
        </div>
      </section>

      {/* Counselor Selection - Only show if no counselor selected */}
      {!selectedCounselor && (
        <section className="counselors-section">
          <div className="container">
            <div className="section-title">
              <h2>Our Counselors</h2>
              <p>Choose from our team of experienced mental health professionals</p>
            </div>
            
            <div className="counselors-grid">
              <div className="counselor-card">
                <div className="counselor-image">
                  <img src="https://pbs.twimg.com/profile_images/1809119975791005696/mGXOSA0h_400x400.jpg" alt="Dr. Gangadharan" />
                </div>
                <h3>Dr. Nandini Gangadharan</h3>
                <p className="counselor-specialty">Anxiety & Depression Specialist</p>
                <p className="counselor-bio">10+ years of experience with cognitive behavioral therapy.</p>
                <button 
                  className="select-counselor-btn" 
                  onClick={() => handleCounselorSelect("nandini-gangadharan")}
                >
                  Book with Dr. Gangadharan
                </button>
              </div>
              
              <div className="counselor-card">
                <div className="counselor-image">
                  <img src="https://avatars.githubusercontent.com/u/165938200?v=4" alt="Dr. Singh" />
                </div>
                <h3>Dr. Meenal Singh</h3>
                <p className="counselor-specialty">Relationship Counselor</p>
                <p className="counselor-bio">Specializes in family dynamics and interpersonal relationships.</p>
                <button 
                  className="select-counselor-btn" 
                  onClick={() => handleCounselorSelect("meenal-singh")}
                >
                  Book with Dr. Singh
                </button>
              </div>
              
              <div className="counselor-card">
                <div className="counselor-image">
                  <img src="https://placehold.co/200x200/A5D6A7/002c42?text=Dr.+Pathak" alt="Dr. Pathak" />
                </div>
                <h3>Dr. Nidhi Pathak</h3>
                <p className="counselor-specialty">Trauma & PTSD Specialist</p>
                <p className="counselor-bio">EMDR trained therapist with focus on trauma recovery.</p>
                <button 
                  className="select-counselor-btn" 
                  onClick={() => handleCounselorSelect("nidhi-pathak")}
                >
                  Book with Dr. Pathak
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Calendly Embed Section - Only show if counselor selected */}
      {selectedCounselor && (
        <section className="calendly-section">
          <div className="container">
            <div className="calendly-container">
              <h2>Schedule Your Session with {getCounselorName(selectedCounselor)}</h2>
              <p>Select an available time that works best for you</p>
              
              <div id="calendly-container" className="calendly-embed">
                {/* Calendly widget will be injected here */}
              </div>
            </div>
          </div>
        </section>
      )}

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

// Helper function to get counselor name from ID
function getCounselorName(counselorId) {
  const counselorNames = {
    "nandini-gangadharan": "Dr. Nandini Gangadharan",
    "meenal-singh": "Dr. Meenal Singh",
    "nidhi-pathak": "Dr. Nidhi Pathak"
  };
  
  return counselorNames[counselorId] || "Selected Counselor";
}

export default BookingPage;