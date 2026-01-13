import React, { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('form'); // 'form' or 'success'
  const [isExiting, setIsExiting] = useState(false);
  const email = "hello@explorenomad.com";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsExiting(true);
    
    // Wait for slide-out animation before switching view
    setTimeout(() => {
      setView('success');
      setIsExiting(false);
    }, 400);
  };

  const handleFinalClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      // Reset view to form for the next time it's opened
      setView('form');
      setIsExiting(false);
    }, 400);
  };

  return (
    <div className="contact-overlay" onClick={handleFinalClose}>
      <div 
        className={`contact-modal ${isExiting ? 'animate-out' : 'animate-in'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {view === 'form' ? (
          <div className='contact'>
          <div>
            <h2 className="contact-title">Contact</h2>
            <p className="contact-description">
              Our mission is to give you every possible solution for life on the road. 
              If you believe in what we're building, you can help us shape it.
            </p>
            <p className="contact-description">
              You can also contact me anytime for any questions and clarifications.
            </p>
            <p className="contact-description">
            — Ishan, Founder
            </p>
            </div>
            <div className="contact-footer">
              <div className="contact-email-row">
                <span className="email-label">Email</span>
                <span className="email-value">{email}</span>
              </div>
              <button className="contact-copy-btn" onClick={handleCopy}>
                Copy email
              </button>
            </div>
          </div>
        ) : (
          <div className="success-view">
            <div>
            <h2 className="contact-title">Email Copied</h2>
            <p className="contact-description">
              Whether it's a question or just a thought on how we can improve, my inbox is always open.
            </p>
            <p className="contact-description">
              I read every message and I'll get back to you personally as soon as I can. Looking forward to our conversation.
            </p>
            <p className="founder-sig">— Ishan, Founder</p>
            </div>
            <button className="contact-copy-btn" onClick={handleFinalClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;