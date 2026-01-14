import React, { useState, useRef } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('form');
  const [isExiting, setIsExiting] = useState(false);
  
  // Refs for tracking mouse position on each button
  const copyBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  
  const email = "hello@explorenomad.com";

  if (!isOpen) return null;

  // Mouse move handler to update the --x CSS variable
  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    ref.current.style.setProperty('--x', `${x}%`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsExiting(true);
    setTimeout(() => {
      setView('success');
      setIsExiting(false);
    }, 400);
  };

  const handleFinalClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
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
              <p className="contact-description">— Ishan, Founder</p>
            </div>
            <div className="contact-footer">
              <div className="contact-email-row">
                <span className="email-label">Email</span>
                <span className="email-value">{email}</span>
              </div>
              <button 
                className="contact-copy-btn" 
                onClick={handleCopy}
                ref={copyBtnRef}
                onMouseMove={(e) => handleMouseMove(e, copyBtnRef)}
              >
                <div className="cta-fill"></div>
                <span>Copy email</span>
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
            <button 
              className="contact-copy-btn" 
              onClick={handleFinalClose}
              ref={closeBtnRef}
              onMouseMove={(e) => handleMouseMove(e, closeBtnRef)}
            >
              <div className="cta-fill"></div>
              <span>Close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;