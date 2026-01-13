import { useState, useEffect, useRef } from 'react';
import './Menu.css';
import { Link, useNavigate } from 'react-router-dom';
import ContactModal from '../../components/ContactModal/ContactModal';
const Menu = () => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [displayContent, setDisplayContent] = useState(false);
  const [initProgress, setInitProgress] = useState(0);

  const mainEllipseRef = useRef(null);
  const mainAnimationRef = useRef(null);

  const getViewportDimensions = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      return { width: 353, height: 114, viewBox: "0 0 353 114", cx: 176.5, cy: 57, rx: 176.5, ry: 57 };
    } else if (screenWidth <= 1024) {
      return { width: 984, height: 316, viewBox: "0 0 984 316", cx: 492, cy: 158, rx: 492, ry: 158 };
    } else {
      return { width: 1400, height: 450, viewBox: "0 0 1400 450", cx: 700, cy: 225, rx: 700, ry: 225 };
    }
  };

  const viewportDims = getViewportDimensions();

  // Initial oval animation with progress counter
  useEffect(() => {
    const ellipse = mainEllipseRef.current;
    if (!ellipse) return;

    const { rx, ry } = viewportDims;
    const perimeter = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));

    ellipse.style.strokeDasharray = `${perimeter}`;
    ellipse.style.strokeDashoffset = `${perimeter}`;

    const animDuration = 2000;
    const startTime = performance.now();

    function animate(currentTime) {
      const progress = Math.min(1, (currentTime - startTime) / animDuration);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      ellipse.style.strokeDashoffset = `${-perimeter * (1 - easedProgress)}`;
      setInitProgress(Math.floor(easedProgress * 100));

      if (progress < 1) {
        mainAnimationRef.current = requestAnimationFrame(animate);
      } else {
        ellipse.style.strokeDashoffset = `0`;
        setInitProgress(100);
        setTimeout(() => {
          setIsInitializing(false);
          setDisplayContent(true);
        }, 300);
      }
    }

    mainAnimationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(mainAnimationRef.current);
  }, []);

  return (
    <div className="scout-wrapper">
      {/* Header Section */}
      <div className={`header-brand ${displayContent ? 'visible' : ''}`}>
        <h1 className="brand-title" onClick={()=> navigate("/")}>SCOUT</h1>
        <p className="brand-subtitle">
          SCOUT brings everything together in one calm, web-based space.
        </p>
        <button className="waitlist-btn">Join waitlist</button>
      </div>

      {/* Center Ellipse */}
      <div className="ellipse-wrapper">
        <div className={`ellipse-core ${isInitializing ? 'initializing' : 'initialized'}`}>
          {/* {isInitializing && <div className="progress-counter">{String(initProgress).padStart(3, '0')}</div>} */}

          {!isInitializing && (
            <div className="category-display-area">
              <div className="category-text">#ANTICHAOS</div>
              <div className="category-text">PROBLEMS & SOLUTIONS</div>
              <div className="category-text">ABOUT SCOUT</div>
              <div className="category-text">FAQ</div>
            </div>
          )}
        </div>

        {/* SVG Border */}
        <svg className={`ellipse-border ${!isInitializing ? 'fade-away' : ''}`} viewBox={viewportDims.viewBox} preserveAspectRatio="xMidYMid meet">
          <ellipse
            ref={mainEllipseRef}
            cx={viewportDims.cx}
            cy={viewportDims.cy}
            rx={viewportDims.rx}
            ry={viewportDims.ry}
            fill="none"
            stroke="#808080"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom Right Stats */}
      <div className={`stats-section ${displayContent ? 'visible' : ''}`}>
        <div className="stat-item">
          <div className="stat-label">Let's stop juggling</div>
          <div className="stat-value">15 apps</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Let's stop wasting</div>
          <div className="stat-value">10 hr/wk</div>
        </div>
      </div>

      {/* Footer Links */}
      <div className={`footer-links ${displayContent ? 'visible' : ''}`}>
        <button className="footer-link">LINKEDIN</button>
        <button className="footer-link">INSTAGRAM</button>
        <button className="footer-link" onClick={() => setIsContactOpen(true)}
  >CONTACT</button>
      </div>

      {/* Close Button */}
      <button className={`close-btn ${displayContent ? 'visible' : ''}`}><Link to="/">CLOSE</Link></button>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default Menu;