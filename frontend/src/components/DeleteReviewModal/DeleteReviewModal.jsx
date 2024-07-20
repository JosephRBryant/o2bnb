import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getSpotReviewsThunk } from "../../store/review";
import { getSpotDetailsThunk } from "../../store/spots";
import { deleteReviewThunk } from "../../store/review";
import './DeleteReviewModal.css';

function DeleteReviewModal({review}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  const { closeModal } = useModal();

  const handleDelete = async (e, review) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(deleteReviewThunk(review));
      await dispatch(getSpotDetailsThunk(review.spotId))
      await dispatch(getSpotReviewsThunk(review.spotId));
      closeModal();
    } catch (res) {
      return res
    }
  }

  return (
    <div className="delete-review-container">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this review?</p>
      <button className="delete-btn" onClick={(e) => handleDelete(e, review)}>Yes (Delete Review)</button>
      <button className="close-btn" onClick={closeModal}>No (Keep Review)</button>
    </div>
  )
}

export default DeleteReviewModal;
