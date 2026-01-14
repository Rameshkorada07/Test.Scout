import { useState, useEffect, useRef } from "react";
import React from "react";
import "./JoinWaitlist.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const JoinWaitlist = () => {
  const [details, setDetails] = useState({ name: "", email: "", nomadType: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showNomadModal, setShowNomadModal] = useState(false);

  const navigate = useNavigate();

  const joinBtnRef = useRef(null);
  const selectBtnRef = useRef(null);

  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    ref.current.style.setProperty('--x', `${x}%`);
  };

  const images = [
    { src: "/waitlist-1.jpg", label: "Aix-en-Provence, France" },
    { src: "/waitlist-2.jpg", label: "Phuket, Thailand" },
    { src: "/waitlist-3.jpg", label: "Porto, Portugal" },
    { src: "/waitlist-4.jpg", label: "Puebla, Mexico" },
    { src: "/waitlist-5.jpg", label: "Oia, Greece" },
    { src: "/waitlist-6.jpg", label: "Tallinn, Estonia" },
    { src: "/waitlist-7.jpg", label: "Ninh Binh, Vietnam" },
    { src: "/waitlist-8.jpg", label: "Genoa, Italy" },
    { src: "/waitlist-9.jpg", label: "Dhërmi, Albania" },
    { src: "/waitlist-10.jpg", label: "Weinheim, Germany" }
  ];
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCenterBox, setShowCenterBox] = useState(true);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

// 1. Add these new states
const [isExitingModal, setIsExitingModal] = useState(false);
const [isExitingCard, setIsExitingCard] = useState(false);

// 2. Updated Toggle for the Card
const toggleCenterBox = () => {
  if (showCenterBox) {
    setIsExitingCard(true); // Trigger CSS animation
    setTimeout(() => {
      setShowCenterBox(false); // Remove from DOM after 400ms
      setIsExitingCard(false); // Reset for next time
    }, 400); 
  } else {
    setShowCenterBox(true);
  }
};

// 3. Updated Toggle for the Modal
const closeModal = () => {
  setIsExitingModal(true); // Trigger CSS animation
  setTimeout(() => {
    setShowNomadModal(false); // Remove from DOM after 400ms
    setIsExitingModal(false); // Reset for next time
  }, 400);
};

  return (
    <div>
    <div className="waitlist-section">
      <button className="menu-btn" onClick={() => navigate("/menu")}>
          MENU
        </button>

      {/* Top Right Explore Link */}
      {/* <p className="top-right-link always-visible">
        Product of{" "}
        <button onClick={() => navigate("/explore-nomad")}>
          Explore Nomad
        </button>
      </p> */}

      {/* LEFT SIDE */}
      <div className="waitlist-left">
        <h1 className="heading" onClick={() => navigate("/")}>SCOUT.</h1>

        <div className="waitlist-form">
          {submitted ? (
            <div className="thank-you">
              <h1>Thank You!</h1>
              <p>
                Welcome to the Anti-Chaos Movement. Check your email to confirm
                and receive your unique explorer number.
              </p>
              <p className="founder-name">- Ishan, Founder</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                required
              />

              {/* NEW FIELD */}
              <div className="nomad-input-wrapper" onClick={() => setShowNomadModal(true)}>
  <input
    type="text"
    placeholder="Nomad Type"
    value={details.nomadType}
    readOnly
  />
  <span className="nomad-plus">+</span>
</div>


              <input
                type="email"
                placeholder="Email"
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                required
              />

<button 
      type="submit" 
      className="join-waitlist-btn"
      ref={joinBtnRef}
      onMouseMove={(e) => handleMouseMove(e, joinBtnRef)}
    >
      <div className="cta-fill"></div> {/* Add this div for the fill */}
      <span>Join Waitlist</span>
    </button>
            </form>
          )}
        </div>

        <div className="waitlist-bottom">
          <p>The all in one place built for digital nomads by digital nomads</p>
          <span>↓</span>
        </div>
      </div>

      {/* NOMAD TYPE MODAL */}
      {showNomadModal && (
  <div
    className={`nomad-modal-overlay ${isExitingModal ? "fade-out-overlay" : ""}`}
    onClick={closeModal} // Use new closeModal function
  >
    <div
      className={`nomad-modal ${isExitingModal ? "animate-exit" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >


      <h2>Select your Nomad type</h2>
      <p className="modal-subtitle">
        Select the option that you feel best fits your current needs.
        You can always change later via app or email.
      </p>

      <div className="nomad-options-scroll">
        {[
          {
            title: "THE EXPLORER",
            desc: "Loves discovering new places frequently through short trips, seeking adventure and new experiences."
          },
          {
            title: "THE REMOTE WORKER",
            desc: "Prioritizes stable workspaces and reliable internet, balancing travel with productivity."
          },
          {
            title: "THE SLOW TRAVELER",
            desc: "Prefers longer stays, immersing in local culture and routines."
          },
          {
            title: "THE DIGITAL NOMAD",
            desc: "Works fully online while traveling across countries."
          },
          {
            title: "THE ENTREPRENEUR",
            desc: "Builds and scales businesses remotely."
          },
          {
            title: "THE CREATOR",
            desc: "Creates content, art, or media while traveling."
          }
        ].map((option, index) => (
          <div
            key={index}
            className={`nomad-option ${
              details.nomadType === option.title ? "active" : ""
            }`}
            onClick={() =>
              setDetails({ ...details, nomadType: option.title })
            }
          >
            <h4>{option.title}</h4>
            <p>{option.desc}</p>
          </div>
        ))}
      </div>

      <button
      className={`select-btn ${details.nomadType ? "enabled" : "disabled"}`}
      disabled={!details.nomadType}
      ref={selectBtnRef}
      onMouseMove={(e) => handleMouseMove(e, selectBtnRef)}
      onClick={closeModal}
    >
      <div className="cta-fill"></div> {/* Add this div for the fill */}
      <span>Select</span>
    </button>

    </div>
    </div>

)}


      {/* RIGHT SIDE */}
      <div
        className="waitlist-right"
        style={{
          backgroundImage: `url(${images[currentIndex].src})`
        }}
      >
        {/* TOP LEFT HIDE / SHOW */}
        <div className="right-layer">
        <button
  className="hide-btn"
  onClick={toggleCenterBox}
>
  {showCenterBox ? "Hide" : "Show"}
</button>

{showCenterBox && (
  <div className={`waitlist-card ${isExitingCard ? "animate-exit" : ""}`}>
          <div className="waitlist-card-content">
            <h4 className="waitlist-heading">
              SCOUT BRINGS EVERYTHING TOGETHER IN ONE CALM, WEB-BASED
              SPACE. BY JOINING OUR WAITLIST, YOU'LL:
            </h4>
        
            <ul className="waitlist-features">
              <li>Help decide what we build first</li>
              <li>Get early access to SCOUT</li>
              <li>Become a founding member</li>
              <li>Join our Nomad community</li>
            </ul>
        
            <div className="waitlist-btn-spacer"></div>
        
            <div className="waitlist-stats-container">
              <div className="waitlist-stat-box">
                <span className="waitlist-stat-label">LET'S STOP PAYING</span>
                <div className="waitlist-stat-number">15 apps</div>
              </div>
        
              <div className="waitlist-stat-box">
                <span className="waitlist-stat-label">LET'S STOP WASTING</span>
                <div className="waitlist-stat-number">10 hr/wk</div>
              </div>
            </div>
          </div>
        </div>
      
        )}

        {/* IMAGE CONTROLS */}
        <div className="image-controls">
          <button onClick={prevImage}>←</button>
          <button onClick={nextImage}>→</button>
        </div>

        {/* LOCATION LABEL */}
        <p className="location-label">
          {images[currentIndex].label}
        </p>
      </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default JoinWaitlist;
