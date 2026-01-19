import { useState, useEffect, useRef } from "react";
import { footerCountries } from "../../assets/footerData.js";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import ContactModal from "../ContactModal/ContactModal.jsx";

const Footer = () => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [countryIndex, setCountryIndex] = useState(0);
  const [time, setTime] = useState(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: footerCountries[0].timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date())
  );

  const currentCountry = footerCountries[countryIndex];

  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealedImages, setRevealedImages] = useState(0);

  const footerImages = [
    "/img1.jpg","/img2.jpg","/img3.jpg","/img4.jpg",
    "/img5.jpg","/img2.jpg","/img3.jpg","/img4.jpg",
    "/img5.jpg","/img1.jpg","/img2.jpg","/img3.jpg",
    "/img5.jpg","/img2.jpg","/img3.jpg","/img4.jpg",
    "/img5.jpg","/img1.jpg","/img2.jpg","/img3.jpg",
  ];

  const [footerAngles, setFooterAngles] = useState([]);
  const [footerPaused, setFooterPaused] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const footerAnimationRef = useRef(null);

  // Live time update
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: currentCountry.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [currentCountry]);

 // Update Preload Logic to use .src
 useEffect(() => {
  const preloadCountryImages = async (countryIdx) => {
    setIsLoading(true);
    setLoadProgress(0);
    setRevealedImages(0);

    const images = footerCountries[countryIdx].images; // Array of objects now
    let loaded = 0;

    for (let i = 0; i < images.length; i++) {
      await new Promise((resolve) => {
        const img = new Image();
        img.src = images[i].src; // Access the .src property

        img.onload = () => {
          loaded++;
          setRevealedImages(loaded);
          setLoadProgress(Math.round((loaded / images.length) * 100));
          setTimeout(resolve, 80);
        };
        img.onerror = resolve;
      });
    }
    setIsLoading(false);
  };
  preloadCountryImages(0);
}, []);

// Update handleShuffle Logic to use .src
const handleShuffle = async () => {
  if (isLoading) return;
  const nextIndex = (countryIndex + 1) % footerCountries.length;
  const images = footerCountries[nextIndex].images;
  
  let loaded = 0;
  setIsLoading(true);
  setRevealedImages(0);
  setLoadProgress(0);

  for (let i = 0; i < images.length; i++) {
    await new Promise((resolve) => {
      const img = new Image();
      img.src = images[i].src; // Access the .src property
      img.onload = () => {
        loaded++;
        setRevealedImages(loaded);
        setLoadProgress(Math.round((loaded / images.length) * 100));
        setTimeout(resolve, 80);
      };
      img.onerror = resolve;
    });
  }
  setCountryIndex(nextIndex);
  setIsLoading(false);
};

  // Initialize footer angles
  useEffect(() => {
    const initialAngles = footerImages.map((_, index) => {
      // Reverse the order for anticlockwise
      return ((footerImages.length - 1 - index) / footerImages.length) * 2 * Math.PI;
    });
    setFooterAngles(initialAngles);
  }, []);
  

  const handleFooterImageEnter = (index) => {
    setFooterPaused(true);
    setActiveImageIndex(index);
  };

  const handleFooterImageLeave = () => {
    setFooterPaused(false);
    setActiveImageIndex(null);
  };

  // Footer rotation animation
  useEffect(() => {
    const animateFooter = () => {
      if (!footerPaused) {
        setFooterAngles((prevAngles) =>
          prevAngles.map((angle) => (angle - 0.0005 + 2 * Math.PI) % (2 * Math.PI))
        );
      }
      footerAnimationRef.current = requestAnimationFrame(animateFooter);
    };
    footerAnimationRef.current = requestAnimationFrame(animateFooter);
    return () => cancelAnimationFrame(footerAnimationRef.current);
  }, [footerPaused]);

  const getFooterImagePosition = (angle) => {
    const radiusX = 450;
    const radiusY = 160;
    const tiltRadians = -12 * (Math.PI / 180);

    const posX = radiusX * Math.cos(angle);
    const posY = radiusY * Math.sin(angle);

    const transformedX = posX * Math.cos(tiltRadians) - posY * Math.sin(tiltRadians);
    const transformedY = posX * Math.sin(tiltRadians) + posY * Math.cos(tiltRadians);

    return { x: transformedX, y: transformedY, zIndex: 100 };
  };

  return (
    <footer className="footer-root">
      {/* TOP BAR */}
      <div className="footer-bar-new">
        <span className="footer-link-left" onClick={() => navigate('/terms')}>TERMS</span>

        <div className="footer-center-new">
          <span>{isLoading ? "LOADING" : `${currentCountry.name} · ${time}`}</span>

          <span className="footer-shuffle" onClick={handleShuffle}>
            {isLoading ? <span>{loadProgress}</span> : <img src="./suffle.png" alt="" />}
          </span>
        </div>

        <span className="footer-link-right" onClick={() => navigate('/privacy-policy')}>PRIVACY POLICY</span>
      </div>

      {/* COLLAGE / ORBIT */}
      <div className="footer-orbit-wrapper">
        <div className="footer-orbit-stage">
          {footerAngles.map((angle, index) => {
            const { x, y, zIndex } = getFooterImagePosition(angle);
            const isRevealed = index < revealedImages;
            const imageData = currentCountry.images[index];

            return (
              <div
                key={`${countryIndex}-${index}`}
                className={`footer-orbit-card ${isRevealed ? "is-revealed" : "is-skeleton"}`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  zIndex,
                }}
                onMouseEnter={() => handleFooterImageEnter(index)}
                onMouseLeave={handleFooterImageLeave}
              >
                {isRevealed && (
                  <div className="footer-card-inner">
                    <img src={imageData.src} alt={imageData.text} />
                    <div className="footer-card-overlay">
                      <span className="footer-card-text">{imageData.text}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="footer-brand">SCOUT</div>
      </div>

      {/* BOTTOM NAV */}
      {/* BOTTOM NAV */}
{/* BOTTOM NAV */}
<div className="footer-bottom-new">
  <div className="footer-mobile-legal">
    <a onClick={() => navigate('/terms')}>TERMS</a>
    <a onClick={() => navigate('/privacy-policy')}>PRIVACY POLICY</a>
  </div>

  <div className="footer-socials-new">
    <a href="https://www.linkedin.com/company/explorenomadglobal/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
    <a href="https://www.instagram.com/explorenomad" target="_blank" rel="noopener noreferrer">
  INSTAGRAM
</a>

    <a  href="mailto:info@explorenomad.com?subject=Inquiry from ExploreNomad" onClick={() => setIsContactOpen(true)} style={{cursor: 'pointer'}}>CONTACT</a>
  </div>

  <div className="footer-nav-new">
    <a href="#movement">#ANTICHAOS</a>
    <a href="#problems">PROBLEMS & SOLUTIONS</a>
    <a href="#about">ABOUT SCOUT</a>
    {/* FAQ removed to match your latest screenshot if needed */}
  </div>
</div>
<ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};

export default Footer;
