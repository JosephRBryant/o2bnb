import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/review';
import { getSpotDetailsThunk } from '../../store/spots';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import OpenModalButton from '../../screens/ManageSpots/OpenModalButton';
import './ReviewListing.css';

const ReviewListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  const [spot, setSpot] = useState({});
  const spotDetails = useSelector(state => state.spotState.spotDetails)
  let reviews = useSelector(state => state.reviewState.spotReviews)
  spotId = Number(spotId);

  useEffect(() => {
    const getData = async() => {
      await dispatch(getSpotReviewsThunk(spotId));
      await dispatch(getSpotDetailsThunk(spotId));
      setIsLoaded(true);
      setSpot({...spotDetails})
    }
    if (!isLoaded && !reviews.length) {
      getData();
    }
  },[dispatch, isLoaded, reviews.length, spotDetails, spotId])

  if(!isLoaded) {
    return <h1>Loading...</h1>
  }

  function getMonthName(createdAt) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date(createdAt);
    const monthNum = date.getMonth();
    return months[monthNum];
  }

  reviews = reviews.Reviews

  function isUserSpot() {
    if (sessionUser) {
      if (sessionUser.id === spot.ownerId) {
        return true
      }
    }
    return false
  }

  function hasNoReviews(spot) {
    if (!isUserSpot(spot) && !reviews.length) {
      return true;
    }
    return false;
  }

  function hasUserReview(spot) {
    if (!isUserSpot(spot) && !reviews.some(e => e.userId === sessionUser.id)) {
      return true;
    }
    return false;
  }

  let reversedReviews = reviews.slice().reverse();

  return (
    <>
      {!sessionUser || isUserSpot(spot) ? (
        <ul className='reviews-list'>
        {reversedReviews.map((review, idx) => (
          <li className='review-list-items' key={`${idx}-${review.id}`}>
            <h3 className='user-review-name'>{review.User.firstName}</h3>
            <span>{`${getMonthName(review.createdAt)} ${review.createdAt.slice(0,4)}`}</span>
            <p>
            {review.review}
            </p>
          </li>
        ))}
      </ul>
      ) :
      hasNoReviews(spot) ? (
        <div>
          <OpenModalButton
          className='open-modal'
          itemText='Post Your Review'
          modalComponent={<ReviewFormModal spotId={spotId}/>}
          />
          {/* <button className='modal-btn' onClick={goToPostReview}>Post Your Review</button> */}
          <h2>Be the first to post a review!</h2>
        </div>
      ) :
      !hasUserReview(spot) ? (
      <ul className='reviews-list'>
        {reversedReviews.map((review, idx) => (
          <li className='review-list-items' key={`${idx}-${review.id}`}>
            <h3 className='user-review-name'>{review.User.firstName}</h3>
            <span>{`${getMonthName(review.createdAt)} ${review.createdAt.slice(0,4)}`}</span>
            <p>
            {review.review}
            </p>
          </li>
        ))}
      </ul>
      ) :
      <div>
          <OpenModalButton
          className='open-modal'
          itemText='Post Your Review'
          modalComponent={<ReviewFormModal spotId={spotId}/>}
          />
        {/* <button className='modal-btn' onClick={goToPostReview}>Post Your Review</button> */}
        <ul className='reviews-list'>
          {reversedReviews.map((review, idx) => (
            <li className='review-list-items' key={`${idx}-${review.id}`}>
              <h3 className='user-review-name'>{review.User.firstName}</h3>
              <span>{`${getMonthName(review.createdAt)} ${review.createdAt.slice(0,4)}`}</span>
              <p>
              {review.review}
              </p>
            </li>
          ))}
        </ul>
      </div>
      }
    </>
  )
}

export default ReviewListing;
