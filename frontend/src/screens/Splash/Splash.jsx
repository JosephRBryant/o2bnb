import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotTile from "../../components/Spots";
import './Splash.css';

const Splash = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  let spots = useSelector(state => state.spotState.allSpots);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllSpotsThunk());
      setIsLoaded(true)
    }
    if (!isLoaded && !spots.length) {
      getData()
    }
  }, [dispatch, isLoaded, spots])

  if (!spots) {
    return <h1>Loading</h1>
  }

  spots = spots.filter(spot => spot.previewImage !== 'No Image');

  return (
    <main className="splash-main">
      {spots.map((spot, idx) => (
        <div key={`${idx}-${spot.name}`} className="spot-tile" data-tooltip={spot.name}>
          <SpotTile  spot={spot}/>
        </div>
      ))}
    </main>

  )
}

export default Splash;
