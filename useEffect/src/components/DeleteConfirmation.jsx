import { useEffect} from "react";
import ProgressBar from "./ProgressBar";

const TIMER= 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  
  // setTimeout(() => {
  //   console.log("timer");
  //    onConfirm();
  // }, 3000);//timer is never stopped here everytime modal is rendered the timer is set again

  //when this component is rendered setTimeout will also set the timer, whenever this component is removed from the dom cleanup fun will be executed
  //onConfirm is executed after 3 seconds when the timer is expired
  useEffect(() => {
   const timer= setTimeout(() => {
      onConfirm();
    }, TIMER);

   return () =>{
     clearTimeout(timer);
   }
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar TIMER={TIMER}/>
    </div>
  );
}
