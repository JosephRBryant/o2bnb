import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/review';
import './ReviewListing.css';

const ReviewListing = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  spotId = Number(spotId)

  let reviews = useSelector(state => state.reviewState.spotReviews)

  useEffect(() => {
    const getData = async() => {
      await dispatch(getSpotReviewsThunk(spotId));
      setIsLoaded(true);
    }
    if (!isLoaded && !reviews.length) {
      getData()
    }
  },[dispatch, isLoaded, reviews.length, spotId])

  if(!isLoaded) {
    return <h1>Loading...</h1>
  }

  let date = new Date('2024-07-08 16:39:26')

  function getMonthName(createdAt) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date(createdAt);
    const monthNum = date.getMonth();
    return months[monthNum];
  }


  reviews = reviews.Reviews

  let reversedReviews = reviews.slice().reverse();

  return (
    <>
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
    </>
  )
}

export default ReviewListing;
