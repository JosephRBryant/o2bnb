import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../store/spots";
import { FaStar } from "react-icons/fa";
import SpotInfo from "./SpotInfo";
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [spot, setSpot] = useState({});

  let previewImage;
  let spotImages;
  // step 8
  const spotDetails = useSelector((state) => state.spotState.spotDetails)

  useEffect(()=> {
    const getData = async() => {
      // grab data from backend
      await dispatch(getSpotDetailsThunk(spotId));
      setIsLoaded(true);
      setSpot({...spotDetails});
    }
    // we are not loaded
    if (!isLoaded) {
      getData()
    }
  })

  if(!isLoaded) {
    return <h1>Loading...</h1>
  }

  if (Array.isArray(spotDetails.SpotImages)) {
    spotImages = [...spotDetails.SpotImages];
    for (let image of spotDetails.SpotImages) {
      if (image.preview) {
        previewImage = image;
      }
      image.url = image.url.replace('/frontend', '')
    }

    previewImage.url = previewImage.url.replace('/frontend', '')
  }

  return (
    <>
      <header>
        <h1>{spotDetails.name}</h1>
        <p>{`${spotDetails.city}, ${spotDetails.state}, ${spotDetails.country}`}</p>
      </header>
      <main className="spot-detail-main">
        <div className="image-container">
          <div className="prev-img" style={{backgroundImage: `url(${previewImage.url})`}}></div>
          <div className="thumb-img" style={{backgroundImage: `url(${spotImages[1].url})`}}></div>
          <div className="thumb-img" style={{backgroundImage: `url(${spotImages[2].url})`}}></div>
          <div className="thumb-img" style={{backgroundImage: `url(${spotImages[3].url})`}}></div>
          <div className="thumb-img" style={{backgroundImage: `url(${spotImages[4].url})`}}></div>
        </div>
        <div className="spot-info-container">
          <div className="spot-description">
            <h2 className="hosted-by">{`Hosted by ${spotDetails.Owner.firstName} ${spotDetails.Owner.lastName}`}</h2>
            <p>{spotDetails.description}</p>
          </div>
          <div className="spot-info">
            <SpotInfo spot={spot}/>
          </div>
        </div>
        <div className="reviews-container">
          <h3>
            <FaStar /> {spot.avgStarRating} • {spot.numReviews} reviews
          </h3>

        </div>
      </main>
    </>
  )
}

export default SpotDetails;
