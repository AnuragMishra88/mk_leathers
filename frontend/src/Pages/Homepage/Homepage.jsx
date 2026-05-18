// Homepage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Homepage.css';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import CallButton from '../../components/CallButton/CallButton';

// Individual digit component with flip animation
const FlipDigit = ({ digit }) => {
  const [animate, setAnimate] = useState(false);
  const prevDigitRef = useRef(digit);

  useEffect(() => {
    if (prevDigitRef.current !== digit) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
    prevDigitRef.current = digit;
  }, [digit]);

  return (
    <div className={`flip-digit ${animate ? 'flip-animation' : ''}`}>
      <span className="digit-value">{digit}</span>
    </div>
  );
};

// Time unit component (e.g., Days, Hours) with two flip digits
const TimeUnit = ({ label, value }) => {
  // Pad to ensure two digits (e.g., "05")
  const paddedValue = value.toString().padStart(2, '0');
  const tens = paddedValue[0];
  const units = paddedValue[1];

  return (
    <div className="time-unit">
      <div className="flip-container">
        <FlipDigit digit={tens} />
        <FlipDigit digit={units} />
      </div>
      <div className="unit-label">{label}</div>
    </div>
  );
};

const Homepage = () => {
 // Fixed target date: June 15, 2026 (30 days after May 16, 2026)
// Set to 00:00:00 UTC. Adjust timezone as needed.
const getFixedTargetDate = () => {
  // Note: Months are 0-indexed in JavaScript Date (4 = May)
  // May 16, 2026 00:00:00 UTC + 30 days = June 15, 2026
  const target = new Date(Date.UTC(2026, 5, 15, 0, 0, 0));
  return target.getTime();
};

const [targetDate] = useState(getFixedTargetDate);
const [timeRemaining, setTimeRemaining] = useState({
  days: 30,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const calculateTimeRemaining = useCallback(() => {
  const now = Date.now();
  const difference = targetDate - now;

  if (difference <= 0) {
    setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  setTimeRemaining({ days, hours, minutes, seconds });
}, [targetDate]);

useEffect(() => {
  calculateTimeRemaining();
  const interval = setInterval(calculateTimeRemaining, 1000);
  return () => clearInterval(interval);
}, [calculateTimeRemaining]);


  // Web3Forms newsletter signup
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "d2f3b81e-2baa-432d-94c7-b18eb08c36fe");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Something Went Wrong");
    }
  };

  return (
    <div className="homepage">
      {/* Background overlay with leather texture and gradient */}
      <div className="bg-overlay"></div>

      {/* Decorative floating leather images */}
      <div className="floating-images">
        <div className="floating-img img1"></div>
        <div className="floating-img img2"></div>
        <div className="floating-img img3"></div>
      </div>

      {/* Main content */}
      <div className="content">
        <div className="brand-badge">EST. 2025</div>
        <h1 className="main-title">
          <span className="title-line">THE LEGACY OF</span>
          <span className="title-highlight">LEATHER</span>
        </h1>
        <p className="subtitle">
          Handcrafted excellence. Timeless elegance. <br />
          Our most anticipated collection arrives soon.
        </p>

        {/* Countdown timer section */}
        <div className="countdown-section">
          <div className="coming-soon-tag">
            <span className="glow-text">✦ Something Big Is Happening ✦</span>
          </div>
          <div className="timer-grid">
            <TimeUnit label="DAYS" value={timeRemaining.days} />
            <TimeUnit label="HOURS" value={timeRemaining.hours} />
            <TimeUnit label="MINUTES" value={timeRemaining.minutes} />
            <TimeUnit label="SECONDS" value={timeRemaining.seconds} />
          </div>
          
        </div>

        {/* Leather product showcase */}
        <div  id="waitlist-section" className="showcase">
          <div className="showcase-item">
            <div className="showcase-image leather-bag"></div>
            <p>Heritage Bags</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image leather-jacket"></div>
            <p>Artisan Jackets</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image leather-wallet"></div>
            <p>Fine Accessories</p>
          </div>
        </div>

        {/* Newsletter signup - Web3Forms integration */}
        <div className="newsletter">
          <h3>Be the first to experience</h3>
          <p>Get exclusive early access & special offers</p>
          <form onSubmit={onSubmit} className="signup-form">
            <input type="email" name="email" placeholder="Your email address" required />
            <button type="submit">Notify Me</button>
          </form>
          {result && <div className="success-message">{result}</div>}
        </div>
          {/* ========== NEW INSTAGRAM FOLLOW SECTION ========== */}
      <div className="instagram-follow">
        <div className="instagram-icon-large">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 5.197.157 3.628.534 2.442 1.72 1.256 2.906.88 4.475.795 6.33.737 7.61.723 8.02.723 11.28s.014 3.67.072 4.95c.085 1.855.461 3.424 1.647 4.61 1.186 1.186 2.755 1.562 4.61 1.647 1.28.058 1.69.072 4.95.072s3.67-.014 4.95-.072c1.855-.085 3.424-.461 4.61-1.647 1.186-1.186 1.562-2.755 1.647-4.61.058-1.28.072-1.69.072-4.95s-.014-3.67-.072-4.95c-.085-1.855-.461-3.424-1.647-4.61C19.234.534 17.665.157 15.81.072 14.53.014 14.12 0 10.86 0h1.14z" fill="currentColor"/>
            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" fill="currentColor"/>
            <circle cx="18.406" cy="5.594" r="1.44" fill="currentColor"/>
          </svg>
        </div>
        <h3 class="instagram-heading">Follow for more updates</h3>
        <p class="instagram-subtext">Join our leather community on Instagram for daily inspiration, behind‑the‑scenes, and exclusive launch alerts.</p>
        <a 
          href="https://www.instagram.com/m_and_k_leathers?igsh=ZzN0bHg4aWVldmJ2" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="instagram-button"
        >
          <span>Follow @M&KLeathers</span>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      {/* ========== END INSTAGRAM SECTION ========== */}

        {/* Footer note */}
        <div className="footer-note">
          <div className="divider"></div>
          <p>Handcrafted with passion | Limited Launch</p>
        </div>
      </div>
      <CallButton/>
      <WhatsAppButton/>
    </div>
  );
};

export default Homepage;