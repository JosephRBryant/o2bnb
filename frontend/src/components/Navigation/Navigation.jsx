import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useEffect } from 'react';
import { getAllSpotsThunk } from '../../store/spots';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(getAllSpotsThunk())
    }
  }, [dispatch, location]);

  return (
    <nav className='nav-bar'>
      <ul className='nav-list'>
        <li>
          <NavLink className='home' to="/">
            <img src="https://toginet.com/images/o2bnb/favicon.svg" alt="" />
            o2bnb
          </NavLink>
        </li>
        {isLoaded && (
          <li className='profile-btn-drop-down'>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
