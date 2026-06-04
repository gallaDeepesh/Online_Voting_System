import { useEffect, useState } from "react";

function Countdown({ endDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(endDate) - new Date();

      if (diff <= 0) {
        setTimeLeft("Election Completed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      );
      const minutes = Math.floor(
        (diff / (1000 * 60)) % 60
      );
      const seconds = Math.floor(
        (diff / 1000) % 60
      );

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return <h4>Election Ends In: {timeLeft}</h4>;
}

export default Countdown;