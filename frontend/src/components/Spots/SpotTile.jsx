import { useNavigate } from 'react-router-dom';
import './SpotTile.css';
import { FaStar } from "react-icons/fa";

const SpotTile = (spot) => {
  const navigate = useNavigate();
  spot = spot.spot

  const goToSpotDetail = (e) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}`);
  }

  return (
    <div className="tile-container" onClick={goToSpotDetail}>
      <div key={`${spot.id}-${spot.name}`} className="spot-image" style={{backgroundImage: `url(${spot.previewImage})`}}>
        <span className='tool-tip-text'>{spot.name}</span>
      </div>
      <div className="location-rating">
        <p className='location'>{`${spot.city}, ${spot.state}`}</p>
        <div className='star-rating'>
          <FaStar />
          <p>{!spot.avgRating ? 'New': ` ${spot.avgRating.toFixed(1)}`}</p>
        </div>
      </div>
      <div className="price">
        <b>{`$${spot.price} `}</b>
        <p>night</p>
      </div>
    </div>
  )
}

export default SpotTile;
