import { useState, useEffect, useRef } from 'react'; 
import './LoadingReveal.css';
import { useNavigate } from "react-router-dom";

const LoadingReveal = () => {
  const navigate = useNavigate();

  // Image data with location labels
  const imageData = [
    {
      image: "/1 Madrid, Spain.jpg",
      city: "Madrid",
      country: "Spain"
    },
    {
      image: "/2 Phuket, Thailand.jpg",
      city: "Phuket",
      country: "Thailand"
    },
    {
      image: "/3 Lisbon, Portugal.jpg",
      city: "Lisbon",
      country: "Portugal"
    },
    {
      image: "/4 Mexico City, México.jpg",
      city: "Mexico City",
      country: "México"
    },
    {
      image: "/5 Tbilisi, Georgia.jpg",
      city: "Tbilisi",
      country: "Georgia"
    },
    {
      image: "/6 Dronten, Netherlands.jpg",
      city: "Dronten",
      country: "Netherlands"
    },
    {
      image: "/7 Hakone, Japan.jpg",
      city: "Hakone",
      country: "Japan"
    },
    {
      image: "/8 Hanoi, Vietnam.jpg",
      city: "Hanoi",
      country: "Vietnam"
    },
    {
      image: "/9 Belgrade, Serbia.jpg",
      city: "Belgrade",
      country: "Serbia"
    },
    {
      image: "/10 Briançon, France.jpg",
      city: "Briançon",
      country: "France"
    }
  ];
  

  const [isLoading, setIsLoading] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOrbitAnimating, setIsOrbitAnimating] = useState(false);
  const [imageFade, setImageFade] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  const ellipseRef = useRef(null);
  const heroOrbitEllipseRef = useRef(null);
  const rafRef = useRef(null);
  const logoHoverEllipseRef = useRef(null);
  const menuHoverEllipseRef = useRef(null);


  
// useEffect(() => {
//   if (!isExpanding) return;
//   const timer = setTimeout(() => {
//     setShowHero(true);
//   }, 1200); 

//   return () => clearTimeout(timer);
// }, [isExpanding]);



  const getResponsiveDimensions = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      return { width: 353, height: 114, viewBox: "0 0 353 114", cx: 176.5, cy: 57, rx: 176.5, ry: 57 };
    } else if (screenWidth <= 1024) {
      return { width: 984, height: 316, viewBox: "0 0 984 316", cx: 492, cy: 158, rx: 492, ry: 158 };
    } else {
      return { width: 1400, height: 450, viewBox: "0 0 1400 450", cx: 700, cy: 225, rx: 700, ry: 225 };
    }
  };

  const dimensions = getResponsiveDimensions();

  // Initial oval drawing with loading numbers
  useEffect(() => {
    const el = ellipseRef.current;
    if (!el) return;

    const { rx, ry } = dimensions;
    const circumference = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));

    el.style.strokeDasharray = `${circumference}`;
    el.style.strokeDashoffset = `${circumference}`;

    const totalDuration = 2000;
    const start = performance.now();

    function step(now) {
      const t = Math.min(1, (now - start) / totalDuration);
      const eased = 1 - Math.pow(1 - t, 3);

      el.style.strokeDashoffset = `${-circumference * (1 - eased)}`;
      setLoadingProgress(Math.floor(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        el.style.strokeDashoffset = `0`;
        setLoadingProgress(100);
        // Small pause, then trigger the oval expansion
        setTimeout(() => {
          setIsLoading(false);
          setIsExpanding(true);
        }, 300);
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (!isExpanding) return;

    // Match this duration with the CSS `ovalExpand` animation
    const EXPAND_DURATION = 800;
    const timer = setTimeout(() => {
      setShowHero(true);
      // Start the first orbit animation
      setTimeout(() => {
        setIsOrbitAnimating(true);
      }, 100);
    }, EXPAND_DURATION);

    return () => clearTimeout(timer);
  }, [isExpanding]);

  // Cycle through images and restart orbit animation
  useEffect(() => {
    if (!showHero) return;

    const CYCLE_DURATION = 6000; // 6 seconds per image
    const interval = setInterval(() => {
      setIsOrbitAnimating(false);
      setImageFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imageData.length);
        setImageFade(false);
        setTimeout(() => {
          setIsOrbitAnimating(true);
        }, 50);
      }, 300);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, [showHero, imageData.length]);

  useEffect(() => {
    if (!showHero || !isOrbitAnimating) return;
  
    const backEl = heroOrbitEllipseRef.current;
    const frontEl = document.querySelector('.front-sync'); // Target the front layer
    if (!backEl || !frontEl) return;
  
    const circumference = backEl.getTotalLength(); 
    
    // Set initial state for both
    [backEl, frontEl].forEach(el => {
      el.style.strokeDasharray = `${circumference}`;
      el.style.strokeDashoffset = `${-circumference}`; // Anti-clockwise as requested
    });
  
    const duration = 7000;
    const start = performance.now();
  
    function animate(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const offset = -circumference * (1 - eased);
  
      backEl.style.strokeDashoffset = `${offset}`;
      frontEl.style.strokeDashoffset = `${offset}`;
  
      if (t < 1 && isOrbitAnimating) {
        requestAnimationFrame(animate);
      }
    }
  
    requestAnimationFrame(animate);
  }, [showHero, isOrbitAnimating, currentImageIndex]);

  // Logo hover animation
  useEffect(() => {
    if (!logoHovered) return;
    
    const ellipse = logoHoverEllipseRef.current;
    if (!ellipse) return;

    const circumference = 200;
    ellipse.style.strokeDasharray = `${circumference}`;
    ellipse.style.strokeDashoffset = `${circumference}`;

    const duration = 1000;
    const startTime = performance.now();

    function animateLogoOval(timestamp) {
      const elapsed = Math.min(1, (timestamp - startTime) / duration);
      const easing = 1 - Math.pow(1 - elapsed, 3);

      ellipse.style.strokeDashoffset = `${-circumference * (1 - easing)}`;

      if (elapsed < 1) {
        requestAnimationFrame(animateLogoOval);
      }
    }

    requestAnimationFrame(animateLogoOval);
  }, [logoHovered]);

  // Menu hover animation
  useEffect(() => {
    if (!menuHovered) return;
    
    const ellipse = menuHoverEllipseRef.current;
    if (!ellipse) return;

    const circumference = 150;
    ellipse.style.strokeDasharray = `${circumference}`;
    ellipse.style.strokeDashoffset = `${circumference}`;

    const duration = 1000;
    const startTime = performance.now();

    function animateMenuOval(timestamp) {
      const elapsed = Math.min(1, (timestamp - startTime) / duration);
      const easing = 1 - Math.pow(1 - elapsed, 3);

      ellipse.style.strokeDashoffset = `${-circumference * (1 - easing)}`;

      if (elapsed < 1) {
        requestAnimationFrame(animateMenuOval);
      }
    }

    requestAnimationFrame(animateMenuOval);
  }, [menuHovered]);

  return (
    <div className="reveal-container">
      {/* Loading + expanding oval */}
      {!showHero && (
        <div className={`oval-container ${isExpanding ? "expanding" : ""}`}>
          <div className={`oval-shape ${isLoading ? "loading" : "loaded"}`}>
            <div className="loading-percentage">
              {String(loadingProgress).padStart(3, "0")}
            </div>
          </div>

          {/* SVG Border */}
          <svg
            className={`oval-svg ${isExpanding ? "expanding" : ""}`}
            viewBox={dimensions.viewBox}
            preserveAspectRatio="xMidYMid meet"
          >
            <ellipse
              ref={ellipseRef}
              cx={dimensions.cx}
              cy={dimensions.cy}
              rx={dimensions.rx}
              ry={dimensions.ry}
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* Hero layout after reveal */}
      {showHero && (
        <div className="hero-wrapper">
          <header className="hero-header">
            <span 
              className="hero-logo"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              onClick={() => navigate("/")}
            >
              SCOUT.
              <svg className="hover-oval-svg logo-hover-oval" viewBox="0 0 120 60" preserveAspectRatio="xMidYMid meet">
                <ellipse
                  ref={logoHoverEllipseRef}
                  cx="60"
                  cy="30"
                  rx="30"
                  ry="10"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  transform="rotate(-12 60 30)"
                />
              </svg>
            </span>
            <button
              className="hero-menu"
              onClick={() => navigate("/menu")}
              onMouseEnter={() => setMenuHovered(true)}
              onMouseLeave={() => setMenuHovered(false)}
            >
              MENU
              <svg className="hover-oval-svg menu-hover-oval" viewBox="0 0 90 50" preserveAspectRatio="xMidYMid meet">
                <ellipse
                  ref={menuHoverEllipseRef}
                  cx="45"
                  cy="25"
                  rx="30"
                  ry="10"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  transform="rotate(-12 45 25)"
                />
              </svg>
            </button>
          </header>

          <main className="hero-main">
            <div className="hero-headline">
              <h1>
                SAVE OVER 10 HOURS
                
                EVERY WEEK PLANNING
                
                YOUR BORDERLESS LIFE
              </h1>
              <p>
                Trusted research, curated insights, and
               
                real-time support for digital nomads
              </p>
            </div>

            <section className="hero-center">
              <div className="hero-label-left">More Clarity</div>
              
              
              <div className="hero-image-orbit">
                <div className="hero-location hero-location-left">
                  {imageData[currentImageIndex].city}
                </div>

                <div className="hero-image-stack">
  {/* BACK ORBIT - Sits behind the image */}
  <svg className="hero-orbit-svg back" viewBox="0 0 260 90" preserveAspectRatio="xMidYMid meet">
    <defs>
      <mask id="back-mask">
        <rect width="100%" height="100%" fill="white" />
        {/* This black rectangle hides the segment that should be "in front" */}
        <rect x="0" y="45" width="260" height="45" fill="black" />
      </mask>
    </defs>
    <ellipse
      ref={heroOrbitEllipseRef} // We link the ref here to animate the dash
      cx="130" cy="45" rx="120" ry="35"
      mask="url(#back-mask)"
      className="hero-orbit-ellipse"
    />
  </svg>

  {/* IMAGE - The middle layer */}
  <img
    src={imageData[currentImageIndex].image}
    alt=""
    className={`hero-image ${imageFade ? 'fade-out' : 'fade-in'}`}
    key={currentImageIndex}
  />

  {/* FRONT ORBIT - Sits on top of the image */}
  <svg className="hero-orbit-svg front" viewBox="0 0 260 90" preserveAspectRatio="xMidYMid meet">
    <defs>
      <mask id="front-mask">
        <rect width="100%" height="100%" fill="black" />
        {/* This white rectangle shows only the segment that is "in front" */}
        <rect x="0" y="45" width="260" height="45" fill="white" />
      </mask>
    </defs>
    <ellipse
      cx="130" cy="45" rx="120" ry="35"
      mask="url(#front-mask)"
      className="hero-orbit-ellipse front-sync"
    />
  </svg>
</div>


                <div className="hero-location hero-location-right">
                  {imageData[currentImageIndex].country}
                </div>
              </div>

              <div className="hero-label-right">Less Chaos</div>
            </section>

            <section className="hero-cta-section">

            <button onClick={() => navigate('/join-waitlist')} className="cta-button">
          <div className="arrows-container">{Array(36).fill(0).map((_, i) => <span key={i} className="arrow">→</span>)}</div>
          <span>Join waitlist</span>
        </button>





              {/* <button
                className="hero-cta"
                onClick={() => navigate("/join-waitlist")}
              >
                Join waitlist
              </button> */}
              <p className="hero-cta-sub">200+ digital nomads joined</p>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default LoadingReveal;