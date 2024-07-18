import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet, useRouteError, useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Splash from "./screens/Splash";
import SpotDetails from './screens/SpotDetails/SpotDetails'
import { getAllSpotsThunk } from "./store/spots";
import * as sessionActions from './store/session';
import ManageSpot from "./screens/ManageSpots/ManageSpots";
import CreateSpot from "./screens/CreateSpot/CreateSpot";
import UpdateSpot from "./screens/UpdateSpot/UpdateSpot";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spots = useSelector(state => state.spotState.allSpots);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      dispatch(getAllSpotsThunk());
      setIsLoaded(true)
    }
    if (!isLoaded && !spots.length) {
      getData()
    }
  }, [dispatch, isLoaded, spots])
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

function App() {
  const router = [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: (
            <>
              <Splash />
            </>
          )
        },
        {
          path: '/spots/:spotId',
          element: <SpotDetails />
        },
        {
          path: '/spots/current',
          element: <ManageSpot />
        },
        {
          path: '/spots/new',
          element: <CreateSpot />
        },
        {
          path: '/spots/:spotId/update',
          element: <UpdateSpot />
        }
      ]
    }
  ];

  const routing = useRoutes(router);

  return (
    <>
      {routing}
    </>
  )
}

export default App;
