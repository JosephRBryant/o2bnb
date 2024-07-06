import './SpotTile.css';
// import SpotListing from './SpotListing';
import { FaStar } from "react-icons/fa";
// import '../../../dist/assets/spotImages'
const SpotTile = (spot) => {
  spot = spot.spot

  // handle seed data
  if (spot.previewImage.includes('../../../frontend/dist/assets/spotImages')) {
    spot.previewImage = spot.previewImage.slice(18)
  }

  return (
    <div className="tile-container">
      <div key={`${spot.id}-${spot.name}`} className="spot-image" style={{backgroundImage: `url(${spot.previewImage})`}}></div>
      <div className="location-rating">
        <p className='location'>{`${spot.city}, ${spot.state}`}</p>
        <div className='star-rating'>
          <FaStar />
          <p>{` ${spot.avgRating.toFixed(1)}`}</p>
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
