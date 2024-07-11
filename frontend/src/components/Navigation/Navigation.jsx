import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav className='nav-bar'>
      <ul className='nav-list'>
        <li>
          <NavLink className='home' to="/">
            <img src="../../../dist/favicon.svg" alt="" />
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
