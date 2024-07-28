import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open? children: null}
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
//we put condition here when pic is clicked then modal open is triggered and the timer will set only once 