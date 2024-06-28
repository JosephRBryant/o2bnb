import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalMenuItem({
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
    <li onClick={onClick}>{itemText}</li>
  );
}

export default OpenModalMenuItem;
