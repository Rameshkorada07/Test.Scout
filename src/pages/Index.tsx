import LoadingReveal from "@/components/LoadingReveal.jsx";
import "./Index.css";
import { useState,useEffect, useRef } from "react";
import { footerCountries } from "../assets/footerData.js";
import Footer from "../components/Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";



const problems = [
  {
    id: "01",
    title: "Research Chaos",
    body:
      "SCOUT’s AI learns your nomad personality and cuts through the noise — giving you confident decisions, not endless options.",
  },
  {
    id: "02",
    title: "Unreliable Info",
    body:
      "Real questions, real answers from experienced nomads. No outdated blog posts or fake reviews.",
  },
  {
    id: "03",
    title: "Visa Confusion",
    body:"Up to date information and guidance on Visa of all countries. Scout takes care of the details, so you can travel hassle free.",
  }
];

const faqs = [
  {
    id: "01",
    question: "What exactly is SCOUT?",
    answer:
      "SCOUT is your AI powered travel companion. It combines search, chat, and community in one minimal space so you can plan without chaos.",
  },
  {
    id: "02",
    question: "What can I find on SCOUT?",
    answer:
      "Curated research, vetted partners, live support, and a community that shares real-time insights from the road.",
  },
  {
    id: "03",
    question: "Is it free to join?",
    answer:
      "The core waitlist experience is free while we onboard founding members. Paid tiers unlock deeper concierge support.",
  },
  {
    id: "04",
    question: "How does the AI help?",
    answer:
      "It learns your travel style, flags friction before it happens, and keeps every detail synced across your journey.",
  },
  {
    id: "05",
    question: "Is my data safe?",
    answer:
      "Yes. We encrypt personal details, never sell data, and give you control to delete anything at any time.",
  },
  {
    id: "06",
    question: "Do you have any other questions?",
    answer:
      "Email hey@scout.world or ping us on the waitlist chat. Real humans answer.",
  },
];

// const galleryImages = [
//   "/img1.jpg","/img2.jpg","/img3.jpg","/img4.jpg",
//   "/img5.jpg","/img2.jpg","/img3.jpg","/img4.jpg",
//   "/img5.jpg","/img1.jpg","/img2.jpg","/img3.jpg",
  
// ];

// // repeatable vertical offsets (px) — tweak to get exact look
// const offsets = [-28, 18, -16, 22, -10, 26];
// --------------------------------------------Footer----------------------------------------------------------
const Index = () => {
  const navigate = useNavigate();
  const [problemIndex, setProblemIndex] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
const [loadProgress, setLoadProgress] = useState(0); // 0–100
const [revealedImages, setRevealedImages] = useState(0); // 0–20

const [step, setStep] = useState(0);

/*
step 0 → 01 full + 02 half
step 1 → 01 full + 02 full
step 2 → 01 + 02 + 03
*/

const handleNextProblem = () => {
  setStep((prev) => Math.min(prev + 1, 2));
};

const handlePrevProblem = () => {
  setStep((prev) => Math.max(prev - 1, 0));
};

const isDesktop = window.innerWidth >= 1024;
const isTablet  = window.innerWidth >= 610 && window.innerWidth < 890;
const isMobile  = window.innerWidth < 610;

const getCardSize = () => {
  const w = window.innerWidth;

  if (w >= 1024) return { width: 353, height: 564 };
  if (w >= 820)  return { width: 313, height: 500 };
  if (w >= 480)  return { width: 288, height: 460 };
  return { width: 269, height: 430 };
};

const { width: CARD_WIDTH } = getCardSize();
const GAP = 20;

// Constrain the viewport width so it acts like a "window"
const viewportWidth = isTablet 
  ? (CARD_WIDTH * 1.5 + GAP) // Strictly lock the window size on tablet
  : (isMobile 
      ? (CARD_WIDTH * 1.3 + GAP) 
      : (step === 0 
          ? CARD_WIDTH * 1.3 + GAP 
          : step === 1 
          ? CARD_WIDTH * 2.5 + GAP 
          : CARD_WIDTH * 3.5 + GAP)
    );

// This remains the same to move the cards
const translateX = (isMobile || isTablet) ? step * (CARD_WIDTH - 15) : 0;

const canGoPrev = step > 0;
const canGoNext = step < 2;
  







  const handleFaqToggle = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  //////////////// NEW
  function getLiveTime(timezone: string) {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  }
  
    const [countryIndex, setCountryIndex] = useState(0);
    const [time, setTime] = useState(
      getLiveTime(footerCountries[0].timezone)
    );
  
    const currentCountry = footerCountries[countryIndex];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(getLiveTime(currentCountry.timezone));
      }, 1000);
  
      return () => clearInterval(interval);
    }, [currentCountry]);
  
    const handleShuffle = async () => {
      if (isLoading) return;
    
      const nextIndex =
        countryIndex === footerCountries.length - 1
          ? 0
          : countryIndex + 1;
    
      await preloadCountryImages(nextIndex);
      setCountryIndex(nextIndex);
    };
    

    useEffect(() => {
      preloadCountryImages(0);
    }, []);
    
    const preloadCountryImages = async (countryIdx: number) => {
      setIsLoading(true);
      setLoadProgress(0);
      setRevealedImages(0);
    
      const images = footerCountries[countryIdx].images;
      let loaded = 0;
    
      for (let i = 0; i < images.length; i++) {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.src = images[i];
    
          img.onload = () => {
            loaded++;
            setRevealedImages(loaded);
            setLoadProgress(Math.round((loaded / images.length) * 100));
            setTimeout(resolve, 80);
          };
    
          img.onerror = () => resolve();
        });
      }
    
      setIsLoading(false);
    };
    const IMAGE_COUNT = 20;
    const skeletonImages = Array.from(
      { length: IMAGE_COUNT },
      (_, i) => `/skleton-${i + 1}.png`
    );
    
    
    

    

    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //second section 

// Sample images with hover text
// const imageData = [
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },{ src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
//   { src: "/section2-1.png", text: "Remote Work" },
//   { src: "/section2-2.png", text: "Travel" },
//   { src: "/section2-3.png", text: "Explore" },
// ];

const imageData = [
  { src: "/1 Thailand.jpg", text: "Thailand" },
  { src: "/2 Portugal.jpg", text: "Portugal" },
  { src: "/3 Spain.jpg", text: "Spain" },
  { src: "/4 Indonesia.jpg", text: "Indonesia" },
  { src: "/5 Mexico.jpg", text: "Mexico" },
  { src: "/6 Vietnam.jpg", text: "Vietnam" },
  { src: "/7 Malaysia.jpg", text: "Malaysia" },
  { src: "/8 Greece.jpg", text: "Greece" },
  { src: "/9 Croatia.jpg", text: "Croatia" },
  { src: "/10 Georgia.jpg", text: "Georgia" },
  { src: "/11 UAE.jpg", text: "UAE" },
  { src: "/12 Colombia.jpg", text: "Colombia" },
  { src: "/13 Italy.jpg", text: "Italy" },
  { src: "/14 Estonia.jpg", text: "Estonia" },
  { src: "/15 Turkey.jpg", text: "Turkey" },
  { src: "/16 Czech Republic.jpg", text: "Czech Republic" },
  { src: "/17 France.jpg", text: "France" },
  { src: "/18 Netherlands.jpg", text: "Netherlands" },
  { src: "/19 Germany.jpg", text: "Germany" },
  { src: "/20 Malta.jpg", text: "Malta" },
  { src: "/21 Cyprus.jpg", text: "Cyprus" },
  { src: "/22 Montenegro.jpg", text: "Montenegro" },
  { src: "/23 Albania.jpg", text: "Albania" },
  { src: "/24 Romania.jpg", text: "Romania" },
  { src: "/25 Bulgaria.jpg", text: "Bulgaria" },
  { src: "/26 Serbia.jpg", text: "Serbia" },
  { src: "/27 Hungary.jpg", text: "Hungary" },
  { src: "/28 Poland.jpg", text: "Poland" },
  { src: "/29 Latvia.jpg", text: "Latvia" },
  { src: "/30 India.jpg", text: "India" },
  { src: "/31 Ireland.jpg", text: "Ireland" },
  { src: "/32 UK.jpg", text: "UK" },
  { src: "/33 Norway.jpg", text: "Norway" },
  { src: "/34 Sweden.jpg", text: "Sweden" },
  { src: "/35 Australia.jpg", text: "Australia" },
  { src: "/36 New Zealand.jpg", text: "New Zealand" },
  { src: "/37 Canada.jpg", text: "Canada" },
  { src: "/38 US.jpg", text: "US" },
  { src: "/39 Costa Rica.jpg", text: "Costa Rica" },
  { src: "/40 Sri Lanka.jpg", text: "Sri Lanka" },
  { src: "/41 Belize.jpg", text: "Belize" },
  { src: "/42 Dominican Republic.jpg", text: "Dominican Republic" },
  { src: "/43 Barbados.jpg", text: "Barbados" },
  { src: "/44 Bahamas.jpg", text: "Bahamas" },
  { src: "/45 Jamaica.jpg", text: "Jamaica" },
  { src: "/46 Brazil.jpg", text: "Brazil" },
  { src: "/47 Argentina.jpg", text: "Argentina" },
  { src: "/48 Uruguay.jpg", text: "Uruguay" },
  { src: "/49 Chile.jpg", text: "Chile" },
  { src: "/50 Peru.jpg", text: "Peru" },
  { src: "/51 Ecuador.jpg", text: "Ecuador" },
  { src: "/52 Morocco.jpg", text: "Morocco" },
  { src: "/53 Tunisia.jpg", text: "Tunisia" },
  { src: "/54 South Africa.jpg", text: "South Africa" },
  { src: "/55 Kenya.jpg", text: "Kenya" },
  { src: "/56 Mauritius.jpg", text: "Mauritius" },
  { src: "/57 Seychelles.jpg", text: "Seychelles" },
  { src: "/58 Philippines.jpg", text: "Philippines" },
  { src: "/59 Japan.jpg", text: "Japan" },
  { src: "/60 Taiwan.jpg", text: "Taiwan" },
  { src: "/61 South Korea.jpg", text: "South Korea" },
  { src: "/62 Cambodia.jpg", text: "Cambodia" },
  { src: "/63 Panama.jpg", text: "Panama" },
  { src: "/64 Austria.jpg", text: "Austria" },
];


const [imagePositions, setImagePositions] = useState([]);
const [isHovered, setIsHovered] = useState(false);
const [hoveredIndex, setHoveredIndex] = useState(null);
const animationRef = useRef(null);

useEffect(() => {
  // Initialize positions for each image
  const initialPositions = imageData.map((_, index) => {
    const angleOffset = (index / imageData.length) * 2 * Math.PI;
    return angleOffset;
  });
  setImagePositions(initialPositions);
}, []);

useEffect(() => {
  const animate = () => {
    if (!isHovered) {
      setImagePositions(prevPositions =>
        prevPositions.map(angle => {
          // Move anti-clockwise (add angle) - slower speed
          return (angle - 0.0002 + 2 * Math.PI) % (2 * Math.PI);
        })
      );
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  animationRef.current = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationRef.current);
}, [isHovered]);

const calculatePosition = (angle) => {
  // Wide and TALLER ellipse - increased height
  const rx = 1400; // Horizontal radius (same)
  const ry = 500;  // Vertical radius (INCREASED from 450 to 600)
  
  // Tilt the oval to the left by rotating coordinates
  const tiltAngle = -15 * (Math.PI / 180); // -15 degrees tilt
  
  // Calculate position on ellipse
  const x = rx * Math.cos(angle);
  const y = ry * Math.sin(angle);
  
  // Apply rotation (tilt to left)
  const rotatedX = x * Math.cos(tiltAngle) - y * Math.sin(tiltAngle);
  const rotatedY = x * Math.sin(tiltAngle) + y * Math.cos(tiltAngle);

  // Only show images at top and bottom (hide sides)
  const cosAngle = Math.cos(angle);
  const atSides = Math.abs(cosAngle) > 0.5;
  
  let visibility = 1;
  if (atSides) {
    visibility = 1;
  } else {
    visibility = 1 ;
  }

  // Fixed z-index based on original angle position (no dynamic changes)
  const normalizedAngle = ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
  let zIndex;
  
  if (normalizedAngle < Math.PI) {
    // Top half - higher z-index
    zIndex = 200 + Math.floor((Math.PI - Math.abs(normalizedAngle - Math.PI / 2)) * 50);
  } else {
    // Bottom half - lower z-index
    zIndex = 100 + Math.floor((Math.PI - Math.abs(normalizedAngle - 3 * Math.PI / 2)) * 50);
  }

  return {
    x: rotatedX,
    y: rotatedY,
    visibility,
    zIndex: 100
  };
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //gallery section 
 const sectionRef = useRef(null);
 const [scrollY, setScrollY] = useState(0);

const galleryImages = [
  { src: "/1 USA.jpg", text: "USA" },
  { src: "/2 Australia.jpg", text: "Australia" },
  { src: "/3 Azerbaijan.jpg", text: "Azerbaijan" },
  { src: "/4 Brazil.jpg", text: "Brazil" },
  { src: "/5 France.jpg", text: "France" },
  { src: "/6 Canada.jpg", text: "Canada" },
  { src: "/7 Netherlands.jpg", text: "Netherlands" },
  { src: "/8 Japan.jpg", text: "Japan" },
  { src: "/9 Czech Republic.jpg", text: "Czech Republic" },
  { src: "/10 Thailand.jpg", text: "Thailand" },
  { src: "/11 Singapore.jpg", text: "Singapore" },
  { src: "/12 Italy.jpg", text: "Italy" },
  null,
  { src: "/13 South Korea.jpg", text: "South Korea" },
  { src: "/14 Armenia.jpg", text: "Armenia" },
  { src: "/15 Indonesia.jpg", text: "Indonesia" },
  { src: "/16 Norway.jpg", text: "Norway" },
  { src: "/17 Vietnam.jpg", text: "Vietnam" },
  { src: "/18 Latvia.jpg", text: "Latvia" },
  { src: "/19 Mexico.jpg", text: "Mexico" },
  { src: "/20 Spain.jpg", text: "Spain" },
  { src: "/21 Portugal.jpg", text: "Portugal" },
  { src: "/22 Romania.jpg", text: "Romania" },
  { src: "/23 Germany.jpg", text: "Germany" },
  { src: "/24 Hungary.jpg", text: "Hungary" },
];

useEffect(() => {
  const handleScroll = () => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
      const scrolled = windowHeight - sectionTop;
      setScrollY(scrolled);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

const getColumnOffset = (index) => {
  const col = index % 5;
  return col % 2 === 0 ? 40 : -40;
};


const getParallaxSpeed = (index) => {
  const col = index % 5;
  const speeds = [0.15, 0.25, 0.18, 0.28, 0.15];
  return speeds[col];
};




  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Footer section
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

  useEffect(() => {
    const initialAngles = footerImages.map((_, index) => {
      const angleOffset = (index / footerImages.length) * 2 * Math.PI;
      return angleOffset;
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
  

  useEffect(() => {
    const animateFooter = () => {
      if (!footerPaused) {
        setFooterAngles(prevAngles =>
          prevAngles.map(angle => {
            return (angle - 0.0005 + 2 * Math.PI) % (2 * Math.PI);
          })
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

    const normalizedAngle = ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
    let layerIndex;
    
    if (normalizedAngle < Math.PI) {
      layerIndex = 200 + Math.floor((Math.PI - Math.abs(normalizedAngle - Math.PI / 2)) * 50);
    } else {
      layerIndex = 100 + Math.floor((Math.PI - Math.abs(normalizedAngle - 3 * Math.PI / 2)) * 50);
    }

    return { x: transformedX, y: transformedY, zIndex: 100 };
  };





  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //about section

  const aboutImages = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];
  
  const aboutRef = useRef(null);
  const ovalAnimationRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    const onScroll = () => {
      if (!aboutRef.current) return;
      const rect = aboutRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setIsActive(inView);
      if (!inView) {
        setOpacity(0);
        setPos((p) => ({ ...p, y: p.y + 4 }));
      } else {
        setOpacity(1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isActive) return;
      setPos({
        x: e.clientX - 100,
        y: e.clientY - 50,
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isActive]);
  
  // Oval continuous drawing animation
  useEffect(() => {
    if (!isActive) return;
  
    const ovalEl = document.querySelector<SVGElement>('.about-oval ellipse');
    if (!ovalEl) return;
  
    const circumference = 400; // Approximate circumference for horizontal ellipse
    ovalEl.style.strokeDasharray = `${circumference}`;
    ovalEl.style.strokeDashoffset = `${circumference}`;
  
    const duration = 4000; // 4 seconds to draw complete oval
    let startTime = performance.now();
  
    function animate(currentTime) {
      if (!isActive) return;
  
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easing = 1 - Math.pow(1 - progress, 3);
  
      ovalEl.style.strokeDashoffset = `${circumference * (1 - easing)}`;
  
      if (progress >= 1) {
        // Reset for next loop and change image
        ovalEl.style.strokeDashoffset = `${circumference}`;
        startTime = currentTime;
        setActiveImage((i) => (i + 1) % aboutImages.length);
      }
  
      ovalAnimationRef.current = requestAnimationFrame(animate);
    }
  
    ovalAnimationRef.current = requestAnimationFrame(animate);
    return () => {
      if (ovalAnimationRef.current) {
        cancelAnimationFrame(ovalAnimationRef.current);
      }
    };
  }, [isActive, aboutImages.length]);
  



  return (
    <div className="homepage">
      <LoadingReveal />

      <section className="movement-section" id="movement">
      <div className="movement-content">
        <p className="movement-tag">#antichaos</p>
        <h2>
          This isn't just another app. It's a
          movement to get back the peace
          nomad life was supposed to
          give you.
        </h2>
      </div>

      <div className="orbit-container">
        {imagePositions.map((angle, index) => {
          const { x, y, visibility, zIndex } = calculatePosition(angle);
          
          return (
            <div
  key={index}
  className="orbit-image"
  style={{
    transform: `translate(${x}px, ${y}px)`,
    opacity: visibility,
    zIndex: zIndex
  }}
  onMouseEnter={() => {
    setIsHovered(true);
    setHoveredIndex(index);
  }}
  onMouseLeave={() => {
    setIsHovered(false);
    setHoveredIndex(null);
  }}
>
  <div className="image-wrapper">
    <img src={imageData[index].src} alt={`Nomad ${index + 1}`} />

    {hoveredIndex === index && (
      <div className="image-overlay">
        <span className="image-hover-text">
          {imageData[index].text}
        </span>
      </div>
    )}
  </div>
</div>
          );
        })}
      </div>
    </section>

      <section className="problems-section" id="problems">
        <div className="problems-heading">
          <p>Problems &amp; Solutions</p>
          <h3>
            Us digital nomads have faced and continue to face these problems
            with every travel. Scout solves these all with efficiency.
          </h3>
        </div>
        <div className="problems-content">
          <div className="problems-controls">
            <div className="problems-arrows">
              <button
                className={`problems-arrow ${
                  !canGoPrev ? "problems-arrow-disabled" : ""
                }`}
                aria-label="Previous problems"
                onClick={handlePrevProblem}
                disabled={!canGoPrev}
              >
                ←
              </button>
              <button
                className={`problems-arrow ${
                  !canGoNext ? "problems-arrow-disabled" : ""
                }`}
                aria-label="Next problems"
                onClick={handleNextProblem}
                disabled={!canGoNext}
              >
                →
              </button>
            </div>
            <button onClick={() => navigate('/join-waitlist')} className="join-button">Join waitlist</button>
          </div>

          <div className="problems-cards-viewport" style={{ width: viewportWidth }}>
  <div
    className="problems-cards-track"
    style={{
      transform: `translateX(-${translateX}px)`,
      transition: "transform 0.45s ease",
    }}
  >
    {problems.map((card) => (
      <article key={card.id} className="problem-card">
        <div>
          <span>{card.id}</span>
          <h4>{card.title}</h4>
        </div>
        <p>{card.body}</p>
      </article>
    ))}
  </div>
</div>


        </div>
      </section>





      <section className="about-section" id="about" ref={aboutRef}>
  <div className="about-heading">
    <p>About Scout</p>
    <h3>
      Scout is the beginning of a new era for digital nomads. A calm
      system that unites everything they need to live freely and feel
      grounded anywhere in the world.
    </h3>
  </div>
  <div className="about-side-text">
    <p>No Investors.</p>
    <p>Public Roadmap.</p>
    <p>Quality over Hype.</p>
  </div>
  <div
    className={`about-floating ${isActive ? "active" : "inactive"}`}
    style={{
      transform: `translate(${pos.x}px, ${pos.y}px)`,
      opacity: opacity,
    }}
  >
    <img
  src="/aboutGif.gif"
  className="about-image"
  alt="Scout animation"
/>
    
  </div>
</section>




      {/* <section className="faq-section" id="faq">
        <div className="faq-copy">
          <p>Frequently asked questions</p>
          <h3>
            Answers to all your questions. Feel free to reach out to me if you've
            any other questions.
          </h3>
        </div>
        <div className="faq-list">
          {faqs.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div key={item.id} className="faq-item">
                <div
                  className="faq-header"
                  onClick={() => handleFaqToggle(item.id)}
                >
                  <span>{item.id}</span>
                  <h4>{item.question}</h4>
                  <button className="faq-toggle">
                    {isOpen ? "×" : "+"}
                  </button>
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section> */}

<section ref={sectionRef} className="collage-section">
  <div className="collage-grid">
    {galleryImages.map((item, i) => {
      // Center card (null placeholder)
      if (item === null && i === 12) {
        return (
          <div key={i} className="collage-tile center-card">
            <div className="center-card-inner">
              <h4>
                SCOUT BRINGS EVERYTHING TOGETHER IN ONE CALM, WEB-BASED
                SPACE. BY JOINING OUR WAITLIST, YOU'LL:
              </h4>

              <ul>
                <li>Help decide what we build first</li>
                <li>Get early access to SCOUT</li>
                <li>Become a founding member</li>
                <li>Join our Nomad community</li>
              </ul>

              <button className="center-cta" onClick={() => navigate('/join-waitlist')}>JOIN WAITLIST</button>

              <div className="center-stats">
  <div className="stat-item">
    <span className="stat-label-top">LET'S STOP PAYING</span>
    <div className="stat-value-main">15 apps</div>
  </div>

  <div className="stat-item">
    <span className="stat-label-top">LET'S STOP WASTING</span>
    <div className="stat-value-main">10 hr/wk</div>
  </div>
</div>

            </div>
          </div>
        );
      }

      if (!item) return null;

      const baseOffset = getColumnOffset(i); // ✅ KEEP THIS

      return (
        <div
          key={i}
          className="collage-tile"
          style={{
            transform: `translateY(${baseOffset}px)`,
            position: "relative", // REQUIRED
          }}
        >
          <img src={item.src} alt={item.text} />
      
          {/* Hover overlay */}
          <div className="collage-overlay">
            <span className="collage-hover-text">{item.text}</span>
          </div>
        </div>
      );
      
    })}
  </div>
</section>







<Footer/>

    
    </div>
  );
};

export default Index;
