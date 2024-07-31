import React, { useState, useCallback } from "react";
import QUESTIONS from "../question";
import quiz from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const Quiz = () => {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex = userAnswer.length; //with react we want to derive as more state as possible and write as little state as possible

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswer((prevAnswer) => [...prevAnswer, selectedAnswer]);
  }, []);

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; //if length 7 of array is reached in index
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quiz} alt="trophy" />
        <h2>Quiz is over!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]; //derive state
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={() => handleSelectAnswer(null)}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
//key prop will unmount and remount the old component means whenever key changes react'll destroy old component and create a new one, since there is no change in QuestionTimer
