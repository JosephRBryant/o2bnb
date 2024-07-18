import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { deleteSpotThunk, getUserSpotsThunk } from "../../store/spots";
import './DeleteFormModal.css';

function DeleteFormModal({spot}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  const { closeModal } = useModal();

  const handleDelete = async (e, spot) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(deleteSpotThunk(spot));
      await dispatch(getUserSpotsThunk(sessionUser.id))
      closeModal();
    } catch (res) {
      return res
    }
  }

  return (
    <div className="delete-form-container">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button className="delete-btn" onClick={(e) => handleDelete(e, spot)}>Yes (Delete Spot)</button>
      <button className="close-btn" onClick={closeModal}>No (Keep Spot)</button>
    </div>
  )
}

export default DeleteFormModal;
