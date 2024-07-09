const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';

const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots
  }
}

const getSpotDetails = (spotDetails) => {
  return {
    type: GET_SPOT_DETAILS,
    payload: spotDetails
  }
}

export const getAllSpotsThunk = () => async (dispatch) => {
  try {
    const res = await fetch('/api/spots');
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllSpots(data))
    } else {
      throw res;
    }
  } catch(error) {
    return error;
  }
}

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok) {
      // step 5
      const data = await res.json();
      dispatch(getSpotDetails(data))
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
}

const initialState = {
  allSpots: [],
  byId: {},
  spotDetails: {}
}

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_ALL_SPOTS:
      newState = {...state};
      newState.allSpots = action.payload.Spots

      for (let spot of action.payload.Spots) {
        newState.byId[spot.id] = spot
      }
      return newState;
    case GET_SPOT_DETAILS:
      console.log('step 7, get all details');
      console.log('payload=', action.payload);
      newState = {...state};
      // build out spotDetails
      newState.spotDetails = action.payload;

      // build out the byId
      for (let spot in action.payload) {
        newState.byId[spot.id] = spot;
      }
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;
