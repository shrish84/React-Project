import React from "react";
import { useState, useEffect } from "react";

function ProgressBar({TIMER}) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return  <progress value={remainingTime} max={TIMER}/>
}

export default ProgressBar;
//we're outsourcing this timer so that after every 10 ms our DeleteConfirmation must not execute