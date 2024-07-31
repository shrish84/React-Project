import React, { useEffect, useState } from "react";

function QuestionTimer({ timeout, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  const [answerState, setAnswerState] = useState('');

  useEffect(() => {
    console.log("set timeout");
    const timer = setTimeout(onTimeOut, timeout);
    return () => {
      console.log("clear timeout")
      clearTimeout(timer);
    };
  }, [timeout, onTimeOut]); //onTimeOut will be called out by the browser once 10(timeout) seconds expired, in order to delay

  useEffect(() => {
    console.log("set interval");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => {
      console.log("clear interval")
      clearInterval(interval);
    };
  }, []); //func runs after every 100 ms and will clear when timer's over, since every 100 ms remainingTime will be updated so the component will rerender after every 100 ms & new timer will be created

  return (
    <progress id="question progress" value={remainingTime} max={timeout} />
  );
}

export default QuestionTimer;
//we rerender the progress bar every couple milliseconds that is why we're using state
