import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Result from "./components/Result";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const isValid = userInput.duration > 0;
  const handleChange = (identifier, newValue) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [identifier]: +newValue, //plus here will force the conversion of string to number value
      };
    });
  };
  return (
    <>
      <Header />
      <UserInput userInput={userInput} handleChange={handleChange} />
      {isValid ? (
        <Result userInput={userInput} />
      ) : (
        <p className="center">Please enter a duration greater than 0!</p>
      )}
    </>
  );
}

export default App;
