import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../store/spots";
import { FaStar } from "react-icons/fa";
import SpotInfo from "../../components/Spots/SpotInfo";
import './SpotDetails.css';
import ReviewListing from "../../components/Reviews/ReviewListing";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const placeholder = 'https://placehold.co/500x500/2196F3/fff/?font=raleway&text=image';

  let previewImage;
  let spotImages;
  // step 8
  const spotDetails = useSelector((state) => state.spotState.spotDetails)

  useEffect(()=> {
    const getData = async() => {
      // grab data from backend
      await dispatch(getSpotDetailsThunk(Number(spotId)));
      setIsLoaded(true);
    }
    // we are not loaded
    if (!isLoaded) {
      getData()
    }
  }, [dispatch, isLoaded, spotId])

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
    <main className="spot-detail-main">
      <header className="spot-detail-header">
        <h1>{spotDetails.name}</h1>
        <p>{`${spotDetails.city}, ${spotDetails.state}, ${spotDetails.country}`}</p>
      </header>
      <div className="spot-detail-container">
        <div className="image-container">
          <div className="prev-img" style={{backgroundImage: `url(${previewImage.url})`}}></div>
          <div className="thumb-img img-a" style={{backgroundImage: `url(${spotImages[1] && spotImages[1].url ? spotImages[1].url : placeholder})`}}></div>
          <div className="thumb-img img-b" style={{backgroundImage: `url(${spotImages[2] && spotImages[2].url ? spotImages[2].url : placeholder})`}}></div>
          <div className="thumb-img img-c" style={{backgroundImage: `url(${spotImages[3] && spotImages[3].url ? spotImages[3].url : placeholder})`}}></div>
          <div className="thumb-img img-d" style={{backgroundImage: `url(${spotImages[4] && spotImages[4].url ? spotImages[4].url : placeholder})`}}></div>
        </div>
        <div className="spot-info-container">
          <div className="spot-description">
            <h2 className="hosted-by">{`Hosted by ${spotDetails.Owner.firstName} ${spotDetails.Owner.lastName}`}</h2>
            <p>{spotDetails.description}</p>
          </div>
          <div className="spot-info">
            <SpotInfo spot={spotDetails}/>
          </div>
        </div>
        <div className="reviews-container">
          <h2 className="rating-count">
            <div className="rating">
              <FaStar /> {!spotDetails.numReviews ? 'New' : spotDetails.avgStarRating}
            </div>
            <div className="count">
              {spotDetails.numReviews > 0 && `• ${spotDetails.numReviews} ${spotDetails.numReviews === 1 ? 'review' : 'reviews'}`}
            </div>
          </h2>
          <ReviewListing />
        </div>
      </div>
    </main>
  )
}

export default SpotDetails;
