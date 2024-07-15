import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/review';
import { getSpotDetailsThunk } from '../../store/spots';
import './ReviewListing.css';

const ReviewListing = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  const [spot, setSpot] = useState({});
  const spotDetails = useSelector(state => state.spotState.spotDetails)
  spotId = Number(spotId);

  let reviews = useSelector(state => state.reviewState.spotReviews)

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
  console.log('spot out of useffect', spot);
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

  function isUserNoReviews(spot) {
    if (sessionUser && sessionUser.id !== spot.ownerId && !reviews.length) {
      console.log('sessuse', sessionUser);
      return true;
    }
    return false;
  }

  let reversedReviews = reviews.slice().reverse();

  return (
    <>
      {isUserNoReviews(spot) ? (
        <h2>Be the first to post a review!</h2>
      ) : (
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
      )}
    </>
  )
}

export default ReviewListing;
