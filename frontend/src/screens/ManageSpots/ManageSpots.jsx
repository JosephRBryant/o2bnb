import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSpotsThunk, deleteSpotThunk } from '../../store/spots';
import SpotTile from '../../components/Spots';
import './ManageSpots.css';
import { useNavigate } from 'react-router-dom';
import { restoreUser } from '../../store/session';

const ManageSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  let userSpots = useSelector(state => state.spotState.userSpots);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getUserSpotsThunk(sessionUser.id));
      setIsLoaded(true)
    }
    if (sessionUser && !sessionUser.id) {
      const getUser = async () => {
        await dispatch(restoreUser())
      }
      getUser();
    }
    if (!isLoaded) {
      getData()
    }
  },[dispatch, isLoaded, sessionUser])

  const goToCreateSpot = (e) => {
    e.preventDefault();
    navigate('/spots/new');
  }

  const handleDelete = async (e, spot) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(deleteSpotThunk(spot));
    await dispatch(getUserSpotsThunk(sessionUser.id));
  }

  if (!isLoaded) {
    return <h1>Loading...</h1>
  }
  return (
    <main className='manage-spots-main'>
      <header>
        <h1>Manage your Spots</h1>
        <Link className="create-new-spot" onClick={goToCreateSpot}>Create a New Spot</Link>
      </header>
      <div className='manage-spots'>
        {userSpots.map((spot, idx) => (
          <div key={`${idx}-${spot.name}`} className="spot-tile" data-tooltip={spot.name}>
            <SpotTile spot={spot}/>
            <div className="update-delete-btns">
              <button onSubmit={() => null} className="update-spot">Update</button>
              <button onClick={(e) => handleDelete(e, spot)} className="delete-spot">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default ManageSpot;
