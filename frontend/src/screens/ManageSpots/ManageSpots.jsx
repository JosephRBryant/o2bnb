import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restoreUser } from '../../store/session';
import { getUserSpotsThunk } from '../../store/spots';
import SpotTile from '../../components/Spots';
import OpenModalButton from './OpenModalButton';
import DeleteFormModal from '../../components/DeleteFormModal/DeleteFormModal';
import './ManageSpots.css';

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

  if (!isLoaded) {
    return <h1>Loading...</h1>
  }
  return (
    <main className='manage-spots-main'>
      <header className='manage-spots-header'>
        <h1>Manage your Spots</h1>
        <Link className={userSpots.length === 0 ? "create-new-spot" : 'create-new-spot hidden'} onClick={goToCreateSpot}>Create a New Spot</Link>
      </header>
      <div className={userSpots.length !== 0 ? 'manage-spots' : 'manage-spots hidden'}>
        {userSpots.map((spot, idx) => (
          <div key={`${idx}-${spot.name}`} className="spot-tile" data-tooltip={spot.name}>
            <SpotTile spot={spot}/>
            <div className="update-delete-btns">
              <Link onClick={
                (e) => {
                  e.preventDefault();
                  navigate(`/spots/${spot.id}/update`);
                }
              } className="update-spot" spot={spot}>Update</Link>
              <OpenModalButton
              className='open-modal'
              itemText= 'Delete'
              modalComponent={<DeleteFormModal spot={spot}/>}
               />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default ManageSpot;
