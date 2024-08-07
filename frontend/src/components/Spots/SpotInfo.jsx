import { FaStar } from "react-icons/fa";
import './SpotInfo.css';

const SpotInfo = ({spot}) => {

  const handleReserveSubmit = () => {
    alert('Feature coming soon');
  }

  return (
    <>
      <div className="star-price-rating">
        <p className="spot-price"><span>${spot.price}</span> night</p>
        <p className="star-rating-reviews">
          <FaStar /> {!spot.avgStarRating ? 'New' : `${spot.avgStarRating}`}
          {spot.numReviews > 0 && ` • ${spot.numReviews} ${spot.numReviews === 1 ? 'review' : 'reviews'}`}

        </p>
      </div>
      <button className="reservation-btn" onClick={handleReserveSubmit}>Reserve</button>
    </>
  )
}

export default SpotInfo;
