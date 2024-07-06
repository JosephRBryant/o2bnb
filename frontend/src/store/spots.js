const GET_ALL_SPOTS = 'spots/getAllSpots';

const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots
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

const initialState = {
  allSpots: [],
  byId: {}
}

const spotsReducer = (state = initialState, action) => {
  console.log('action payload-----', action.payload);
  let newState;
  switch(action.type) {
    case GET_ALL_SPOTS:
      newState = {...state};
      newState.allSpots = action.payload.Spots

      for (let spot of action.payload.Spots) {
        newState.byId[spot.id] = spot
      }
      console.log('new state====', newState)
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;
