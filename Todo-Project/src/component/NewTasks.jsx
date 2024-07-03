import React, { useState } from "react";

const NewTasks = ({onAddTask}) => {
  
  const [enteredElement, setEnteredElement] = useState("");
  
  const handleChange=(event)=>{
     setEnteredElement(event.target.value);
  }

  const handleClick = () => {
    if(enteredElement.trim()!==""){
      onAddTask(enteredElement);
      setEnteredElement("");
    }
  };

  return (
    <section>
      <main className="flex items-center gap-4">
        <input
          type="text"
          onChange={handleChange}
          value={enteredElement}
          className="w-64 rounded-sm px-2 py-1 bg-stone-200"
        ></input>
        <button
          onClick={handleClick}
          className="text-stone-700 hover:text-stone-950"
        >
          Add Task
        </button>
      </main>
    </section>
  );
};

export default NewTasks;
