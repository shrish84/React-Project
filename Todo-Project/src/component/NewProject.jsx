import React, { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

const NewProject = ({ onAdd, onCancel }) => {
  const title = useRef();
  const description = useRef();
  const duedate = useRef();
  const modal= useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = duedate.current.value;
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      duedate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-800 my-4">Invalid Input</h2>
        <p className='text-stone-600 mb-4'>Oops.. looks like you forgot to enter a value</p>
        <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end my-4 gap-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
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
    </>
  );
};

export default NewProject;
