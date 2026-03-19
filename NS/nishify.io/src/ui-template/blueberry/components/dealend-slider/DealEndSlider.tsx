import React, { useEffect, useState } from "react";

const DealEndSlider = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const future = new Date("September 2, 2025 11:30:00").getTime();
    const now = new Date().getTime();
    const difference = future - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dealend-timer" id="dealend">
      <div className="dealend-timer">
        <div className="time-block">
          <div className="time">{timeLeft.days}</div>
          <span className="day">Days</span>
        </div>
        <div className="time-block">
          <div className="time">{timeLeft.hours}</div>
          <span className="dots">:</span>
        </div>
        <div className="time-block">
          <div className="time">{timeLeft.minutes}</div>
          <span className="dots">:</span>
        </div>
        <div className="time-block">
          <div className="time">{timeLeft.seconds}</div>
        </div>
      </div>
    </div>
  );
};

export default DealEndSlider;
