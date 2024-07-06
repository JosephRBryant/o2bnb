import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Splash from "./screens/Splash";
import spotsReducer, { getAllSpotsThunk } from "./store/spots";
import * as sessionActions from './store/session';

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

const router = createBrowserRouter([
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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;
