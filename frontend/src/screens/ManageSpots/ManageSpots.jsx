import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import spotsReducer, { getUserSpotsThunk } from '../../store/spots';
import SpotTile from '../../components/Spots';
import './ManageSpots.css';

const ManageSpot = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  let userSpots = useSelector(state => state.spotState.userSpots);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    const getData = async () => {
      dispatch(getUserSpotsThunk(sessionUser.id));
      setIsLoaded(true)
    }
    if (!isLoaded) {
      getData()
    }
  },[dispatch, isLoaded, sessionUser.id])

  if (!userSpots) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <header>
        <h1>Manage your Spots</h1>
        <button className="create-new-spot" onSubmit={() => null}>Create a New Spot</button>
      </header>
      <main className='manage-spots'>
        {userSpots.map((spot, idx) => (
          <div key={`${idx}-${spot.name}`} className="spot-tile" data-tooltip={spot.name}>
            <SpotTile spot={spot}/>
            <div className="update-delete-btns">
              <button onSubmit={() => null} className="update-spot">Update</button>
              <button onSubmit={() => null} className="delete-spot">Delete</button>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export default ManageSpot;
