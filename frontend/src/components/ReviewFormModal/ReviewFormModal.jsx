import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";
import { postReviewThunk } from "../../store/review";
import { getSpotReviewsThunk } from '../../store/review';
import { useModal } from "../../context/Modal";
import { getSpotDetailsThunk } from "../../store/spots";
import './ReviewFormModal.css';


function ReviewFormModal({spotId}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [reviewForm, setReviewForm] = useState({
    userId: user.id,
    spotId: spotId,
    review: '',
    stars: 0
  })
  const [stars, setStars] = useState([false, false, false, false, false]);
  const [isLocked, setIsLocked] = useState(false);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  function updateStars(e) {
    const index = Number(e.target.attributes.class.value.slice(-1));
    const eType = e._reactName;

    if (eType === 'onMouseEnter' && !isLocked) {
      setStars(prev => {
        const newStars = [...prev];
        if(!newStars[index]) {
          for (let i = index; i >= 0; i--) {
            newStars[i] = true;
          }
        } else {
          for (let i = index; i <= newStars.length - 1; i++) {
            newStars[i] = false;
          }
        }
        return newStars;
      })
    } else if (eType === 'onMouseLeave' && !isLocked) {
        setStars(prev => {
          const newStars = [...prev];
          for (let i = index; i >= 0; i--) {
            newStars[i] = false;
          }
          return newStars;
        })
    } else if (eType === 'onClick') {
      if (isLocked) {
        setStars(prev => {
          const newStars = [...prev];
          for (let i = index; i <= newStars.length -1; i++) {
            newStars[i] = false;
          }
          return newStars;
        })
        setIsLocked(false);
      } else {
        setIsLocked(true);
        setRating(index + 1);
      }
      return stars;
    }
  }

  function updateReviewForm(e, label) {
    getRating(stars);
    setReviewForm(prev => {
      const newReviewForm = {...prev};
      if (label !== 'stars') {
        newReviewForm[label] = e.target.value;
      } else {
        newReviewForm.stars = getRating(stars);
      }
      return newReviewForm;
    })
  }

  function getRating(stars) {
    if (stars.findIndex(star => star === false) === -1) {
      return 5;
    }
    let rtg = stars.findIndex(star => star === false);
    setRating(rtg);
    return stars.findIndex(star => star === false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const updatedReviewForm = {
      ...reviewForm,
      stars: getRating(stars)
    };

    try {
      const res = await dispatch(postReviewThunk(updatedReviewForm));
      if (!res.id) {
        const err = await res.json();
        const backendErrors = {};
        backendErrors.message = err.message;
        setErrors(err.errors);
      } else {
        closeModal();
        await dispatch(getSpotReviewsThunk(spotId));
        await dispatch(getSpotDetailsThunk(spotId));
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="post-review-form">
      <div className="review-header">
        <h1>How was your stay?</h1>
        <p>{errors.review}</p>
        <p>{errors.stars}</p>
      </div>
      <textarea name="review" id="review" onChange={(e) => updateReviewForm(e, 'review')} value={reviewForm.review} placeholder="Leave your review here..."></textarea>
      <div className="star-container">
        <ul className="star-ul">
          {stars.map((star, idx) => (
            <div key={idx} onMouseEnter={(e) => updateStars(e)} onMouseLeave={(e) => updateStars(e)} onClick={(e) => updateStars(e)} className={`star-li ${idx}`}>
              {!star ? <FaRegStar className={`star ${idx}`} value={idx}/> : <FaStar className={`star ${idx}`} value={idx}/>}
            </div>
          ))}
        </ul>
        stars
      </div>
      <button
        onClick={handleSubmit}
        className={
          reviewForm.review.length < 10 ||
          (!stars.includes(true) && !isLocked) ?
          'disabled-review-submit' :
          'review-submit'}
        disabled={
          reviewForm.review.length < 10 ||
          (!stars.includes(true) && !isLocked) ?
          true : false}
        >Submit Your Review</button>
    </div>
  )
}

export default ReviewFormModal;
