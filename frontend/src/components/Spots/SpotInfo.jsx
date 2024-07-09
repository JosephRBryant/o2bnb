import { FaStar } from "react-icons/fa";
import './SpotInfo.css';

const SpotInfo = ({spot}) => {

  const handleReserveSubmit = (e) => {
    alert('Work in progress');
  }

  return (
    <>
      <div className="star-price-rating">
        <p className="spot-price"><span>${spot.price}</span> night</p>
        <p className="star-rating-reviews">
          <FaStar /> {spot.avgStarRating} • {spot.numReviews} reviews
        </p>
      </div>
      <button className="reservation-btn" onClick={handleReserveSubmit}>Reserve</button>
    </>
  )
}

export default SpotInfo;
