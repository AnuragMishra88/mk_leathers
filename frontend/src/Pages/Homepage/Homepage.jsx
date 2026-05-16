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
 // Get or create a persistent target date (30 days from first visit)
  const getPersistentTargetDate = () => {
    const stored = localStorage.getItem('launchTargetDate');
    if (stored) {
      return parseInt(stored, 10);
    }
    // First visit: set target to 30 days from now
    const newTarget = Date.now() + 30 * 24 * 60 * 60 * 1000;
    localStorage.setItem('launchTargetDate', newTarget.toString());
    return newTarget;
  };

  const [targetDate] = useState(getPersistentTargetDate);
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
      // Optional: clear localStorage when countdown ends
      // localStorage.removeItem('launchTargetDate');
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
      setResult("Something Went Wrong 🥲");
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
            <span className="glow-text">✦ COMING SOON ✦</span>
          </div>
          <div className="timer-grid">
            <TimeUnit label="DAYS" value={timeRemaining.days} />
            <TimeUnit label="HOURS" value={timeRemaining.hours} />
            <TimeUnit label="MINUTES" value={timeRemaining.minutes} />
            <TimeUnit label="SECONDS" value={timeRemaining.seconds} />
          </div>
          <div className="thirty-day-badge">30-DAY COUNTDOWN</div>
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