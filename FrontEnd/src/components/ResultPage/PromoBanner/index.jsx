import { useEffect, useState } from "react";
import "./PromoBanner.css";

export default function PromoBanner({ title, subtitle1, subtitle2, endDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(countdown);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [endDate]);

  if (timeLeft === null) return null;

  return (
    <div className="promo-banner-lp">
      <h2 className="promo-title">{title}</h2>
      <p className="promo-sub">{subtitle1}</p>
      <p className="promo-sub">{subtitle2}</p>
      <div className="promo-divider"></div>

      <p className="promo-timer">
        Termina em{" "}
        <strong>
          {timeLeft.days} dias {timeLeft.hours} horas {timeLeft.minutes} minutos {timeLeft.seconds} segundos
        </strong>
      </p>
    </div>
  );
}
