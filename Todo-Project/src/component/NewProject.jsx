import React, { useRef } from "react";
import Input from "./Input";

const NewProject = ({onAdd}) => {
  const title = useRef();
  const description = useRef();
  const duedate = useRef();

  function handleSave() {
    const enteredTitle= title.current.value;
    const enteredDescription= description.current.value;
    const enteredDueDate= duedate.current.value;
    onAdd(
      {
        title: enteredTitle,
        description: enteredDescription,
        duedate: enteredDueDate
      }
    )
  }

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end my-4 gap-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <button
            className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input type="text" ref={title} label="TITLE" />
        <Input ref={description} label="DESCRIPTION" textarea />
        <Input type="date" ref={duedate} label="DUE DATE" />
      </div>
    </div>
  );
};

export default NewProject;
