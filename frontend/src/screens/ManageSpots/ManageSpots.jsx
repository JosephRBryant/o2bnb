import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import spotsReducer, { getUserSpotsThunk } from '../../store/spots';
import SpotTile from '../../components/Spots';
import './ManageSpots.css';

const ManageSpot = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  let userSpots = useSelector(state => state.spotState.userSpots);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    const getData = async () => {
      dispatch(getUserSpotsThunk(user.id));
      setIsLoaded(true)
    }
    if (!isLoaded && !userSpots.length) {
      getData()
    }
  })

  if (!userSpots) {
    return <h1>Loading...</h1>
  }
  return (
    <h1>placeholder</h1>
  )
}

export default ManageSpot;
