import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from "react-icons/rx";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { getUserSpotsThunk } from '../../store/spots';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const goToManageSpots = async (e) => {
    e.preventDefault();
    await dispatch(getUserSpotsThunk(sessionUser.id))
    closeMenu();
    navigate('/spots/current');
  }

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const goToCreateSpot = (e) => {
    e.preventDefault();
    navigate('/spots/new');
  }

  const createBtnClassName = 'create-btn' + (user ? '' : ' hidden')
  const btnClassName = 'profile-button' + (showMenu ? ' profile-button-active' : '')
  const ulClassName = "profile-dropdown" + (showMenu ? " profile-button-active" : " hidden");

  return (
    <>
      <div className="profile-create-btns">
        <a className={createBtnClassName} onClick={goToCreateSpot}>Create a Spot</a>
        <button className={btnClassName} onClick={toggleMenu}>
          <RxHamburgerMenu className='profile-hamburger'/>
          <FaUserCircle className='profile-image'/>
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className='user-greeting'>Hello, {user.firstName}</li>
            <li className='user-email'>{user.email}</li>
            <li>
              <Link onClick={goToManageSpots} className='link-no-styling'>Manage Spots</Link>
            </li>
            <li>
              <Link onClick={logout} className='link-no-styling' id='log-out-btn'>Log Out</Link>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
            itemText='Log In'
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
            itemText='Sign Up'
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
