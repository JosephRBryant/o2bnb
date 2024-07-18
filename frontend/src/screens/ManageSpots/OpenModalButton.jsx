import React from "react";
import { useModal } from '../../context/Modal';
import './ManageSpots.css';

function OpenModalButton({
  modalComponent,
  itemText,
  onItemClick,
  onModalClose
}) {
  const { setModalContent, sentOnModalContent } = useModal();

  const onClick = () => {
    if (onModalClose) sentOnModalContent(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') onItemClick();
  };

  return (
    <button className='modal-btn' onClick={onClick}>{itemText}</button>
  );
}

export default OpenModalButton;
