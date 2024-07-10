import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSpotsThunk } from '../../store/spots';
import SpotTile from '../../components/Spots';
import './ManageSpots.css';

const ManageSpote = () => {
  // const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);
  // let userSpots = useSelector(state => state.spotState.userSpots);
  // const user = useSelector(state => state.session.user);

  // useEffect(() => {
  //   const getData = async () => {
  //     dispatch(getUserSpotsThunk(user.id))
  //   }
  // })
  return (
    <h1>placeholder</h1>
  )
}
